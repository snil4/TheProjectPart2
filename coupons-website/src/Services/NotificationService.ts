import { Notyf } from "notyf";

class NotificationService{
    private notify = new Notyf({duration:4000, position:{x: "center", y: "top"}});

    public success(message: string){
        this.notify.success(message);
    }

    public error(message: string){
        this.notify.error(this.extractErrorMessage(message));
    }

    private extractErrorMessage(error: any): string {
        // front threw a string as error
        if (typeof error === "string") return error;

        // Axios got an error string from back
        if (typeof error.response?.data === "string") return error.response.data;

        // Axios got an error array from back
        if (Array.isArray(error.response?.data)) return error.response.data[0];

        // front threw Error
        if(typeof error.message === "string") return error.message;

        return "Some error occured. Please try again";
    }
    
}

const notificationService = new NotificationService();

export default notificationService;