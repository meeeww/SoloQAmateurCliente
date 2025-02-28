"use client";

import type { Player } from "@/interfaces/PlayerInterface";

interface UserBubbleProps {
  player: Player;
}

const UserBubble: React.FC<UserBubbleProps> = ({ player }) => {
  return (
    <div className="flex xl:flex-row flex-col xl:items-center justify-between xl:gap-4">
      <div className="flex xl:flex-row flex-col xl:items-center xl:gap-4">
        <a target="_blank" rel="noopener noreferrer" href={player.opgg} aria-label="Tracker">
          <img src={`https://api.koryubudoficial.es/${player.icon}`} alt={player.username} width={32} height={32} className="rounded-full" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={player.opgg} aria-label="Tracker">
          <span className="text-[14px]">{player.username}</span>
        </a>
      </div>
      <img src={`https://api.koryubudoficial.es/assets/roleIcons/${player.rol}.png`} alt="Rol" className="w-6 h-6" />
    </div>
  );
};

export default UserBubble;
