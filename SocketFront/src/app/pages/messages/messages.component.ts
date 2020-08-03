import { WebsocketService } from 'src/app/services/websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.wsService.logoutWs();
  }

}
