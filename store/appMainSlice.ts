import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../models/category.model";
import {SearchResults} from "../models/searchResults.model";
import {SingleValue} from "react-select";
import {SelectOption} from "../models/selectOption.model";
import {HeroData} from "../models/heroData.model";
import {FiltrationFormData} from "../models/filtrationFormData.model";
import {PostItem} from "../models/postItem.model";

interface IAppMainState {
    heroData: HeroData,
    featuredPostsData: PostItem[],
    formData: FiltrationFormData,
    searchResults: SearchResults,
    activeCategory: Category,
    activePostType: SingleValue<SelectOption> | undefined,
    searchText: string | undefined,
    selectedPage: number,
}

// Initial State
const appMainInitialState: IAppMainState = {
    activeCategory: {
        categoryID: -1,
        categoryName: "",
        categoryDescription: "",
        categoryImageURL: ""
    },
    heroData: {
        heroTitle: "",
        heroSubtitle: "",
        heroImageURL: ""
    },
    featuredPostsData: [],
    formData: {
        categoryItems: [],
        postTypeItems: []
    },
    activePostType: undefined,
    searchText: undefined,
    searchResults: {
        postItems: [],
        totalCount: 0,
        totalPages: 0,
        activePostTypeDescription: undefined
    },
    selectedPage: 1
}

const appMainSlice = createSlice({
    name: "appMainSlice",
    initialState: appMainInitialState,
    reducers: {
        updateHeroData(state, action: PayloadAction<IAppMainState["heroData"]>) {
            state.heroData = action.payload;
        },

        updateFormData(state, action: PayloadAction<IAppMainState["formData"]>) {
            state.formData = action.payload;
        },

        updateFeaturedPostsData(state, action: PayloadAction<IAppMainState["featuredPostsData"]>) {
            state.featuredPostsData = action.payload;
        },

        updateSearchResults(state, action: PayloadAction<IAppMainState["searchResults"]>) {
            state.searchResults = action.payload;
        },

        updateActiveCategory(state, action: PayloadAction<IAppMainState["activeCategory"]>) {
            state.activeCategory = action.payload;
        },
        updateActivePostType(state, action: PayloadAction<IAppMainState["activePostType"]>) {
            state.activePostType = action.payload;
        },
        updateSearchText(state, action: PayloadAction<IAppMainState["searchText"]>) {
            state.searchText = action.payload;
        },
        updateSelectedPage(state, action: PayloadAction<IAppMainState["selectedPage"]>) {
            state.selectedPage = action.payload;
        }
    }
});

export const appMainActions = appMainSlice.actions;

export default appMainSlice;