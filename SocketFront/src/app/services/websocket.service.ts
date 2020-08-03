import { Router } from '@angular/router';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 
  public socketStatus: boolean  = false;
  public user: User;

  constructor(private socket: Socket, private router: Router) {
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al Servidor.');
      this.socketStatus = true;
      this.loadStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del Servidor.');
      this.socketStatus = false;
    });
  }

  emit( event: string, payload?: any, callback?: Function  ) {
    
    this.socket.emit(event, payload, callback); 

  }

  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }

  loginWs( userName: string ) {
    
    return new Promise( (resolve,reject) => {
      this.emit('user-config', {userName}, (data:any) => {
        this.user = new User(userName);
        this.saveStorage();
        resolve();
      });
    });

  }

  logoutWs(){
    this.user = null;
    localStorage.removeItem('userName');

    const payload = {
      userName: 'defaultUsername'
    };

    this.emit('user-config', payload, () => {});
    this.router.navigateByUrl('');
  }

  saveStorage() {
    localStorage.setItem('userName', JSON.stringify(this.user)); 
  }

  loadStorage() {
    if(localStorage.getItem('userName')){
      this.user = JSON.parse(localStorage.getItem('userName'));
      this.loginWs(this.user.userName);
    }
  }

  getUser(){
    return this.user; 
  }

} 
