import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipies.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
id:number;
recipe:Recipe;
edit=false;
  constructor(
    private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(){
     this.route.params.subscribe((params:Params) =>{
          this.id= +params['id'];
          this.recipe=this.recipeService.getRecipe(this.id);
         
     })

  }
  onAddToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(): void
  {
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onDelete()
  {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
