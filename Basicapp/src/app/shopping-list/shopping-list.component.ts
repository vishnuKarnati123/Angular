import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']

})
export class ShoppingListComponent implements OnInit,OnDestroy {
  
  ingredients:Ingredient[];
  constructor(private shoppingListService:ShoppingListService) { }
  private ingredientChangedSubs:Subscription;

  ngOnInit(){
    this.ingredients=this.shoppingListService.getIngredients();
   this.ingredientChangedSubs= this.shoppingListService.ingredientsChanged
                            .subscribe((ingredients:Ingredient[]) =>{
                              this.ingredients=ingredients;
                            })
  }

  onEditItem(index)
  {
    this.shoppingListService.editItem.next(index);
  }

  ngOnDestroy(){
    this.ingredientChangedSubs.unsubscribe();

  }
}
