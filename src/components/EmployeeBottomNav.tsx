import { User } from '../App';
import { Home, Wrench, Settings, Paintbrush, Printer } from 'lucide-react';

interface EmployeeBottomNavProps {
  user: User;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function EmployeeBottomNav({ user, currentScreen, onNavigate }: EmployeeBottomNavProps) {
  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Home', icon: Home },
    ];

    switch (user.role) {
      case 'painter':
        baseItems.push({ id: 'painting', label: 'Verniciatura', icon: Paintbrush });
        break;
      case 'assembly_tech':
        baseItems.push({ id: 'assembly', label: 'Montaggio', icon: Wrench });
        break;
      case 'disassembly_tech':
        baseItems.push({ id: 'disassembly', label: 'Smontaggio', icon: Wrench });
        break;
      case 'graphics_tech':
        baseItems.push({ id: 'graphics', label: 'Grafica', icon: Printer });
        break;
    }

    baseItems.push({ id: 'profile', label: 'Profilo', icon: Settings });

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive 
                  ? 'text-[#52a8b9]' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
