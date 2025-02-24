import { useEffect, useState } from "react";
import PlayerTable from "./tablas/PlayerTable";
import io from "socket.io-client";

let socket: any;

export default function Welcome() {
  // Estado para almacenar los datos recibidos del servidor
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    // Conectar al servidor
    socket = io("http://localhost:3502");

    // Escuchar por mensajes
    socket.on("playerList", (data: any) => {
      console.log("Mensaje recibido:", data);
      // Actualizar el estado con los datos recibidos
      setPlayers(data);
    });

    socket.on("playerList", (data: any) => {
      console.log("Mensaje recibido:", data);
      // Actualizar el estado con los datos recibidos
      setPlayers(data);
    });

    // Enviar un mensaje al servidor
    socket.emit("clientMessage", "¡Hola servidor!");

    // Limpiar al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  return <PlayerTable players={players} loading={false} />;
}
