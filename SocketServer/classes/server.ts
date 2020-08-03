
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io' ;
import http from 'http'; //Socket y express no van de la mano, por eso usamos http como conexion entre ambos.
import * as socket from '../sockets/socket';
 

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() { //El constructor privado, habilita el patron singleton.

        this.app = express();
        this.port = SERVER_PORT;
         
        this.httpServer = new http.Server( this.app ); //Configuracion de la App de Express.?
        this.io = socketIO( this.httpServer );

        this.listenSocket();
    }
 
    public static get instance() {
        return this._instance || (this._instance = new this() ); //Existe una instancia devuelve la misma, si no, crea una. Respeta patron singleton.
    }

    private listenSocket() {
        console.log('Escuchando Conexiones - Socket');

        this.io.on('connection', client => {
            console.log('Usuario conectado.');
            console.log(client.id);

            //Conectar Cliennte

            socket.ConnectClient(client);
            socket.GetUsersOnline(client, this.io);
            socket.UserConfig(client, this.io);
            socket.Disconnect(client, this.io);
            socket.Message(client, this.io);
            

        }); 

    }   

    start( callback: Function ) {

        this.httpServer.listen( this.port, callback() );

    }

}