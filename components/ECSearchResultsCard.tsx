import React from "react";

interface IECSearchResultsCard {
    cardImageUrl: string,
    postTitle: string,
    postDescription: string,
    postLink: {
        linkUrl: string,
        linkCaption: string
    }
}

const ECSearchResultsCard: React.FC<IECSearchResultsCard> = (props) => {
    return (
        <a href={props.postLink.linkUrl} className="aj-education-catalog-results-card">
            <div className="aj-education-catalog-results-card__image">
                <img src={props.cardImageUrl} alt={props.postTitle}/>
            </div>

            <div className="aj-education-catalog-results-card__body">
                <div className="aj-education-catalog-results-card__meta">
                    <h4 className="aj-education-catalog-results-card__title">
                        {props.postTitle}
                    </h4>
                    {props.postDescription && (
                        <p className="aj-education-catalog-results-card__description">
                            {props.postDescription}
                        </p>
                    )}
                </div>

                <span
                    className="aj-btn-arrow aj-education-catalog-results-card__link">
                    {props.postLink.linkCaption}
                </span>
            </div>
        </a>
    )
}

export default ECSearchResultsCard;