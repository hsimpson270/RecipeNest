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
   * Gets the details of a given meal denoted by its id.
   * @param id The id of the meal to retrieve details for.
   * @returns Singular meal matching supplied id.
   */
  getMeal(id: string): Observable<Meal> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`).pipe((map((result: any) => {
      return result.meals[0] as Meal;
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
