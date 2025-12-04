import { User } from '../App';
import { 
  LayoutDashboard, 
  Paintbrush, 
  Wrench, 
  Printer, 
  Users, 
  ClipboardList,
  FileText,
  Settings,
  Bike,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface ManagerSideNavProps {
  user: User;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function ManagerSideNav({ user, currentScreen, onNavigate }: ManagerSideNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'painting', label: 'Verniciatura', icon: Paintbrush },
    { id: 'assembly', label: 'Montaggio', icon: Wrench },
    { id: 'disassembly', label: 'Smontaggio', icon: Wrench },
    { id: 'graphics', label: 'Grafica & Stampa', icon: Printer },
    { id: 'employees', label: 'Gestione Dipendenti', icon: Users },
    { id: 'tasks', label: 'Assegna Attività', icon: ClipboardList },
    { id: 'admin', label: 'Amministrazione', icon: FileText },
    { id: 'profile', label: 'Impostazioni', icon: Settings },
  ];

  const handleNavigate = (screen: string) => {
    onNavigate(screen);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg text-gray-900"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#52a8b9] rounded-xl flex items-center justify-center">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">E-Power Italia</h2>
                <p className="text-xs text-gray-600">{user.name}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-[#52a8b9] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
