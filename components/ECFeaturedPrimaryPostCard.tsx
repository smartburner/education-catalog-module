import React from "react";
import {PostItem} from "../models/postItem.model";

interface IECFeaturedPrimaryPostCardProps {
    postData: PostItem
}

const ECFeaturedPrimaryPostCard: React.FC<IECFeaturedPrimaryPostCardProps> = (props) => {
    return (
        <a href={props.postData.postPermalinkURL} className="aj-education-catalog-featured-primary-card">
            <div className="aj-education-catalog-featured-primary-card__image">
                <img src={props.postData.postImageURL} alt={props.postData.postTitle}/>
            </div>
            <div className="aj-education-catalog-featured-primary-card-body">

                <div className="aj-education-catalog-featured-primary-card-meta">
                    <span className="aj-education-catalog-featured-primary-card__type">
                        {props.postData.postType}
                    </span>
                    <h4 className="aj-education-catalog-featured-primary-card__title">
                        {props.postData.postTitle}
                    </h4>
                    {props.postData.postExcerpt && (
                        <p className="aj-education-catalog-featured-primary-card__description">
                            {props.postData.postExcerpt}
                        </p>
                    )}
                </div>

                <span className="aj-btn-arrow aj-education-catalog-featured-primary-card__link">
                    {props.postData.postType === "podcast" ? "Listen" : "Read More"}
                </span>
            </div>
        </a>
    );
}

export default ECFeaturedPrimaryPostCard;