import {ErrorMessage} from "./ErrorMessage";

export type ServerResponse<T> = {
    success: boolean,
    data: T | ErrorMessage
}