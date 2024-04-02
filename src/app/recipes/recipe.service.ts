import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipes : Recipe[] | undefined;
  
  recipeChanged = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient, private shoppingListService: ShoppingListService) {
    this.http.get("assets/recipes.json").subscribe((resp: any) => {
      this.recipes = resp.data;
      this.recipeChanged.next(<Recipe[]>this.recipes?.slice());
    });
  }


  getRecipe(id: number): Recipe | undefined{
    if (this.recipes) {
      return this.recipes[id];    
    }

    return undefined;
  }

  getRecipes(): Recipe[] {
    return this.recipes?.slice() || [];
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    if (this.recipes) {
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes?.slice());
    }
  }

  updateRecipe(index: number, recipe: Recipe): void {
    if (this.recipes) {
      this.recipes[index] = recipe;
      this.recipeChanged.next(this.recipes?.slice());
    }
  }

  deleteRecipe(index: number) {
    if (this.recipes) {
      this.recipes.splice(index, 1);
      this.recipeChanged.next(this.recipes.slice());
    }
  }
}