import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { debounceTime, first, Subject, takeUntil } from 'rxjs';
import { Category } from '../models/category';
import { Meal } from '../models/meal';
import { MealService } from '../services/meal.service';
import { CategoryComponent } from './category/category.component';
import { MealComponent } from './meal/meal.component';

const DEBOUNCE_TIME = 200;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoryComponent, CommonModule, MealComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  categories: Category[] = [];
  featuredRecipe!: Meal;
  meals: Meal[] = [];
  selectedCategory = '';

  private destroy$: Subject<void> = new Subject<void>();
  private searchText$ = new Subject<string>();

  constructor(private mealService: MealService) {}

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel(): void {
    this.selectedCategory = '';
    this.meals = [];
  }

  getRecipesByCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.mealService.getMealsByCategory(categoryName).pipe(first()).subscribe((meals: Meal[]) => {
      this.meals = meals;
    });
  }

  searchRecipes($event: any): void {
    this.searchText$.next($event.target.value);
  }
}
