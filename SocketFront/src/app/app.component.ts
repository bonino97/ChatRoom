import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SocketFront';

  
  constructor( 
    public wsService: WebsocketService,
    public chatService: ChatService
    ) {
    
  }
  
  ngOnInit(): void {
    this.chatService.getPrivatedMessages()
      .subscribe( (msg) => {
        console.log(msg);
      });
  }

}
