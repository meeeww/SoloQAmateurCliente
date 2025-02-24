const Header = () => {
  return (
    <header className="relative flex items-center justify-between bg-[#222] opacity-95 text-white p-4">
      {/* Logo y Nombre */}
      <div className="flex items-center space-x-2">
        <a href={"/"}>
          <img src="/kb.png" alt="Logo" width={64} height={32} className="ml-8" />
        </a>
      </div>
      {/* Clasificación y Normas centrado (oculto en móvil) */}
      {/* <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-6">
        <a href="/" className="hover:underline text-xl">
          Clasificación
        </a>
        <a href="/normas" className="hover:underline text-xl">
          Normas
        </a>
      </nav> */}

      {/* Links de Twitter y Discord */}
      <div className="flex space-x-4">
        <a href="https://x.com/budo_koryu" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <img
            src="/x-twitter-brands.svg"
            className={`h-5 w-5 invert-[100%] brightness-200 md:h-6 md:w-6 hover:text-[#1DA1F2] hover:scale-110 transition-all`}
            alt="Twitter"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
