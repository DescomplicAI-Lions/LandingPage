import React from 'react';
import Slider from 'react-slick';
import { TEAM_MEMBERS } from '../constants';
import TeamMemberCard from './TeamMemberCard';
import type { TeamMember } from '../types';


const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.4)", borderRadius: "50%", padding: "0px", right: "-25px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.4)", borderRadius: "50%", padding: "0px", left: "-25px", zIndex: 1 }}
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
    // Personalizar flechas: 
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: true,
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