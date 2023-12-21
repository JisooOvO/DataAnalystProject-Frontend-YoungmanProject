import { useEffect, useState } from "react";
import "../../css/Carousel.css"

const Carousel = ({ images, currentIndex, onSelect }) => {

    if (!Array.isArray(images) || images.length <= 0) {
        return null;
    }

    return (
        <div className="relative mx-auto overflow-hidden w-[200px] h-[150px] sm:w-[500px] lg:w-[600px] sm:h-[380px] lg:h-[500px]">
            {images.map((item, index) => (
                <div className={index === currentIndex ? "slide active" : "slide"} 
                     key={index}
                     onClick={() => onSelect(index)}
                     >
                {index === currentIndex && (
                    <>
                    <img src={item.src} alt="menu_image" className="w-[300px] h-[120px] md:w-full md:h-[330px] lg:h-[450px]" />
                    <div className="image-text">{item.text}</div>
                    </>
                    )}
               </div>
            ))}
        </div>
    )
}

export default Carousel
