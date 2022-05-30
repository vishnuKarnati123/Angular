import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DbService } from "../shared/db.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipies.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
   
    constructor(private dbService:DbService,private recipeService:RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes=this.recipeService.getRecipes();
        if(recipes.length === 0)
        {
        return this.dbService.fetchRecipes();
        }
        else{
            return recipes;
        }
    }

}

