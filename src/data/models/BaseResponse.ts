export class BaseResponseModel<T> {
    code: number;
    status: string;
    msg: string;
    data: T;

    constructor(code: number, status: string, msg: string, data: T) {
        this.code = code;
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    static fromJson<T>(json: any, fromJsonT: (data: any) => T): BaseResponseModel<T> {
        return new BaseResponseModel<T>(
            json['code'],
            json['status'],
            json['msg'],
            fromJsonT(json['data'])
        );
    }
}