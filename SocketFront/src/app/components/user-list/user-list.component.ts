import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersOnline: any;

  constructor(
    public chatService:ChatService
    ) { }

  ngOnInit(): void {
    this.chatService.getUsersOnline()
      .subscribe(data => {
        this.usersOnline = data;
      });

    this.chatService.emitUsersOnline();
  }

}
