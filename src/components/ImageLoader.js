import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ImageWithSkeleton = ({ src }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Skeleton className="skeleton-loader-img-card"/>}
            <img
                src={src}
                onLoad={handleImageLoad}
                style={{ display: isLoading ? 'none' : 'block' }}
            />
        </>
    );
};


export default ImageWithSkeleton;