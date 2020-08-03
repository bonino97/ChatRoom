import { ChatService } from './../../services/chat.service';
import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  text = '';
  msgSubscription: Subscription;
  element: HTMLElement;

  messages: any[] = [];

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.element = document.getElementById('chat-messages');

    this.msgSubscription = 
        this.chatService.getMessages()
            .subscribe((msg:any) => {
              
              this.messages.push(msg);

              setTimeout(() => {
                this.element.scrollTop = this.element.scrollHeight ;
              }, 50);

            });

  }

  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
  }

  send() {

    if(this.text.trim().length > 0) {
      this.chatService.sendMessage(this.text);
      this.text = '';
    }

  }

}
