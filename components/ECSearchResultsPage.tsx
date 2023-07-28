import React, {PropsWithChildren} from "react";

const ECSearchResultsPage: React.FC<PropsWithChildren> = (props) => {
    return (
        <div className="aj-education-catalog-results-items-grid__page">
            {props.children}
        </div>
    )
}

export default ECSearchResultsPage;