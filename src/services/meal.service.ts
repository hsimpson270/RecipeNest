import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  /** Base URL of The Meal DB API used for fetching data. */
  private readonly apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  /**
   * Gets a list of all meal categories.
   * @returns List of category names.
   */
  getCategories(): Observable<Category[]> {
    return this.http.get(`${this.apiUrl}/categories.php`).pipe(map((result: any) => {
      return result.categories as Category[];
    }));
  }

  /**
   * Gets all meals by a given category.
   * @param name The name of the category.
   * @returns List of meals in supplied category.
   */
  getMealsByCategory(name: string): Observable<Meal[]> {
    console.log(name);
    return this.http.get(`${this.apiUrl}/filter.php?c=${name}`).pipe((map((result: any) => {
      return result.meals as Meal[];
    })));
  }

  /**
   * Gets a random meal.
   * @returns A randomly generated meal.
   */
  getRandomMeal(): Observable<Meal> {
    return this.http.get(`${this.apiUrl}/random.php`).pipe((map((result: any) => {
      return result.meals[0] as Meal;
    })));
  }

  /**
   * Searches all meals by a given recipe name.
   * @param name The name of the recipe to search for.
   * @returns List of meals matching supplied name.
   */
  searchMeals(name: string): Observable<Meal[]> {
    return this.http.get(`${this.apiUrl}/search.php?s=${name}`).pipe((map((result: any) => {
      return result.meals as Meal[];
    })));
  }
}
