import React from "react";
import errorIcon from "../images/error_icon.svg";
import ECPanel from "./ECPanel";
import {ErrorHandlerProps} from "../models/ErrorHandlerProps";

const ErrorMessage: React.FC<ErrorHandlerProps> = (props) => {
    return (
        <div className="aj-education-catalog-error">
            <div className="aj-container">
                <ECPanel>
                    <div className="aj-row aj-education-catalog-error-body">
                        <div className="aj-col-xs-6 aj-col-md-5 aj-education-catalog-error-left">
                            <h3 className="aj-education-catalog-error__message aj-highlight">
                                {props.errorMessage}
                            </h3>
                            <h5 className="aj-education-catalog-error__caption">
                                Please try again
                            </h5>
                        </div>
                        <div className="aj-col-xs-6 aj-col-md-5 aj-offset-md-1 aj-education-catalog-error-right">
                            <img src={errorIcon} alt="Error" className="aj-education-catalog-error__icon"/>
                        </div>
                    </div>
                </ECPanel>
            </div>
        </div>
    );
}

export default ErrorMessage;