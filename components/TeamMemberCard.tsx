import React from "react";
import type { TeamMember } from "../types";

interface TeamMemberCardProps {
   member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
   return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
         <img
            className="w-full h-56 object-cover object-center"
            src={member.photoUrl}
            alt={`Foto de ${member.name}`}
         />
         <div className="p-6">
            <h3 className="text-lg font-bold text-dark-text">{member.name}</h3>
            <p className="mt-1 text-sm text-primary font-semibold">
               {member.role}
            </p>
         </div>
      </div>
   );
};

export default TeamMemberCard;
