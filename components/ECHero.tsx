import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import ErrorHandler from "./ErrorHandler";
import EDUCATION_CATALOG_NONCES from "../constants/EducationCatalogNonces";
import {ServerResponse} from "../models/serverResponse.model";
import {HeroData} from "../models/heroData.model";
import {appMainActions} from "../store/appMainSlice";
import ECHeroMetaLoader from "./loaders/ECHeroMetaLoader";
import ECHeroImageLoader from "./loaders/ECHeroImageLoader";

const ECHero = () => {

    const {
        heroTitle,
        heroSubtitle,
        heroImageURL
    } = useSelector((state: RootState) => state.appMain.heroData);

    const activeCategory = useSelector((state: RootState) => state.appMain.activeCategory);

    const dispatch = useDispatch();

    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    // Error State
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    // Updating Hero Data on Active Category change
    useEffect(() => {
        if (activeCategory.categoryID !== -1) {
            dispatch(appMainActions.updateHeroData({
                heroTitle: activeCategory.categoryName,
                heroSubtitle: activeCategory.categoryDescription,
                heroImageURL: activeCategory.categoryImageURL
            }));
        }
    }, [activeCategory]);

    // Getting Initial Hero Data
    useEffect(() => {

        const requestBody = new FormData();
        requestBody.append('action', 'getInitialHeroData');
        requestBody.append('getInitialHeroDataNonce', EDUCATION_CATALOG_NONCES.getInitialHeroDataNonce);

        setIsLoading(true);

        fetch("/wp-admin/admin-ajax.php", {
            method: "POST",
            body: requestBody
        }).then(response => {
            return response.json();
        }).then((response: ServerResponse<HeroData>) => {
            setIsLoading(false);

            if (response.success) {
                dispatch(appMainActions.updateHeroData(response.data as HeroData));
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

    }, []);

    return (
        <>
            {(isError && errorMessage) ? (
                <ErrorHandler errorMessage={errorMessage}/>
            ) : (
                <div className="aj-education-catalog-hero">
                    <div className="aj-container">

                        <div className="aj-row aj-education-catalog-hero-body">
                            <div className="aj-col-xs-7">
                                {isLoading ? (
                                    <ECHeroMetaLoader/>
                                ) : (
                                    <>
                                        <h1 className="aj-education-catalog-hero__category">
                                            {heroTitle}
                                        </h1>
                                        <span className="aj-education-catalog-hero__category-description">
                                            {heroSubtitle}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="aj-col-xs-5 aj-col-sm-4 aj-offset-sm-1">
                                {isLoading ? (
                                    <ECHeroImageLoader/>
                                ) : (
                                    <img src={heroImageURL} alt={heroImageURL}
                                         className="aj-education-catalog-hero__category-image"/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>


    );
}

export default ECHero;