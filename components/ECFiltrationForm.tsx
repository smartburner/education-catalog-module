import React, {useEffect, useState} from "react";
import ECPanel from "./ECPanel";
import ECFormSelect from "./ECFormSelect";
import {useDispatch, useSelector} from "react-redux";
import {SelectOption} from "../models/selectOption.model";
import {SingleValue} from "react-select";
import {appMainActions} from "../store/appMainSlice";
import {RootState} from "../store";
import ECFiltrationFormLoader from "./loaders/ECFiltrationFormLoader";
import EDUCATION_CATALOG_NONCES from "../constants/EducationCatalogNonces";
import {ServerResponse} from "../models/serverResponse.model";
import {FiltrationFormData} from "../models/filtrationFormData.model";
import {useSearchParams} from "react-router-dom";

const ECFiltrationForm: React.FC = () => {

    // URLSearchParams
    const [, setSearchParams] = useSearchParams();

    // Form Inputs Data from Redux
    const filtrationFormData = useSelector((state: RootState) => state.appMain.formData);
    const activeCategory = useSelector((state: RootState) => state.appMain.activeCategory);
    const activePostType = useSelector((state: RootState) => state.appMain.activePostType);

    const dispatch = useDispatch();

    //////////////////////////////////////////

    // IsLoading state
    const [isLoading, setIsLoading] = useState(false);

    // Error State
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const [selectedCategory, setSelectedCategory] = useState<SingleValue<SelectOption>>();
    const [selectedPostType, setSelectedPostType] = useState<SingleValue<SelectOption>>();

    const [searchTextLocal, setSearchTextLocal] = useState<string>();
    const searchTextGlobal = useSelector((state: RootState) => state.appMain.searchText);


    // Getting data for the Form Fields on Initial App load
    useEffect(() => {
        const requestBody = new FormData();
        requestBody.append('action', 'getFormFieldsData');
        requestBody.append('getInitialFormDataNonce', EDUCATION_CATALOG_NONCES.getInitialFormDataNonce);

        setIsLoading(true);

        fetch("/wp-admin/admin-ajax.php", {
            method: "POST",
            body: requestBody
        }).then(response => {
            return response.json();
        }).then((response: ServerResponse<FiltrationFormData>) => {

            setIsLoading(false);

            if (response.success) {

                dispatch(appMainActions.updateFormData((response.data as FiltrationFormData)));

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

    /**
     * Form submission handler
     * @param event
     */
    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedCategory) {

            // Searching for Selected Category in categories[] (Redux)
            const selectedCategoryItem = filtrationFormData.categoryItems.find(categoryItem => {
                return parseInt(selectedCategory.value) === categoryItem.categoryID;
            });

            // Pushing Active Category Image and Category Description to the State/Redux
            if (selectedCategoryItem) {
                setSearchParams(prev => {
                    prev.set("category", selectedCategoryItem.categoryID.toString())
                    return prev;
                });
            }

        }

        if (selectedPostType) {
            setSearchParams(prev => {
                prev.set("postType", selectedPostType.value)
                return prev;
            });
        }

        if (searchTextLocal) {
            setSearchParams(prev => {
                prev.set("searchText", searchTextLocal)
                return prev;
            });
        }
    }

    return (
        <div className="aj-education-catalog-search">
            <div className="aj-container">
                {isLoading ? (
                    <ECFiltrationFormLoader/>
                ) : (
                    <ECPanel>
                        <form className="aj-education-catalog-search__form"
                              onSubmit={event => formSubmitHandler(event)}>
                            <div
                                className="aj-education-catalog-search-field-group aj-education-catalog-search-category">
                                <label htmlFor="aj-education-catalog-search-category">
                                    Category
                                </label>

                                <ECFormSelect
                                    getValueOnChange={newValue => {
                                        setSelectedCategory(newValue);
                                    }}
                                    defaultValue={
                                        activeCategory.categoryID !== -1 ? {
                                            value: activeCategory.categoryID.toString(),
                                            label: activeCategory.categoryName
                                        } : undefined
                                    }
                                    id="aj-education-catalog-search-category"
                                    name="category"
                                    isDisabled={isError}
                                    options={filtrationFormData.categoryItems.map(category => {
                                        return {
                                            label: category.categoryName,
                                            value: category.categoryID.toString()
                                        };
                                    })}
                                />

                            </div>
                            <div className="aj-education-catalog-search-field-group aj-education-catalog-search-type">
                                <label htmlFor="aj-education-catalog-search-type">
                                    Type of Content
                                </label>

                                <ECFormSelect
                                    getValueOnChange={newValue => {
                                        setSelectedPostType(newValue);
                                    }}
                                    defaultValue={activePostType}
                                    id="aj-education-catalog-search-type"
                                    name="postType"
                                    isDisabled={isError}
                                    options={filtrationFormData.postTypeItems.map(postTypeItem => {
                                        return {
                                            label: postTypeItem.label,
                                            value: postTypeItem.value
                                        };
                                    })}
                                />

                            </div>
                            <div className="aj-education-catalog-search-field-group aj-education-catalog-search-text">
                                <label htmlFor="aj-education-catalog-search-text">
                                    What do you want to learn?
                                </label>
                                <div className="aj-education-catalog-search-input-wrapper">
                                    <input type="search"
                                           id="aj-education-catalog-search-text"
                                           placeholder="Search..."
                                           disabled={isError}
                                           name="searchText"
                                           defaultValue={searchTextGlobal}
                                           onChange={event => setSearchTextLocal(event.target.value)}
                                    />
                                    <button className="j-education-catalog-search-input__submit"
                                            type="submit"
                                            disabled={isError}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_1476_5034)">
                                                <path
                                                    d="M5.74481 13.1738C6.73385 16.8649 10.5279 19.0554 14.219 18.0664C17.9102 17.0773 20.1007 13.2833 19.1116 9.59217C18.1226 5.90103 14.3285 3.71054 10.6374 4.69958C6.94626 5.68862 4.75577 9.48265 5.74481 13.1738Z"
                                                    stroke="#A3A3A3" strokeWidth="1.5" strokeMiterlimit="10"
                                                    strokeLinecap="round"/>
                                                <path d="M8.90723 17.4817L7.24464 20.3614" stroke="#A3A3A3"
                                                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1476_5034">
                                                    <rect width="19" height="19" fill="white"
                                                          transform="translate(19) rotate(75)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <button type="submit"
                                    className="aj-btn-secondary aj-education-catalog-search__submit"
                                    disabled={isError}
                            >
                                Search
                            </button>
                        </form>
                        {isError && (
                            <div className="aj-education-catalog-search__error">
                                <small className="aj-education-catalog-search__error-message">
                                    {errorMessage}
                                </small>
                            </div>
                        )}

                    </ECPanel>
                )}
            </div>
        </div>
    );
}

export default ECFiltrationForm;