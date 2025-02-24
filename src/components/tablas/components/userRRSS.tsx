"use client";

import type { Player } from "@/interfaces/PlayerInterface";

interface UserRRSSProps {
  player: Player;
  type: "twitter" | "twitch";
}

const UserRRSS: React.FC<UserRRSSProps> = ({ player, type }) => {
  if (type == "twitter" && player.twitter != null) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={"https://www.x.com/" + player.twitter}
        className="hover:text-[#1DA1F2] transition-colors"
        aria-label="Twitter"
      >
        <i className="fa-brands fa-x-twitter"></i>
      </a>
    );
  } else if (type == "twitch" && player.twitch != null) {
    if (player.isLive) {
      return (
        <div className="flex items-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.twitch.tv/" + player.twitch}
            className="text-[#6441a5] flex items-center"
            aria-label="Twitch"
          >
            <i className="fa-brands fa-twitch"></i>
          </a>
          <span className="relative">
            <span className="absolute bottom-2 left-0 w-1 h-1 bg-red-500 rounded-full animate-pulse"></span>
          </span>
        </div>
      );
    } else {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={"https://www.twitch.tv/" + player.twitch}
          className="hover:text-[#6441a5] transition-colors"
          aria-label="Twitch"
        >
          <i className="fa-brands fa-twitch"></i>
        </a>
      );
    }
  }
};

export default UserRRSS;
