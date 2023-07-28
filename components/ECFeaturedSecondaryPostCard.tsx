import React from "react";
import postPlaceholderImage from "../images/featured_post_placeholder_sm.png";
import {PostItem} from "../models/postItem.model";

interface IECFeaturedSecondaryPostCardProps {
    postData: PostItem
}

const ECFeaturedSecondaryPostCard: React.FC<IECFeaturedSecondaryPostCardProps> = (props) => {
    return (
        <a href={props.postData.postPermalinkURL} className="aj-education-catalog-featured-secondary-card">
            <div className="aj-education-catalog-featured-secondary-card-body">
                <div className="aj-education-catalog-featured-secondary-card__image">
                    <img
                        src={props.postData.postImageURL ? props.postData.postImageURL : postPlaceholderImage}
                        alt={props.postData.postTitle}
                    />
                </div>
                <div className="aj-education-catalog-featured-secondary-card__meta">
                    <span className="aj-education-catalog-featured-secondary-card__type">
                        {props.postData.postType}
                    </span>
                    <h6 className="aj-education-catalog-featured-secondary-card__title">
                        {props.postData.postTitle}
                    </h6>
                </div>
            </div>
        </a>
    );
}

export default ECFeaturedSecondaryPostCard;