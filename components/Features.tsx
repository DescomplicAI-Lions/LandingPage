import React from 'react';
import Slider from 'react-slick';
import { FEATURES } from '../constants';
import StockControl from './StockControl';

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  const arrowSize = "40px"; 
  const mobileArrowSize = "30px"; 
  const currentSize = typeof window !== 'undefined' && window.innerWidth <= 768 ? mobileArrowSize : arrowSize;
  const offset = `calc(-${currentSize} / 2 + 10px)`; 
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.4)",
        borderRadius: "50%",
        width: currentSize,
        height: currentSize,
        right: offset, 
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  const arrowSize = "40px"; 
  const mobileArrowSize = "30px"; 
  const currentSize = typeof window !== 'undefined' && window.innerWidth <= 768 ? mobileArrowSize : arrowSize;
  const offset = `calc(-${currentSize} / 2 + 10px)`;

  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{
        ...style,
        display: "flex", 
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.4)",
        borderRadius: "50%",
        width: currentSize,
        height: currentSize,
        left: offset, 
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
};

const Features: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: true, 
        }
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false, 
          dots: true,
        }
      }
    ]
  };

  const scrollToExample = (featureTitle: string) => {
    if (typeof window !== 'undefined' && featureTitle === 'Controle de Estoque') { 
      const exampleSection = document.getElementById('stock-control-example');
      if (exampleSection) {
        exampleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <> {/* Use a React Fragment to return multiple elements */}
      <section id="features" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark-text">Principais Funcionalidades</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text">
              Descubra como nossa plataforma pode transformar a rotina do seu negócio com recursos práticos e inovadores.
            </p>
          </div>
          <div className="mt-16">
            <Slider {...settings}>
              {FEATURES.map((feature, index) => (
                <div key={index} className="px-2">
                  <div
                    className="text-center p-6 bg-light-bg rounded-lg h-full flex flex-col justify-between cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                    onClick={() => scrollToExample(feature.title)} 
                  >
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-dark-text">{feature.title}</h3>
                    <p className="mt-2 text-base text-light-text flex-grow">{feature.description}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Render the StockControlExample component */}
      <StockControl />
    </>
  );
};

export default Features;