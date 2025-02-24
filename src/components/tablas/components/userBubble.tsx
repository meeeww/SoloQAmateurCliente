"use client";

import type { Player } from "@/interfaces/PlayerInterface";

interface UserBubbleProps {
  player: Player;
}

const UserBubble: React.FC<UserBubbleProps> = ({ player }) => {
    return (
      <div className="flex xl:flex-row flex-col xl:items-center xl:gap-4">
        <a target="_blank" rel="noopener noreferrer" href={player.opgg} aria-label="Tracker">
          <img src={`https://api.koryubudoficial.es/${player.icon}`} alt={player.username} width={32} height={32} className="rounded-full" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={player.opgg} aria-label="Tracker">
          <span className="text-[14px]">{player.username}</span>
        </a>
      </div>
    );
};

export default UserBubble;
