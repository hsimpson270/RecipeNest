import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  /** The category to be displayed within the card. */
  @Input() category!: Category;

  /** Click event handler on category selection. */
  @Output() onClick = new EventEmitter<string>();

  constructor() {}

  /**
   * Opens meal info on card button click.
   */
  selectCategory(): void {
    this.onClick.emit(this.category.strCategory);
  }
}
