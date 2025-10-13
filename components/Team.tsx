import React from 'react';
import Slider from 'react-slick';
import { TEAM_MEMBERS } from '../constants';
import TeamMemberCard from './TeamMemberCard';
import type { TeamMember } from '../types';

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  const arrowSize = "40px"; 
  const mobileArrowSize = "30px";
  const currentSize = window.innerWidth <= 768 ? mobileArrowSize : arrowSize; 
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
  const currentSize = window.innerWidth <= 768 ? mobileArrowSize : arrowSize; 
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

const Team: React.FC = () => {
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

  return (
    <section id="equipe" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark-text">Conheça Nossa Equipe</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text">
            Os profissionais talentosos por trás da nossa solução inovadora.
          </p>
        </div>
        <div className="mt-16">
          <Slider {...settings}>
            {TEAM_MEMBERS.map((member: TeamMember) => (
              <div key={member.name} className="px-2">
                <TeamMemberCard member={member} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Team;