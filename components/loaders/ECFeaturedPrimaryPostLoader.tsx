import React from "react";
import ContentLoader from "react-content-loader";

const ECFeaturedPrimaryPostLoader = () => {
    return (
        <ContentLoader
            speed={1.5}
            width={'100%'}
            height={310}
            viewBox="0 0 730 310"
            backgroundColor="#b3b3b3"
            foregroundColor="#e0e0e0"
        >
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="310"/>
        </ContentLoader>
    )
}

export default ECFeaturedPrimaryPostLoader;