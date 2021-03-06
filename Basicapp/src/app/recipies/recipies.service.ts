// import { EventEmitter, Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { Ingredient } from "../shared/ingredient.model";
// import { ShoppingListService } from "../shopping-list/shopping-list.service";
// import { Recipe } from "./recipe.model";

// @Injectable()
// export class RecipeService
// {
 
//  //   recipeSelected=new EventEmitter<Recipe>();
//     // private recipes: Recipe[] = [
//     //     new Recipe('A Test Recipe',
//     //       'This is simply a test', 
//     //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStB2b-YH3ev3TzntBN-p2g7B1sUYbNaW2GEw&usqp=CAU'
//     //       ,[new Ingredient('potato',10)]),
//     //     new Recipe('Another Test Recipe',
//     //      'This is simply a test', 
//     //      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_xVRTnl2cdVHX4nntgWvYD6o_GQeyyDTNA&usqp=CAU'
//     //      ,[new Ingredient('Fries',15)])
//     //   ];
     
//     private recipes: Recipe[] = [];
//     constructor(private shoppingListService:ShoppingListService){}
   
//     setRecipes(recipes:Recipe[])
//     {
//         console.log(recipes);
//         this.recipes=recipes;
//     }
//     getRecipes()
//    {
//        return this.recipes;
//    }

//    getRecipe(index:number)
//    {
//        return this.recipes[index];
//    }

//    addIngredientToShoppingList(ingredients: Ingredient[]) {
//         this.shoppingListService.addIngredients(ingredients)
//     }

//     addRecipe(recipe:Recipe)
//     {
//       this.recipes.push(recipe);
//     }

//     updateRecipe(index:number,newRecipe:Recipe){
//         this.recipes[index]=newRecipe
//     }

//     deleteRecipe(index:number)
//     {
//         this.recipes.splice(index,1);
//     }
// }

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
