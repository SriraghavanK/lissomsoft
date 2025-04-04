"use client"

import { useState, useRef } from "react"
import HeroSection from "../components/Herosection"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  EffectCoverflow,
  Autoplay,
  Pagination,
  Navigation,
  Thumbs,
  Keyboard,
  Mousewheel,
  Parallax,
  EffectCreative,
} from "swiper/modules"

// Import all required Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-creative"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "swiper/css/parallax"

const CareerPage = () => {
  // Images array for the carousel
  const carouselImages = [
    "https://www.lissomsoft.com/assets/team/group%20photo%201.jpeg",
    require("../assets/groupphoto.jpg"),
    "https://www.lissomsoft.com/assets/team/group%20photo%203.jpeg",
    "https://www.lissomsoft.com/assets/team/award%201.jpeg",
    "https://www.lissomsoft.com/assets/team/award%202.jpeg",
    "https://www.lissomsoft.com/assets/Team%20Images/team4.jpg",
    "https://www.lissomsoft.com/assets/team/award%204.jpeg",
    require("../assets/waterfallgroup.jpg"),
    require("../assets/cricket.jpg"),
    require("../assets/groupphoto2.jpg"),
  ]

  // State for thumbs swiper
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Progress bar ref
  const progressRef = useRef(null)
  const swiperRef = useRef(null)

  // Progress callback
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressRef.current) {
      progressRef.current.style.width = `${(1 - progress) * 100}%`
    }
  }

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
  }

  // Custom styles for advanced Swiper
  const swiperStyles = `
  .swiper-container {
    position: relative;
    width: 100%;
    padding-top: 0;
    padding-bottom: 20px;
    overflow: hidden;
   
  }
  
  // .swiper-slide {
  //   background-position: center;
  //   background-size: cover;
  //   transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  //   position: relative;
  // }
  
  .main-swiper {
    margin-bottom: 30px;
    overflow: visible;
  }
  
  .main-swiper .swiper-slide {
    width: 100%;
    height: 550px;
    overflow: hidden;
    opacity: 1;
    filter: blur(0);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
  }
  
  .main-swiper .swiper-slide-active {
    opacity: 1;
    filter: blur(0);
    z-index: 10;
    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
  }
  
  .main-swiper .swiper-slide-prev,
  .main-swiper .swiper-slide-next {
    opacity: 1;
    filter: blur(0);
    z-index: 5;
  }
  
  .main-swiper .swiper-slide::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  .main-swiper .swiper-slide-active::before {
    opacity: 0.2;
  }
  
  .main-swiper .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 1.2s ease;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .main-swiper .swiper-slide-active img {
    transform: scale(1.05);
  }
  
  .slide-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    color: white;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
    z-index: 2;
  }
  
  .swiper-slide-active .slide-caption {
    opacity: 1;
    transform: translateY(0);
  }
  
  .thumbs-swiper {
    height: 110px;
    padding: 10px 0;
  }
  
  .thumbs-swiper .swiper-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
  .thumbs-swiper .swiper-slide {
    width: 100px;
    height: 70px;
    border-radius: 8px;
    opacity: 0.5;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    position: relative;
    margin: 0 2px;
  }

  .thumbs-swiper .swiper-slide-thumb-active {
    opacity: 1;
    border: 2px solid #0d6efd;
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(13, 110, 253, 0.3);
    z-index: 10;
  }
  .swiper-slide img {
  width: 100%;
  height: auto;
  object-fit: contain; /* or cover if you want full coverage */
}

  .thumbs-swiper .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .swiper-pagination {
    position: absolute;
    bottom: -40px !important;
  }
  
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: transparent;
    border: 2px solid #0d6efd;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  .swiper-pagination-bullet-active {
    background: #0d6efd;
    transform: scale(1.2);
    opacity: 1;
  }
  
  .swiper-button-next, .swiper-button-prev {
    color: white;
    background: rgba(13, 110, 253, 0.8);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    transform: translateY(-50%);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  .swiper-button-next {
    right: 20px;
  }
  
  .swiper-button-prev {
    left: 20px;
  }
  
  .swiper-button-next:hover, .swiper-button-prev:hover {
    background: rgba(13, 110, 253, 1);
    transform: translateY(-50%) scale(1.1);
  }
  
  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 20px;
    font-weight: bold;
  }
  
  .autoplay-progress {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 4px;
    background: rgba(13, 110, 253, 0.2);
    border-radius: 10px;
    z-index: 10;
    overflow: hidden;
  }
  
  .autoplay-progress-bar {
    height: 100%;
    background: linear-gradient(to right, #0d6efd, #0dcaf0);
    border-radius: 10px;
    transition: width 0.1s linear;
  }
  
  .swiper-3d .swiper-slide-shadow-left,
  .swiper-3d .swiper-slide-shadow-right {
    background-image: none;
  }
  
  .parallax-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 130%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(45deg, rgba(13, 110, 253, 0.1), transparent);
  }
  
  .carousel-counter {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    color: #0d6efd;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: bold;
    z-index: 20;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  
  .carousel-title {
    text-align: center;
    margin-bottom: 30px;
    position: relative;
    padding-bottom: 15px;
  }
  
  .carousel-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, #0d6efd, #0dcaf0);
    border-radius: 3px;
  }
  
  @media (max-width: 992px) {
    .main-swiper .swiper-slide {
      height: 450px;
    }
  }
  
  @media (max-width: 768px) {
    .main-swiper .swiper-slide {
      width: 85%;
      height: 350px;
    }
    
    .thumbs-swiper .swiper-slide {
      width: 80px;
      height: 60px;
    }
    
    .swiper-button-next, .swiper-button-prev {
      width: 40px;
      height: 40px;
    }
    
    .swiper-button-next:after, .swiper-button-prev:after {
      font-size: 16px;
    }
  }
  
  @media (max-width: 576px) {
    .main-swiper .swiper-slide {
      height: 280px;
    }
    
    .carousel-counter {
      top: 10px;
      right: 10px;
      padding: 3px 10px;
      font-size: 12px;
    }
  }
  
  /* Custom animation for slide transition */
  .slide-transition-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  
  .slide-transition-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 500ms, transform 500ms;
  }
  
  .slide-transition-exit {
    opacity: 1;
    transform: scale(1);
  }
  
  .slide-transition-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 500ms, transform 500ms;
  }
`

  return (
    <>
      <style jsx global>
        {swiperStyles}
      </style>
      <HeroSection
        title="Unleash your potential. Reinvent your future here."
        subtitle="Transform, innovate, and grow with Lissomsoft."
        buttonText="View Openings"
        buttonLink="#current-openings"
        imageSrc="https://imgs.search.brave.com/-ndb0EqswbhnsZurvQ1UQSaOk1mWnflZs-AZbsoz62c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzA3Lzg4Lzk3/LzM2MF9GXzExMDc4/ODk3NjNfUEtaaUxi/NFl5UUpCZkRYTlBv/QUdNRURWVzlVMVpt/R1ouanBn"
      />

      <section className="py-5">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <p className="mb-4" style={{"fontFamily":"poppins", "fontSize":18}}>
                Embark on an exhilarating journey with Lissomsoft, where innovation and passion drive our pursuit of
                excellence! Explore a realm of opportunities, mastering cutting-edge technologies like AI/ML,
                React/Angular, and the prowess of platforms such as WordPress, Figma, Webflow. Join our dynamic
                workplace that cherishes creativity, fearlessly confronts challenges, and ensures a joyful path to
                success. Dive into diverse projects, from mobile apps and business applications to web portals and
                business automation. Immerse yourself in continuous learning, inclusivity, and abundant resources that
                allow you to shine. Become a trailblazer, sculpt the digital landscape, and propel your career to new
                heights with us!
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://imgs.search.brave.com/RfYV6tMvrxJBqwDwzfPs_m90F5RKETLbUvmV4yO9j-E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LXNt/aWxleS1tYW4taG9s/ZGluZy1sYXB0b3Bf/MjMtMjE0ODk0NjIw/OC5qcGc_c2VtdD1h/aXNfaHlicmlk"
                alt="Person working at Lissomsoft"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold carousel-title">Harmony, Fun and Learning at Lissomsoft: Thrive with Us!</h2>
            </div>
          </div>

          {/* Advanced Image Carousel with Swiper */}
          <div className="row">
            <div className="col-12">
              <div className="swiper-container">
                <div className="carousel-counter">
                  {activeIndex + 1} / {carouselImages.length}
                </div>

                {/* Main Swiper with Coverflow Effect */}
                <Swiper
                  effect={"creative"}
                  grabCursor={true}
                  centeredSlides={false}
                  slidesPerView={1}
                  spaceBetween={0}
                  initialSlide={0}
                  loop={true}
                  loopAdditionalSlides={3}
                  creativeEffect={{
                    prev: {
                      shadow: false,
                      translate: ["-100%", 0, 0],
                    },
                    next: {
                      shadow: false,
                      translate: ["100%", 0, 0],
                    },
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                  }}
                  keyboard={{
                    enabled: true,
                    onlyInViewport: false,
                  }}
                  mousewheel={{
                    invert: false,
                    sensitivity: 1,
                  }}
                  parallax={true}
                  modules={[
                    EffectCoverflow,
                    Autoplay,
                    Pagination,
                    Navigation,
                    Thumbs,
                    Keyboard,
                    Mousewheel,
                    Parallax,
                    EffectCreative,
                  ]}
                  className="main-swiper"
                  onAutoplayTimeLeft={onAutoplayTimeLeft}
                  onSlideChange={handleSlideChange}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    1024: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                  }}
                >
                  <div className="parallax-bg" data-swiper-parallax="-23%"></div>

                  {carouselImages.map((imgSrc, index) => (
                    <SwiperSlide key={index}>
                      <div
                        data-swiper-parallax="-300"
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <img
                          src={imgSrc || "/placeholder.svg"}
                          alt={`Team activity ${index + 1}`}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",

                            objectFit: "contain",
                          }}
                        />
                        <div className="slide-caption">
                          <h5>Team Moment {index + 1}</h5>
                          <p className="mb-0">Celebrating success and collaboration at Lissomsoft</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  <div className="autoplay-progress">
                    <div className="autoplay-progress-bar" ref={progressRef}></div>
                  </div>

                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </Swiper>

                {/* Thumbs Swiper */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={"auto"}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[Navigation, Thumbs]}
                  className="thumbs-swiper"
                  centeredSlides={false}
                  centerInsufficientSlides={true}
                  loop={true}
                  breakpoints={{
                    320: {
                      slidesPerView: 3,
                      spaceBetween: 5,
                    },
                    480: {
                      slidesPerView: 4,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 5,
                      spaceBetween: 15,
                    },
                    992: {
                      slidesPerView: 7,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {carouselImages.map((imgSrc, index) => (
                    <SwiperSlide key={index}>
                      <img src={imgSrc || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} loading="lazy" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="current-openings" className="py-5">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 mb-4">
              <h2 className="fw-bold carousel-title">Current Openings</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {/* Job Opening 1 */}
              <div className="card mb-4 border-0 shadow-sm hover-shadow transition-all">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <h3 className="h5 mb-1">Frontend Developer</h3>
                      <p className="text-muted mb-0">Full-time (Exp: 0-1 yr)</p>
                    </div>
                    <div className="col-md-7 mb-3 mb-md-0">
                      <p className="mb-0">
                        We are looking for a candidate who could ensure the success,and they should be exceptional
                        Frontend developer
                      </p>
                    </div>
                    <div className="col-md-2 text-center text-md-end">
                      <a href="/careerform" className="btn btn-primary">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Opening 2 */}
              <div className="card mb-4 border-0 shadow-sm hover-shadow transition-all">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <h3 className="h5 mb-1">Marketing</h3>
                      <p className="text-muted mb-0">Full-time (Exp: 0-1 yr)</p>
                    </div>
                    <div className="col-md-7 mb-3 mb-md-0">
                      <p className="mb-0">
                        We are looking for a candidate who could ensure the success,and they should be exceptional in
                        communication and sales
                      </p>
                    </div>
                    <div className="col-md-2 text-center text-md-end">
                      <a href="/careerform" className="btn btn-primary">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CareerPage

