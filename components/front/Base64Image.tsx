import React from 'react';

interface Base64ImageProps {
    base64String: string;
    alt?: string;
    width?: number;
    height?: number;
}

const Base64Image: React.FC<Base64ImageProps> = ({ base64String, alt = 'Image', width, height }) => {
    const isValidBase64 = /^data:image\/(png|jpeg|jpg|gif);base64,/.test(base64String);
    const imageSrc = isValidBase64 ? base64String : `data:image/png;base64,${base64String}`;
    const fallbackSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4AAAAABJRU5ErkJggg==';

    return (
        <img
            src={base64String ? imageSrc : fallbackSrc}
            alt={alt}
            width={width}
            height={height}
        />
    );
};

export default Base64Image;
