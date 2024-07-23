import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
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
    return this.http.get(`${this.apiUrl}/categories.php`).pipe(catchError(this.handleError), map((result: any) => {
      return (result.categories as Category[]).sort((a, b) => a.strCategory.localeCompare(b.strCategory));
    }));
  }

  /**
   * Gets all meals by a given category.
   * NOTE: This particular call returns a shorter version of Meal with only 3 properties instead of
   * the whole object.
   * @param name The name of the category.
   * @returns List of meals in supplied category.
   */
  getMealsByCategory(name: string): Observable<Meal[]> {
    return this.http.get(`${this.apiUrl}/filter.php?c=${name}`).pipe(catchError(this.handleError), (map((result: any) => {
      return result.meals as Meal[];
    })));
  }

  /**
   * Gets a random meal.
   * @returns A randomly generated meal.
   */
  getRandomMeal(): Observable<Meal> {
    return this.http.get(`${this.apiUrl}/random.php`).pipe(catchError(this.handleError), (map((result: any) => {
      return result.meals[0] as Meal;
    })));
  }

  /**
   * Searches all meals by a given recipe name.
   * @param name The name of the recipe to search for.
   * @returns List of meals matching supplied name.
   */
  searchMeals(name: string): Observable<Meal[]> {
    return this.http.get(`${this.apiUrl}/search.php?s=${name}`).pipe((catchError(this.handleError), map((result: any) => {
      return result.meals as Meal[];
    })));
  }

  /**
   * Handles errors if the api result returns unsuccessfully.
   * Instead of logging errors in the console, I would want to create error handling dialogs instead,
   * containing error information and generating a code (guid) that users could use when reporting issues.
   * This function was taken from: https://v17.angular.io/guide/http-handle-request-errors
   * @param error The error that occurred.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) { // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else { // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }

    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
