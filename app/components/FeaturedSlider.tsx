import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const images = ["https://media.discordapp.net/attachments/829860023886544898/1298323284659802182/apple-iphone-16-pro-coming-soon-herobanner-mobile-2x.png?ex=67192548&is=6717d3c8&hm=9e16a56f02c3aebf2562f4d38fe7e95126b2eaa6019322067d4a3326f1ac5977&=&format=webp&quality=lossless&width=687&height=272"]

export default function FeaturedSlider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
        {images.map((image, index) => (
            <div key={index}>
                <Image src={image} width={1024} height={500} alt="" className="rounded-xl" objectFit="cover"/>
            </div>
        ))}      
    </Slider>
  );
}