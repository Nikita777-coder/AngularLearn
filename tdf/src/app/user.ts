interface IUser {
    name: string 
    email: string
    phone: number 
    course: string
}

export class User {
    public name: string 
    public email: string
    public phone: number 
    public course: string
    
    constructor(
        obj?: IUser
    ) {
        this.name = obj?.name ? obj?.name : "";
        this.email = obj?.email ? obj?.email : "";
        this.phone = obj?.phone ? obj?.phone : 0
        this.course = obj?.course ? obj?.course : "";
    }
}

