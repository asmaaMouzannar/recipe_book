import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe | undefined;
  @Input() index: number | undefined;
}
