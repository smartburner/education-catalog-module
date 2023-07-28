import React from "react";
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useSearchParams} from "react-router-dom";

interface IECSearchResultsPaginationProps {
    totalPages: number
}

const ECSearchResultsPagination: React.FC<IECSearchResultsPaginationProps> = (props) => {

    const selectedPage = useSelector((state: RootState) => state.appMain.selectedPage);
    const [, setSearchParams] = useSearchParams();

    return (
        <div className="aj-education-catalog-more-controls">
            <div className="aj-container">
                <div className="aj-education-catalog-more-controls-body">

                    {/*<button className="aj-education-catalog-more-controls__more-btn">
                        Show more
                    </button>*/}

                    <ReactPaginate
                        pageCount={props.totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        forcePage={selectedPage - 1}
                        onPageChange={(selectedItem) => {
                            setSearchParams(prev => {
                                prev.set("selectedPage", (selectedItem.selected + 1).toString())
                                return prev;
                            });
                        }}
                        containerClassName="aj-education-catalog-more-controls-pagination"
                        pageClassName="aj-education-catalog-more-controls-pagination__page"
                        activeClassName="aj-education-catalog-more-controls-pagination__page_active"
                        breakClassName="aj-education-catalog-more-controls-pagination__break"
                        previousClassName="aj-education-catalog-more-controls-pagination__prev"
                        nextClassName="aj-education-catalog-more-controls-pagination__next"
                        previousLabel={
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="19.5" transform="rotate(-180 20 20)"
                                        stroke="#FF8A00"/>
                                <path d="M29.21 20L11.75 20" stroke="#FF8A00" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M18.1797 28L11.4197 20.57C11.1397 20.26 11.1397 19.75 11.4197 19.44L18.1797 12.01"
                                    stroke="#FF8A00" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                        }
                        nextLabel={
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="19.5" stroke="#FF8A00"/>
                                <path d="M10.79 20H28.25" stroke="#FF8A00" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M21.8203 12L28.5803 19.43C28.8603 19.74 28.8603 20.25 28.5803 20.56L21.8203 27.99"
                                    stroke="#FF8A00" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                        }
                    />

                </div>
            </div>
        </div>
    );
}

export default ECSearchResultsPagination;