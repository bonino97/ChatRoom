import { WebsocketService } from './../services/websocket.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(
    public wsService:WebsocketService,
    private router:Router
  ) { }

  canActivate(){  

    if(this.wsService.getUser()){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }

}
