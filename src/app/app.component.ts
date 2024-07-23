import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MealService } from '../services/meal.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.mealService.getRandomMeal().pipe(first()).subscribe((result) => {
      console.log(result);
    });
  }
}
