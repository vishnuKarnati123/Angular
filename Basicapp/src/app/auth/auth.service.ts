import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData
{
  idToken:string
  email:string	
  refreshToken:string	
  expiresIn:string
  localId:string
  registered?:boolean

}

@Injectable({providedIn:'root'})
export class AuthService
{
 

   // user=new Subject<User>();
   user=new BehaviorSubject<User>(null);

   private tokenExpTimer:any;
   constructor(private http:HttpClient,private router:Router){}

   signup(email:string,password:string){
       
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseApiKey ,
       {
           email:email,
           password:password,
           returnSecureToken:true

       })
       .pipe(
          catchError(this.errorHandler),
          tap(resDate =>{
              this.handleAuthentication(resDate.email,resDate.localId,resDate.idToken,+resDate.expiresIn)
          }));
   }

   login(email:string,password:string)
   {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseApiKey,
       {
        email:email,
        password:password,
        returnSecureToken:true
       })
       .pipe(
        catchError(this.errorHandler), 
        tap(resDate =>{
        this.handleAuthentication(resDate.email,resDate.localId,resDate.idToken,+resDate.expiresIn)
       }));
}

autoLogin()
{
    const userDate:{
        email:string,
        id:string,
        _token:string,
        _tokenExp:string
    }=JSON.parse(localStorage.getItem('userData'));

    if(!userDate)
    {
        return;
    }

    const loadedUser=new User(
        userDate.email,
        userDate.id,
        userDate._token,
        new Date(userDate._tokenExp))

    if(loadedUser.token)
    {
        this.user.next(loadedUser);
        const expDuration= new Date(userDate._tokenExp).getTime()-new Date().getTime();
        this.autoLogout(expDuration)
    }

}

logout() {
   this.user.next(null);
   this.router.navigate(['/auth']);
   localStorage.removeItem('userData')
   if(this.tokenExpTimer)
   {
       clearTimeout(this.tokenExpTimer)
   }
   this.tokenExpTimer=null;
  }

  autoLogout(expTime)
  {
    this.tokenExpTimer=setTimeout(() =>{
          this.logout();
      },expTime)
  }

private handleAuthentication(email:string,localId:string,idToken:string,expIn:number)
{
     const expDate=new Date(new Date().getTime() + expIn*1000);
    const user=new User(email,localId,idToken,expDate)
    this.user.next(user);
    this.autoLogout(expIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
}

private errorHandler(errorRes:HttpErrorResponse){
    let errorMessage='An Error Occured'
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage) ;
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage='EMail already exists'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage="EMail Not Found"
                break;
            case 'INVALID_PASSWORD':
                errorMessage="Password is Invalid"

        }
        return throwError(errorMessage);
   }
}