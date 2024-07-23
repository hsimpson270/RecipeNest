import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { debounceTime, first, Subject, takeUntil } from 'rxjs';
import { Category } from '../models/category';
import { Meal } from '../models/meal';
import { MealService } from '../services/meal.service';
import { CategoryComponent } from '../components/category/category.component';
import { MealComponent } from '../components/meal/meal.component';

const DEBOUNCE_TIME = 200;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoryComponent, CommonModule, MealComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /** List of categories to be displayed to allow user to filter recipes. */
  categories: Category[] = [];

  /** The randomly generated feature recipe to appear at the top of the landing page. */
  featuredRecipe!: Meal;

  /** List of meals to be displayed after some filtering action has occurred (sorting, categories, etc.). */
  meals: Meal[] = [];

  /** Tracks selected category name for display within page. */
  selectedCategory = '';

  /** Subscription listener to clean up any active subscriptions on component destroy to prevent memory leaks. */
  private destroy$: Subject<void> = new Subject<void>();

  /** Search text listener for user search input. Required in order to leverage rxjs debounce to prevent unnecessary api calls. */
  private searchText$ = new Subject<string>();

  constructor(private mealService: MealService) {}

  /**
   * On init life cycle hook.
   */
  ngOnInit(): void {
    this.mealService.getCategories().pipe(first()).subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  
    this.mealService.getRandomMeal().pipe(first()).subscribe((randomMeal: Meal) => {
      this.featuredRecipe = randomMeal;
    });

    this.searchText$.pipe(debounceTime(DEBOUNCE_TIME), takeUntil(this.destroy$)).subscribe((searchValue: string) => {
      if (searchValue) {
        this.mealService.searchMeals(searchValue).pipe(first()).subscribe((meals: Meal[]) => {
          this.meals = meals;
        });
      } else {
        this.meals = [];
      }
    });
  }

  /**
   * On destroy life cycle hook.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handles cancel button click and resets category and meals.
   */
  cancel(): void {
    this.selectedCategory = '';
    this.meals = [];
  }

  /**
   * Gets recipes by a given category on category click.
   * @param categoryName The category name to be selected and filtered on.
   */
  getRecipesByCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.mealService.getMealsByCategory(categoryName).pipe(first()).subscribe((meals: Meal[]) => {
      this.meals = meals;
    });
  }

  /**
   * Searches recipes based on user input.
   * NOTE: had to type the $event as any instead of KeyboardEvent because KeyboardEvent's .target does not contain .value,
   * so I chose to type it initially as any vs converting $event.target to any within the function.
   */
  searchRecipes($event: any): void {
    this.searchText$.next($event.target.value);
  }
}
