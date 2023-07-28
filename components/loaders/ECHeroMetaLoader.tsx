import React from "react";
import ContentLoader from "react-content-loader";

const ECHeroMetaLoader = () => {
    return (
        <ContentLoader
            speed={1.5}
            width={'100%'}
            height={138}
            viewBox="0 0 690 138"
            backgroundColor="#b3b3b3"
            foregroundColor="#e0e0e0"
        >
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="100" />
            <rect x="0" y="118" rx="10" ry="10" width="100%" height="20" />
        </ContentLoader>
    )
}

export default ECHeroMetaLoader;