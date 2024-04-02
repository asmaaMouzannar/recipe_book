import { Component, OnInit } from '@angular/core';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    RouterOutlet,
    RecipesListComponent,
    RecipesDetailsComponent,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  constructor(){}
  
  ngOnInit(): void {}

}
