import React, {useEffect} from "react";
import "../../../styles/sections/education_catalog_module.scss";
import ECHero from "./components/ECHero";
import ECHeader from "./components/ECHeader";
import ECFeaturedPosts from "./components/ECFeaturedPosts";
import ECFiltrationForm from "./components/ECFiltrationForm";
import ECSearchResults from "./components/ECSearchResults";
import ErrorBoundary from "./components/ErrorBoundary";
import {useDispatch, useSelector} from "react-redux";
import {appMainActions} from "./store/appMainSlice";
import {useSearchParams} from "react-router-dom";
import {RootState} from "./store";

const ECModuleApp: React.FC = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const categories = useSelector((state: RootState) => state.appMain.formData.categoryItems);
    const postTypes = useSelector((state: RootState) => state.appMain.formData.postTypeItems);

    useEffect(() => {

        if (categories.length === 0 || postTypes.length === 0) {
            return;
        }

        const categoryParam = searchParams.get("category");
        const postTypeParam = searchParams.get("postType");
        const searchTextParam = searchParams.get("searchText");
        const selectedPageParam = searchParams.get("selectedPage");

        if (categoryParam && parseInt(categoryParam)) {

            // Searching Category
            const passedCategory = categories.find(categoryItem => (
                categoryItem.categoryID === parseInt(categoryParam)
            ));

            // Updating State
            if (passedCategory) {
                dispatch(appMainActions.updateActiveCategory(passedCategory));
            }

        }

        if (postTypeParam) {

            // Searching Post Type
            const passedPostType = postTypes.find(postTypeItem => (
                postTypeItem.value === postTypeParam
            ));

            // Updating State
            if (passedPostType) {
                dispatch(appMainActions.updateActivePostType(passedPostType));
            }
        }

        if (searchTextParam) {
            dispatch(appMainActions.updateSearchText(searchTextParam));
        }

        // Updating SelectedPage in the State
        if (selectedPageParam && parseInt(selectedPageParam)) {
            dispatch(appMainActions.updateSelectedPage(parseInt(selectedPageParam)));
        }

    }, [searchParams, categories])

    return (
        <div className="aj-education-catalog">
            <ErrorBoundary>
                <ECHeader>
                    <ECHero/>
                    <ECFeaturedPosts/>
                </ECHeader>

                <div className="aj-education-catalog-body">
                    <ECFiltrationForm/>
                    <ECSearchResults/>
                </div>
            </ErrorBoundary>
        </div>
    );
}

export default ECModuleApp;