import React from "react";

interface IECSearchResultsMetaProps {
    metaTitle: string,
    metaDescription: string | undefined
}

const ECSearchResultsMeta: React.FC<IECSearchResultsMetaProps> = (props) => {
    return (
        <div className="aj-education-catalog-results-meta">
            <div className="aj-container">
                <div className="aj-education-catalog-results-meta-body">
                    <h3 className="aj-education-catalog-results-meta-body__title">
                        {props.metaTitle}
                    </h3>
                    {props.metaDescription && (
                        <div className="aj-education-catalog-results-meta-body__description">
                            {props.metaDescription}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ECSearchResultsMeta;