import React, {PropsWithChildren} from "react";
import ErrorMessage from "./ErrorMessage";

type ErrorBoundaryState = {
    hasError: boolean,
    errorMessage: string
}

class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {

    state: ErrorBoundaryState = {
        hasError: false,
        errorMessage: ""
    };

    constructor(props: PropsWithChildren) {
        super(props);
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            errorMessage: error.message
        };
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorMessage errorMessage={this.state.errorMessage}/>
            );
        } else {
            return this.props.children;
        }
    }

}

export default ErrorBoundary;