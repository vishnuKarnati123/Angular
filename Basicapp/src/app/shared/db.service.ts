import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipies/recipe.model";
import { RecipeService } from "../recipies/recipies.service";


@Injectable({providedIn:'root'})
export class DbService{

       constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}

       storeRecipes()
       {

          const recipes=this.recipeService.getRecipes();
          this.http.put('https://angularbackend-62b45-default-rtdb.firebaseio.com/recipes.json',recipes)
            .subscribe(response =>{
                console.log(response);
        
            })
       }

       fetchRecipes(){
    
            return this.http
                    .get<Recipe[]>('https://angularbackend-62b45-default-rtdb.firebaseio.com/recipes.json')
                       
           .pipe(
           map(recipes =>{
            return recipes.map(recipes =>{
                 return {...recipes,ingredients:recipes.ingredients?recipes.ingredients:[]}
            })
        }),
        tap(recipes =>{
            this.recipeService.setRecipes(recipes);
        }))

          
        
       }
}