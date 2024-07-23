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
   */
  openMealInfo(): void {
    // Create dialog to display meal instructions and ingredients
    window.alert(this.meal.strInstructions);
  }
}
