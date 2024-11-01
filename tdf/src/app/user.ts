interface IUser {
    name: string 
    email: string
    phone: number | string
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
        this.phone = this.transformation(obj?.phone);
        this.course = obj?.course ? obj?.course : "";
    }

    private transformation(phone?: number | string): number {
        let number = phone ? phone : 0;

        if (typeof phone === "string") {
            return parseInt(phone);
        }

        return Number(phone)
    }
}

