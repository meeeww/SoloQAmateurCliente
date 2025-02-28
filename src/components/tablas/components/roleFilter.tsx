import { useState } from "react";

export enum PlayerRole {
  TOP = "Toplaner",
  JUNGLE = "Jungler",
  MID = "Midlaner",
  ADC = "ADC",
  SUPP = "Support",
}

interface RoleFilterProps {
  onFilterChange: (role: string) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({ onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>('');
  
    const roles = Object.entries(PlayerRole).map(([key, value]) => ({
      key,
      value,
      image: `https://api.koryubudoficial.es/assets/roleIcons/${key}.png`
    }));
  
    const handleRoleSelect = (role: string) => {
      setSelectedRole(role === selectedRole ? '' : role);
      onFilterChange(role === selectedRole ? '' : role);
      setIsOpen(false);
    };
  
    return (
      <div className="relative w-full mb-4">
        <button
          type="button"
          className="p-3 rounded-lg bg-[#1f1f1f] text-white w-full focus:outline-none focus:ring-2 focus:ring-[#4a4a4a] flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedRole ? (
            <div className="flex items-center">
              <img 
                src={`https://api.koryubudoficial.es/assets/roleIcons/${Object.keys(PlayerRole).find(key => 
                  PlayerRole[key as keyof typeof PlayerRole] === selectedRole)}.png`}
                className="w-6 h-6 mr-2" 
                alt={selectedRole}
              />
              {selectedRole}
            </div>
          ) : (
            <span className="text-gray-400">Filtrar por rol</span>
          )}
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
  
        {isOpen && (
          <div className="absolute left-0 right-0 mt-1 rounded-lg bg-[#1f1f1f] shadow-lg z-10 border border-[#4a4a4a]">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <div 
                className="px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] flex items-center cursor-pointer"
                onClick={() => handleRoleSelect('')}
              >
                Todos los roles
              </div>
              {roles.map((role) => (
                <div
                  key={role.key}
                  className={`px-4 py-3 hover:bg-[#2a2a2a] flex items-center cursor-pointer ${
                    selectedRole === role.value ? 'bg-[#333333] text-white' : 'text-gray-300'
                  }`}
                  onClick={() => handleRoleSelect(role.value)}
                  role="menuitem"
                >
                  <img src={role.image} className="w-6 h-6 mr-2" alt={role.value} />
                  {role.value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

export default RoleFilter;
