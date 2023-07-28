import {Category} from "./category.model";
import {PostTypeItem} from "./postTypeItem.model";

export type FiltrationFormData = {
    categoryItems: Category[],
    postTypeItems: PostTypeItem[]
}