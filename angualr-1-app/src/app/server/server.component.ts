import { style } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
    selector:'app-server',
    templateUrl:'./server.component.html',
    styles:[`
        .Active{
            background-color:green
        }
    `]
})
export class ServerComponent
{
     serverId=10;
     serverStatus:string='Active'

     constructor()
     {
        this.serverStatus= Math.random()>0.5?'Active':'offline'
     }
     getServerStatus()
     {
        return  this.serverStatus;
     }
     getColor()
     {
         return this.serverStatus === 'Active'? 'white': 'red';
     }
}