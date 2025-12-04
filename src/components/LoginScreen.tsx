import { useState } from 'react';
import { User, UserRole, UserType } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Bike } from 'lucide-react';

const DEMO_USERS = [
  { email: 'painter@epower.it', password: 'demo', name: 'Marco Rossi', role: 'painter' as UserRole, type: 'employee' as UserType },
  { email: 'assembly@epower.it', password: 'demo', name: 'Luca Bianchi', role: 'assembly_tech' as UserRole, type: 'employee' as UserType },
  { email: 'disassembly@epower.it', password: 'demo', name: 'Giovanni Verdi', role: 'disassembly_tech' as UserRole, type: 'employee' as UserType },
  { email: 'graphics@epower.it', password: 'demo', name: 'Sofia Ferrari', role: 'graphics_tech' as UserRole, type: 'employee' as UserType },
  { email: 'manager@epower.it', password: 'demo', name: 'Alessandro Costa', role: 'production_manager' as UserRole, type: 'manager' as UserType },
  { email: 'admin@epower.it', password: 'demo', name: 'Maria Colombo', role: 'admin_accounting' as UserRole, type: 'manager' as UserType },
];

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        name: user.name,
        email: user.email,
        role: user.role,
        type: user.type,
      });
    } else {
      setError('Credenziali non valide');
    }
  };

  const handleQuickLogin = (demoUser: typeof DEMO_USERS[0]) => {
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: demoUser.name,
      email: demoUser.email,
      role: demoUser.role,
      type: demoUser.type,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#52a8b9] rounded-2xl flex items-center justify-center mb-4">
            <Bike className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900">E-Power Italia</h1>
          <p className="text-gray-600">Piattaforma Interna Dipendenti</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nome@epower.it"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <Button type="submit" className="w-full bg-[#52a8b9] hover:bg-[#458a98]">
            Accedi
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Quick Login (Demo):</p>
          <div className="space-y-2">
            {DEMO_USERS.map((user) => (
              <button
                key={user.email}
                onClick={() => handleQuickLogin(user)}
                className="w-full text-left text-sm p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{user.name}</span>
                  <span className="text-xs text-gray-500 capitalize">
                    {user.type === 'manager' ? 'Manager' : user.role.replace('_', ' ')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
