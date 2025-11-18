import React from 'react';
import Slider from 'react-slick';
import { FEATURES } from '../constants';
import StockControl from './StockControl';

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  const arrowSize = "40px"; 
  const mobileArrowSize = "30px"; 
  const currentSize = typeof window !== 'undefined' && window.innerWidth <= 768 ? mobileArrowSize : arrowSize;

  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block",
        right: "10px",
        zIndex: 1,
        width: currentSize,
        height: currentSize
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

  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block",
        left: "10px",
        zIndex: 1,
        width: currentSize,
        height: currentSize
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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <section id="funcionalidades" className="py-12 bg-light-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dark-text mb-4">
          Principais Funcionalidades
        </h2>
        <p className="text-lg text-light-text text-center mb-8 max-w-2xl mx-auto">
          Descubra como nossa plataforma pode transformar a rotina do seu negócio com recursos práticos e inovadores.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Slider {...settings}>
            {FEATURES.map((feature, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full">
                  <div className="text-center mb-6">
                    <div className="text-primary text-4xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-dark-text mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-light-text leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-12">
          <StockControl />
        </div>
      </div>
    </section>
  );
};

export default Features;
