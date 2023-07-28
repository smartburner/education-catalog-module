import {PostItem} from "./postItem.model";

export type SearchResults = {
    postItems: PostItem[],
    totalCount: number,
    totalPages: number,
    activePostTypeDescription: string | undefined
}