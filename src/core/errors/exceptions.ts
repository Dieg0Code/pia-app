export default class ServerException {
    message: string;
    status: number;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }
}