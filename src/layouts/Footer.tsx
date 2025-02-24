import { Image } from "astro:assets";

const Footer = () => {
  return (
    <footer className="relative flex flex-col items-center justify-center bg-[#222] text-white p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl">
        <span className="text-sm">
          Desarrollado por{" "}
          <a href="https://x.com/rjzass" target="_blank" rel="noopener noreferrer" className="hover:underline text-yellow-500">
            Zas
          </a>
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <a href="https://x.com/rjzass" target="_blank" rel="noopener noreferrer" aria-label="Zas Twitter">
          <i className="fa-brands fa-x-twitter h-5 w-5 md:h-6 md:w-6 hover:text-[#1DA1F2] hover:scale-110 transition-all" />
        </a>
      </div>

      <div className="mt-4 text-xs text-gray-400">© {new Date().getFullYear()} Zas. Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer;
