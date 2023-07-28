import React, {useEffect, useState} from "react";
import ECPanel from "./ECPanel";
import ECFeaturedPrimaryPostCard from "./ECFeaturedPrimaryPostCard";
import ECFeaturedSecondaryPostCard from "./ECFeaturedSecondaryPostCard";
import ECFeaturedPrimaryPostLoader from "./loaders/ECFeaturedPrimaryPostLoader";
import ECFeaturedSecondaryPostLoader from "./loaders/ECFeaturedSecondaryPostLoader";
import ErrorHandler from "./ErrorHandler";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import EDUCATION_CATALOG_NONCES from "../constants/EducationCatalogNonces";
import {ServerResponse} from "../models/serverResponse.model";
import {PostItem} from "../models/postItem.model";
import {appMainActions} from "../store/appMainSlice";

const ECFeaturedPosts: React.FC = () => {

    const featuredPosts = useSelector((state: RootState) => state.appMain.featuredPostsData);

    const dispatch = useDispatch();

    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    // Error State
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Inital Data Loading
    useEffect(() => {

        const requestBody = new FormData();
        requestBody.append('action', 'getFeaturedPosts');
        requestBody.append('getFeaturedPostsNonce', EDUCATION_CATALOG_NONCES.getFeaturedPostsNonce);

        setIsLoading(true);

        fetch("/wp-admin/admin-ajax.php", {
            method: "POST",
            body: requestBody
        }).then(response => {
            return response.json();
        }).then((response: ServerResponse<PostItem[]>) => {

            setIsLoading(false);

            if (response.success) {
                dispatch(appMainActions.updateFeaturedPostsData(response.data as PostItem[]));

            } else {
                setIsError(true);

                if ("message" in response.data) {
                    setErrorMessage(response.data.message);
                } else {
                    throw new Error("Something went wrong...");
                }
            }

        }).catch((error: Error) => {

            // console.log(error);
            setIsLoading(false);

            setIsError(true);
            setErrorMessage(error.message);
        });

    }, []);


    return (
        <>
            {(isError && errorMessage) ? (
                <ErrorHandler errorMessage={errorMessage}/>
            ) : (
                <div className="aj-education-catalog-featured">
                    <div className="aj-container">
                        <div className="aj-row aj-education-catalog-featured-body">
                            <div className="aj-col-xs-7 aj-col-sm-8">
                                <ECPanel>
                                    {isLoading ? (
                                        <ECFeaturedPrimaryPostLoader/>
                                    ) : (
                                        featuredPosts.length > 0 && (
                                            <ECFeaturedPrimaryPostCard postData={featuredPosts[0]}/>
                                        )
                                    )}
                                </ECPanel>
                            </div>
                            <div className="aj-col-xs-5 aj-col-sm-4">
                                <ECPanel>
                                    <div className="aj-education-catalog-featured-panel-body">
                                        {isLoading ? (
                                            <>
                                                <ECFeaturedSecondaryPostLoader/>
                                                <ECFeaturedSecondaryPostLoader/>
                                                <ECFeaturedSecondaryPostLoader/>
                                            </>
                                        ) : (
                                            featuredPosts.length > 0 && featuredPosts.filter((featuredPost, index) => {
                                                return index !== 0;
                                            }).map(featuredPost => (
                                                    <ECFeaturedSecondaryPostCard
                                                        postData={featuredPost}
                                                        key={featuredPost.postID}
                                                    />
                                                )
                                            )
                                        )}
                                    </div>
                                </ECPanel>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ECFeaturedPosts;