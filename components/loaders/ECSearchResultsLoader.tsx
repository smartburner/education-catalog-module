import React from "react";
import ContentLoader from "react-content-loader";

const ECSearchResultsLoader = () => {
    return (
        <ContentLoader
            speed={1.5}
            width={'100%'}
            height={500}
            viewBox="0 0 1200 500"
            backgroundColor="#b3b3b3"
            foregroundColor="#e0e0e0"
        >
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="500"/>
        </ContentLoader>
    )
}

export default ECSearchResultsLoader;