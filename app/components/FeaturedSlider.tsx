"use client";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { BACKEND_URL } from "@/lib/constant";
import Link from "next/link";

export default function FeaturedSlider() {
  const [banner, setBanner] = React.useState([]);
  const getBanner = async () => {
    const res = await fetch(`${BACKEND_URL}/banners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setBanner(data);
  };

  useEffect(() => {
    getBanner();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="rounded-xl">
      {banner.map((banner: { id: number; image: string; url: string }) => (
        <div key={banner.id}>
          <Link href={banner.url}>
            <Image
              src={banner.image}
              width={1024}
              height={300}
              alt=""
              className="rounded-xl h-52 object-cover"
            />
          </Link>
        </div>
      ))}
    </Slider>
  );
}
