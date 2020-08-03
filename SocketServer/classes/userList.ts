import { User } from './user';

export class UserList {
    
    private list: User[] = [];

    constructor() {  }

    public addUser(user: User){
        this.list.push(user);
        console.log(this.list);
        return user;
    }

    public updateUsername(id: string, userName: string){
        for( let user of this.list ) {

            if(user.id === id){
                user.userName = userName;
                break;
            } 
        }

        console.log('Actualizando usuario', this.list);
    }

    public getUsersList(){

        return this.list.filter(user => user.userName !== 'defaultUsername')

    }

    public getUser(id:string) {
        return this.list.find( user => user.id === id ); 
    }

    public getUserInRoom(room:string){
        return this.list.filter( user => user.room === room);
    }

    public deleteUser (id: string) {
        const tempUser = this.getUser( id );
        this.list = this.list.filter( user => user.id !== id );  
        return tempUser;
    }
}