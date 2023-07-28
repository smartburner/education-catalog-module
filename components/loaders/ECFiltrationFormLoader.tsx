import React from "react";
import ContentLoader from "react-content-loader";

const ECFeaturedSecondaryPostLoader = () => {
    return (
        <ContentLoader
            speed={1.5}
            width={'100%'}
            height={130}
            viewBox="0 0 1200 130"
            backgroundColor="#b3b3b3"
            foregroundColor="#e0e0e0"
        >
            <rect x="0" y="0" rx="20" ry="20" width="100%" height="130"/>
        </ContentLoader>
    )
}

export default ECFeaturedSecondaryPostLoader;