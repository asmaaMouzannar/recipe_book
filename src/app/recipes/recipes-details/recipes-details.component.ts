import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { DirectivesModule } from '../../shared/directive.module';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-details',
  standalone: true,
  imports: [DirectivesModule],
  templateUrl: './recipes-details.component.html'
})

export class RecipesDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() recipe: Recipe | undefined;
  index: number = -1;
  subscription: Subscription | undefined;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];

      this.subscription =this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
        this.recipe = recipes[this.index];
      })
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];

      this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
        this.recipe = recipes[this.index];
      })
    })
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe?.ingredients || [])
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
