import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const MusicPlayerImageWithSkeleton = ({ src }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Skeleton className="skeleton-loader-img-music-player"/>}
            <img
                src={src}
                onLoad={handleImageLoad}
                style={{ display: isLoading ? 'none' : 'block' }}
            />
        </>
    );
};


export default MusicPlayerImageWithSkeleton;