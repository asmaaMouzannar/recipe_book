import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list.service';
import { Ingredients } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  styleUrl: './shopping-list.component.scss',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredients[] = [];
  private subscription: Subscription | undefined;

  constructor(private shoppingListServices: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListServices.getIngredients();
    this.subscription = this.shoppingListServices.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index: number) {
    this.shoppingListServices.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
