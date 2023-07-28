import React, {PropsWithChildren} from "react";

const ECHeader: React.FC<PropsWithChildren> = (props) => {
    return (
        <div className="aj-education-catalog-header">
            {props.children}
        </div>
    );
}

export default ECHeader;