"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRef, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  const darkModeRef = useRef(false);
  const [, forceUpdate] = useState(false);

  const toggleDarkMode = () => {
    darkModeRef.current = !darkModeRef.current;
    forceUpdate(prev => !prev);
  };

  const isDarkMode = darkModeRef.current;

  return (
    <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-500`}>
      <div className="flex flex-row justify-between p-8 border-b-2 border-gray-700">
        <h1 className="mx-12 text-3xl font-bold">Tech<span className="mx-0.5 text-4xl text-green-500">Blog</span></h1>
        <div className="space-x-5">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200">
            {isDarkMode
              ? <DarkModeIcon style={{ color: 'green', fontSize: 40 }} />
              : <LightModeIcon style={{ color: 'orange', fontSize: 40 }} />
            }
          </button>
          <Link href="/login">
            <button className="hover:underline-offset-4 hover:underline" onClick={()=>signIn()}>SignUp</button>
          </Link>
          <Link href="/signup">
            <button
              type="button"
              className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} px-3 py-1 rounded-full hover:-translate-y-1 hover:shadow-md hover:shadow-green-500/50 cursor-pointer`}
            >
              Get Register
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center items-start p-15 space-y-10">
          <h1 className="text-9xl font-bold">Tech Talks & Trends</h1>
          <p className="text-2xl font-bold">Explore breakthroughs, insights, and innovations.</p>
          <button
            type="button"
            className={`${isDarkMode ? 'bg-white text-green-700' : 'bg-green-700 text-white'} px-8 py-2 rounded-full hover:-translate-y-1 hover:shadow-md hover:shadow-green-500/50 cursor-pointer`}
          >
            Explore
          </button>
        </div>

        <div className="w-1/2 p-8">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 2000 }}
            loop={true}
            modules={[Autoplay]}
            className="shadow-md shadow-green-500/50 rounded-md"
          >
            <SwiperSlide>
              <Image src="/images/Sample1.jpg" alt="Tech Image 1" width={800} height={600} className="w-full h-96 object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/images/Sample2.jpg" alt="Tech Image 2" width={800} height={600} className="w-full h-96 object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/images/Sample3.png" alt="Tech Image 3" width={800} height={600} className="w-full h-96 object-cover" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
