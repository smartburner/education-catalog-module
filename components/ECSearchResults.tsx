import React, {useEffect, useRef, useState} from "react";
import cardPlaceholder from "../images/search_results_post_placeholder.png";
import ECSearchResultsMeta from "./ECSearchResultsMeta";
import ECSearchResultsPage from "./ECSearchResultsPage";
import ECSearchResultsCard from "./ECSearchResultsCard";
import {ServerResponse} from "../models/serverResponse.model";
import {SearchResults} from "../models/searchResults.model";
import {appMainActions} from "../store/appMainSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import ErrorHandler from "./ErrorHandler";
import ECSearchResultsPagination from "./ECSearchResultsPagination";
import EDUCATION_CATALOG_NONCES from "../constants/EducationCatalogNonces";
import {useSearchParams} from "react-router-dom";
import ECSearchResultsLoader from "./loaders/ECSearchResultsLoader";

const ECSearchResults: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    const dispatch = useDispatch();
    const activeCategory = useSelector((state: RootState) => state.appMain.activeCategory);
    const activePostType = useSelector((state: RootState) => state.appMain.activePostType);
    const searchText = useSelector((state: RootState) => state.appMain.searchText);
    const selectedPage = useSelector((state: RootState) => state.appMain.selectedPage);

    const searchResults = useSelector((state: RootState) => state.appMain.searchResults);

    // Used to prevent useEffect for filtration on Initial Component Render
    const isFirstRender = useRef(true);
    const [searchParams] = useSearchParams();

    // Loading Filtering Search Results
    useEffect(() => {

        const categoryParam = searchParams.get("category");
        const postTypeParam = searchParams.get("postType");
        const searchTextParam = searchParams.get("searchText");
        const selectedPageParam = searchParams.get("selectedPage");

        if (isFirstRender.current) {
            // console.log("It was first Render")
            isFirstRender.current = false;

            if (categoryParam || postTypeParam || searchTextParam || selectedPageParam) {
                return;
            }

        }

        const requestBody = new FormData();
        requestBody.append('action', 'getFilteredPosts');
        requestBody.append('getFilteredPostsNonce', EDUCATION_CATALOG_NONCES.getFilteredPostsNonce);

        if (activeCategory.categoryID !== -1) {
            requestBody.append('category', activeCategory.categoryID.toString());
        }

        if (activePostType) {
            requestBody.append('postType', activePostType.value);
        }

        if (searchText) {
            requestBody.append('searchText', searchText);
        }

        requestBody.append('selectedPage', selectedPage.toString());

        setIsLoading(true);

        fetch("/wp-admin/admin-ajax.php", {
            method: "POST",
            body: requestBody
        }).then(response => {
            return response.json();
        }).then((response: ServerResponse<SearchResults>) => {
            setIsLoading(false);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });

            if (response.success) {

                setIsError(false);
                setErrorMessage("");

                dispatch(appMainActions.updateSearchResults(response.data as SearchResults));

            } else {
                setIsError(true);

                if ("message" in response.data) {
                    setErrorMessage(response.data.message);
                } else {
                    throw new Error("Something went wrong...");
                }
            }

        }).catch((error: Error) => {
            setIsLoading(false);

            setIsError(true);
            setErrorMessage(error.message);
        });
    }, [activeCategory, activePostType, searchText, selectedPage]);

    return (
        <>
            {isLoading ? (
                <div className="aj-container">
                    <ECSearchResultsLoader/>
                </div>
            ) : isError ? (<ErrorHandler errorMessage={errorMessage}/>) : (
                <>
                    <div className="aj-education-catalog-results">
                        <ECSearchResultsMeta
                            metaTitle={searchResults.totalCount + " " + (!activePostType ? "Posts" : activePostType.label)}
                            metaDescription={searchResults.activePostTypeDescription}
                        />

                        <div className="aj-education-catalog-results-items">
                            <div className="aj-container">
                                <div className="aj-education-catalog-results-items-grid">
                                    <ECSearchResultsPage>
                                        {searchResults.postItems.map(postItem => (
                                            <ECSearchResultsCard
                                                key={postItem.postID}
                                                cardImageUrl={postItem.postImageURL ? postItem.postImageURL : cardPlaceholder}
                                                postTitle={postItem.postTitle}
                                                postDescription={postItem.postExcerpt}
                                                postLink={{
                                                    linkUrl: postItem.postPermalinkURL,
                                                    linkCaption: postItem.postType !== "podcast" ? "Read more" : "Listen"
                                                }}
                                            />
                                        ))}
                                    </ECSearchResultsPage>
                                </div>
                            </div>
                        </div>
                    </div>
                    {searchResults.totalPages > 1 && (
                        <ECSearchResultsPagination
                            totalPages={searchResults.totalPages}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default ECSearchResults;