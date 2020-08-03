export class User {
    
    public id: string;
    public userName: string;
    public room: string;

    constructor(id:string) {
        this.id = id;
        this.userName = 'defaultUsername';
        this.room = 'defaultRoom'
    }
}