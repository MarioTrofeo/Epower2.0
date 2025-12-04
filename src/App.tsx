import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';
import { PaintingArea } from './components/PaintingArea';
import { AssemblyArea } from './components/AssemblyArea';
import { DisassemblyArea } from './components/DisassemblyArea';
import { GraphicsArea } from './components/GraphicsArea';
import { AdminArea } from './components/AdminArea';
import { ProfileSettings } from './components/ProfileSettings';
import { EmployeeBottomNav } from './components/EmployeeBottomNav';
import { ManagerSideNav } from './components/ManagerSideNav';

export type UserRole = 
  | 'painter' 
  | 'assembly_tech' 
  | 'disassembly_tech' 
  | 'graphics_tech'
  | 'production_manager'
  | 'workshop_manager'
  | 'graphics_manager'
  | 'admin_accounting';

export type UserType = 'employee' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  type: UserType;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('dashboard');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return user.type === 'manager' 
          ? <ManagerDashboard user={user} />
          : <EmployeeDashboard user={user} />;
      case 'painting':
        return <PaintingArea />;
      case 'assembly':
        return <AssemblyArea />;
      case 'disassembly':
        return <DisassemblyArea />;
      case 'graphics':
        return <GraphicsArea />;
      case 'admin':
        return <AdminArea />;
      case 'profile':
        return <ProfileSettings user={user} onLogout={handleLogout} />;
      default:
        return user.type === 'manager'
          ? <ManagerDashboard user={user} />
          : <EmployeeDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user.type === 'manager' ? (
        <div className="flex min-h-screen">
          <ManagerSideNav 
            user={user}
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
          <div className="flex-1 lg:ml-64">
            <div className="max-w-7xl mx-auto p-4 lg:p-6 pb-20 lg:pb-6">
              {renderScreen()}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="pb-20">
            <div className="max-w-2xl mx-auto p-4">
              {renderScreen()}
            </div>
          </div>
          <EmployeeBottomNav
            user={user}
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        </>
      )}
    </div>
  );
}
