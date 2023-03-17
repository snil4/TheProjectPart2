import { Notyf } from "notyf";

class NotificationService{
    // Service to handle more beautiful notifications using Notyf

    private notify = new Notyf({duration:4000, position:{x: "center", y: "top"}});

    public success(message: string){
        this.notify.success(message);
    }

    public error(message: any){
        this.notify.error(this.extractErrorMessage(message));
    }

    private extractErrorMessage(error: any): string {

        // back throws an error as a message
        if (typeof error.response?.message === "string") return error.response.message.toString;

        // front threw Error
        if(typeof error.message === "string") return error.message;

        // front threw a string as error
        if (typeof error === "string") return error;

        // Axios got an error string from back
        if (typeof error.response?.data === "string") return error.response.data;

        // Axios got an error array from back
        if (Array.isArray(error.response?.data)) return error.response.data[0];

        return "Some error occured. Please try again";
    }
    
}

const notificationService = new NotificationService();

export default notificationService;