import React from "react";
import {ErrorHandlerProps} from "../models/ErrorHandlerProps";
import ErrorMessage from "./ErrorMessage";

const ErrorHandler: React.FC<ErrorHandlerProps> = (props) => {
    return (
        <ErrorMessage errorMessage={props.errorMessage}/>
    )
}

export default ErrorHandler;