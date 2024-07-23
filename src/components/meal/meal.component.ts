import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meal } from '../../models/meal';

@Component({
  selector: 'meal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal.component.html'
})
export class MealComponent {
  /** The meal to be displayed within the card. */
  @Input() meal!: Meal;

  constructor() {}

  /**
   * Opens meal info on card button click.
   * NOTE: If the meal is supplied after selecting a category it will not have instructions.
   * An additional service call to get meal details would be required to populate the full value.
   */
  openMealInfo(): void {
    // Create page to display meal instructions and ingredients
    window.alert(this.meal.strInstructions);
  }
}
