import { UserList } from './../classes/userList';
// Centralizar logica de los sockets. 
import socketIO from 'socket.io';
import { Socket } from 'socket.io';
import { User } from '../classes/user';

export const usersOnline = new UserList();

export const ConnectClient = (client: Socket) => {
    const user = new User(client.id);

    usersOnline.addUser(user);
}

export const Disconnect = (client: Socket, io:socketIO.Server) => {
    client.on('disconnect', () => {
        
        usersOnline.deleteUser(client.id);

        io.emit('users-online', usersOnline.getUsersList());

    });
}

//Escuchar mensajes.
export const Message = (client: Socket, io:socketIO.Server  ) => {
    client.on('message', (payload: { from: string, body: string } ) => {
        console.log('Mensaje recibido: ', payload);

        io.emit('new-message', payload); // payload = mensaje
    });     
}

//Escuchar mensajes.
export const UserConfig = ( client: Socket, io:socketIO.Server ) => {
    client.on('user-config', (payload: { userName: string }, callback: Function ) => {

        usersOnline.updateUsername(client.id, payload.userName);

        io.emit('users-online', usersOnline.getUsersList());

        callback({
            ok: true,
            msg: `User: ${payload.userName} configured.`
        }); 

    });     
}

//Obtener usuarios.
export const GetUsersOnline = ( client: Socket, io:socketIO.Server ) => {
    client.on('get-users', () => {

        io.to(client.id).emit('users-online', usersOnline.getUsersList());

    });     
}