import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', // :['app-servers'],'.app-servers' -->diff ways
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer=false;
  serverCreationStatus='No servers initially';
  serverName="Comcast";
  serverStatus=false;
  servers=['server1']

  constructor() {
    setTimeout(() =>{
      this.allowNewServer=true;
    },2000)
    
   }

  ngOnInit(): void {
  }

  onAddServer()
  {
     this.serverStatus=true;
     this.servers.push(this.serverName);
  }
  onUpdateServer(event:Event){
    this.serverName=(<HTMLInputElement>event.target).value
  }
}
