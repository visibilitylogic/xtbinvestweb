import React from "react";
import { Carousel } from 'react-bootstrap';
import imageOne from "../../AccountsAsset/images/1.jpg";
import imageTwo from "../../AccountsAsset/images/2.jpg";
import imageThree from "../../AccountsAsset/images/3.jpg";
import "./ImageCarousel.css";

export default function ImageCarousel(props) {
    let web  = props.web 
   
    return(
        <>
            <Carousel controls={false}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={web && web.loginCarouselImage1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={web && web.loginCarouselImage2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={web && web.loginCarouselImage3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className="overlay"></div>
        </>
    );
}