import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  // @ViewChild('qtyInput')qtyInput:ElementRef
  // @ViewChild('nameInput')nameInput:ElementRef
  @ViewChild('f')editForm:NgForm;

  subscription:Subscription;
  editMode=false;
  itemIndex:number;
  editedItem:Ingredient;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(){
    this.subscription=this.shoppingListService.editItem.subscribe((index:number) =>{
      this.editMode=true;
      this.itemIndex=index;
      this.editedItem=this.shoppingListService.getIngredient(this.itemIndex);
      this.editForm.setValue({
        name:this.editedItem.name,
        quantity:this.editedItem.quantity
       
      })

    })
  }

  onSubmit(form:NgForm){
    // const ingName= this.nameInput.nativeElement.value;
    // const ingAmount=this.qtyInput.nativeElement.value;
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.quantity);
    if(this.editMode)
    {
      this.shoppingListService.updateIngredient(this.itemIndex,newIngredient);
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false
  form.reset(); 
}
  onClear()
  {
    this.editForm.reset();
    this.editMode=false;
  }

  onDelete()
  {
      this.shoppingListService.deleteIngredient(this.itemIndex);
      this.onClear();
  }
ngOnDestroy(){
     this.subscription.unsubscribe();
}

}