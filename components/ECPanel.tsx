import React, {PropsWithChildren} from "react";

const ECPanel: React.FC<PropsWithChildren> = (props) => {
    return (
        <div className="aj-education-catalog-featured-panel">
            {props.children}
        </div>
    );
}

export default ECPanel;