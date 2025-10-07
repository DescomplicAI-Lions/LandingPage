
import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import TeamMemberCard from './TeamMemberCard';
import type { TeamMember } from '../types';

const Team: React.FC = () => {
  return (
    <section id="equipe" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark-text">Conheça Nossa Equipe</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text">
            Os profissionais talentosos por trás da nossa solução inovadora.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center">
          {TEAM_MEMBERS.map((member: TeamMember) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
