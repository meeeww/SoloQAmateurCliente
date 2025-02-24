"use client";

import { useState } from "react";
import type { Player } from "@/interfaces/PlayerInterface";
import UserBubble from "./components/userBubble";
import UserRRSS from "./components/userRRSS";
import { motion } from "framer-motion";

interface PlayerTableProps {
  players: Player[];
  loading: boolean;
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players, loading }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player | "position"; direction: "asc" | "desc" }[]>([
    { key: "positionTable", direction: "asc" },
    { key: "elo", direction: "desc" },
    { key: "winRate", direction: "desc" },
    { key: "partidas", direction: "asc" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players.filter((player) => player.username.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    for (const { key, direction } of sortConfig) {
      const compareA = key === "position" ? 0 : a[key];
      const compareB = key === "position" ? 0 : b[key];

      if (typeof compareA === "number" && typeof compareB === "number") {
        if (compareA !== compareB) {
          return direction === "asc" ? compareA - compareB : compareB - compareA;
        }
      }

      if (typeof compareA === "string" && typeof compareB === "string") {
        if (compareA !== compareB) {
          return direction === "asc" ? compareA.localeCompare(compareB) : compareB.localeCompare(compareA);
        }
      }
    }

    return 0; // Si todos son iguales
  });

  const requestSort = (key: keyof Player | "position") => {
    const currentSort = sortConfig.find((s) => s.key === key);

    let direction: "asc" | "desc" = "asc";
    if (currentSort) {
      // Si ya está en "asc", cambia a "desc", de lo contrario, mantén "asc"
      direction = currentSort.direction === "asc" ? "desc" : "asc";
    }

    // Establecer la nueva configuración de orden
    const newSortConfig = [
      { key, direction },
      ...sortConfig.filter((s) => s.key !== key), // Mantener el resto en el orden
    ];

    setSortConfig(newSortConfig);
  };

  const getSortArrow = (key: keyof Player | "position") => {
    const isActive = sortConfig[0].key === key;

    return (
      <div key={`${key}-${isActive ? sortConfig[0]?.direction : "none"}`} className="flex flex-col text-xs">
        <img
          src="/caret-up-solid.svg"
          className={`h-3 w-4 invert-[100%] brightness-200 transition-opacity duration-200 ${
            isActive && sortConfig[0]?.direction === "desc" ? "opacity-100" : "opacity-50"
          }`}
          alt=""
        />
        <img
          src="/caret-down-solid.svg"
          className={`h-3 w-4 invert-[100%] brightness-200 transition-opacity duration-200 ${
            isActive && sortConfig[0]?.direction === "asc" ? "opacity-100" : "opacity-50"
          }`}
          alt=""
        />
      </div>
    );
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const checkHighElo = (tier: string, rank: string) => {
    if (tier == "CHALLENGER" || tier == "GRANDMASTER" || tier == "MASTER") {
      return "";
    }
    return rank;
  };

  return (
    <div className="flex flex-col items-center overflow-x-auto rounded bg-[#2a2a2a] opacity-95">
      <div className="flex flex-col md:w-full w-screen items-start justify-start p-4">
        <div className="flex md:flex-row flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Buscar jugadores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-3 rounded-lg bg-[#1f1f1f] text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center w-full h-64">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <table className="w-full rounded text-white border-separate border-spacing-0 p-4 text-[14px]">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="p-3 cursor-pointer border-b border-r border-gray-300" onClick={() => requestSort("positionTable")}>
                  <div className="flex justify-between items-center md:gap-0 gap-2"># {getSortArrow("positionTable")}</div>
                </th>
                <th className="p-3 border-b border-gray-300">PLAYER</th>
                <th className="p-3 border-b border-gray-300 text-[16px]">
                  <i className="fa-brands fa-x-twitter"></i>
                </th>
                <th className="p-3 border-b  border-r border-gray-300 text-[16px]">
                  <i className="fa-brands fa-twitch "></i>
                </th>
                <th className="p-3 cursor-pointer border-b border-gray-300" onClick={() => requestSort("partidas")}>
                  <div className="flex justify-between items-center md:gap-0 gap-2">PARTIDAS {getSortArrow("partidas")}</div>
                </th>
                <th className="p-3 cursor-pointer border-b border-gray-300" onClick={() => requestSort("victorias")}>
                  <div className="flex justify-between items-center md:gap-0 gap-2">VICTORIAS {getSortArrow("victorias")}</div>
                </th>
                <th className="p-3 cursor-pointer border-b border-gray-300" onClick={() => requestSort("derrotas")}>
                  <div className="flex justify-between items-center md:gap-0 gap-2">DERROTAS {getSortArrow("derrotas")}</div>
                </th>
                <th className="p-3 cursor-pointer border-b border-gray-300" onClick={() => requestSort("winRate")}>
                  <div className="flex justify-between items-center md:gap-0 gap-2">WINRATE {getSortArrow("winRate")}</div>
                </th>
                <th className="p-3 cursor-pointer border-b border-gray-300" onClick={() => requestSort("elo")}>
                  <div className="flex justify-between items-center md:gap-0 gap-2">ELO {getSortArrow("elo")}</div>
                </th>
                <th className="p-3 border-b border-gray-300">
                  <div className="flex justify-between items-center md:gap-0 gap-2">EQUIPO</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player) => (
                <motion.tr
                  key={player.id}
                  layout // Hace que el elemento se anime al cambiar de posición
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="border-b border-gray-700"
                >
                  <td className="p-3 border-b border-r border-gray-300">{player.positionTable}</td>
                  <td className="p-3 border-b border-gray-300">
                    <UserBubble player={player} />
                  </td>
                  <td className="p-3 border-b border-gray-300">
                    <UserRRSS player={player} type="twitter" />
                  </td>
                  <td className="p-3 border-b border-r border-gray-300">
                    <UserRRSS player={player} type="twitch" />
                  </td>
                  <td className="p-3 border-b border-gray-300">{player.partidas}</td>
                  <td className="p-3 text-verde border-b border-gray-300">{player.victorias}</td>
                  <td className="p-3 text-rojo border-b border-gray-300">{player.derrotas}</td>
                  <td className={`p-3 border-b border-gray-300 font-bold ${player.winRate > 50 ? "text-verde" : "text-rojo"}`}>{player.winRate}</td>
                  <td className="p-3 border-b border-gray-300">
                    <div className="flex items-center gap-2 font-bold">
                      <img src={`https://api.koryubudoficial.es/assets/rankIcons/${player.tier}.png`} className="w-12 h-9" />
                      {capitalizeFirstLetter(player.tier)} {checkHighElo(player.tier, player.rank)}
                      <span className="font-medium">({player.leaguePoints}LPs)</span>
                    </div>
                  </td>
                  <td className="p-3 text-rojo border-b border-gray-300">
                    <img src={`https://api.koryubudoficial.es/assets/teamIcons/${player.teamName}.png`} className="w-10 h-10" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PlayerTable;
