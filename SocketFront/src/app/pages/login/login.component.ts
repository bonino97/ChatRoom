import { WebsocketService } from 'src/app/services/websocket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string = '';

  constructor( 
    public wsService: WebsocketService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.wsService.loginWs(this.userName).then( () => {
      this.router.navigate(['/messages']);
    }); 
  }
} 
