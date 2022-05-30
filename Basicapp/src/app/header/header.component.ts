import { Component,  OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../shared/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{

   collapsed = true;
   isAuthenticated=false;
   private userSub:Subscription;
   constructor(private dbService:DbService,private authService:AuthService){}

   ngOnInit(){
       this.userSub=this.authService.user.subscribe(user =>{
         this.isAuthenticated=!user?false:true;
       })    
 
   }
   onSaveData()
   {
      this.dbService.storeRecipes();
   }
   onFetchData(){
     this.dbService.fetchRecipes().subscribe();
   }

   onLogout(){
     this.authService.logout();
   }

   ngOnDestroy()
   {
     this.userSub.unsubscribe();
   }


}
