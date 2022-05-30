export class User{
    constructor(public email:string,public id:String,private _token:string,private _tokenExp:Date){
    }

   
    get token(){
        if(!this._tokenExp || new Date() > this._tokenExp)
        {
          return null;
        }
        return this._token;
      }
}