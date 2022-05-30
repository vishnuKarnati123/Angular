// import { Component, OnInit } from '@angular/core';
// import { Recipe } from '../recipe.model';

// @Component({
//   selector: 'app-recipe-list',
//   templateUrl: './recipe-list.component.html',
//   styleUrls: ['./recipe-list.component.css']
// })
// export class RecipeListComponent implements OnInit {
//   recipes:Recipe[]=[
//     new Recipe('Noodels','very Tasy chinese noodles','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStB2b-YH3ev3TzntBN-p2g7B1sUYbNaW2GEw&usqp=CAU'),
//     new Recipe('recipe2','something','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_xVRTnl2cdVHX4nntgWvYD6o_GQeyyDTNA&usqp=CAU')
//   ];
//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipies.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
 
  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  onAddNewRecipe()
  {
    this.router.navigate(['new'], {relativeTo:this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  



}