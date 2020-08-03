import { WebsocketService } from './websocket.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage(msg: string) {
    const payload = { 
      from: this.wsService.getUser().userName, 
      body: msg
    };

    this.wsService.emit('message', payload);
  }

  getMessages() {
    return this.wsService.listen('new-message');
  }

  getPrivatedMessages() {
    return this.wsService.listen('privated-message');
  }

  getUsersOnline(){
    return this.wsService.listen('users-online');
  }

  emitUsersOnline(){
    this.wsService.emit('get-users');
  }
}
