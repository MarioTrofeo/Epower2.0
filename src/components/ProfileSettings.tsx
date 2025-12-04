import { useState } from 'react';
import { User } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  UserCircle, 
  Lock, 
  Calendar, 
  Bell, 
  LogOut 
} from 'lucide-react';

interface ProfileSettingsProps {
  user: User;
  onLogout: () => void;
}

export function ProfileSettings({ user, onLogout }: ProfileSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      painter: 'Verniciatore',
      assembly_tech: 'Meccanico Montaggio',
      disassembly_tech: 'Meccanico Smontaggio',
      graphics_tech: 'Area Grafica & Stampa',
      production_manager: 'Responsabile Produzione',
      workshop_manager: 'Responsabile Officina',
      graphics_manager: 'Responsabile Grafica',
      admin_accounting: 'Amministrazione & Contabilità',
    };
    return labels[role] || role;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-gray-900 mb-1">Impostazioni</h1>
        <p className="text-gray-600">Gestisci il tuo profilo e le preferenze</p>
      </div>

      {/* Profile Card */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#52a8b9] flex items-center justify-center">
            <span className="text-white text-xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{getRoleLabel(user.role)}</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profilo</TabsTrigger>
          <TabsTrigger value="security">Sicurezza</TabsTrigger>
          <TabsTrigger value="schedule">Turni</TabsTrigger>
          <TabsTrigger value="notifications">Notifiche</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserCircle className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Informazioni Personali</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue={user.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Ruolo</Label>
                <Input id="role" defaultValue={getRoleLabel(user.role)} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input id="phone" type="tel" placeholder="+39 XXX XXX XXXX" />
              </div>

              <Button className="w-full bg-[#52a8b9] hover:bg-[#458a98]">
                Salva Modifiche
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Cambio Password</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Attuale</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nuova Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Conferma Nuova Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button className="w-full bg-[#52a8b9] hover:bg-[#458a98]">
                Aggiorna Password
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Sicurezza Account</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <div className="text-sm text-gray-900 mb-1">Ultimo Accesso</div>
                  <div className="text-xs text-gray-600">21 Nov 2024, 09:30</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <div className="text-sm text-gray-900 mb-1">Dispositivo</div>
                  <div className="text-xs text-gray-600">Mobile - Chrome</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Schedule */}
        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Turni di Lavoro</h3>
            </div>

            <div className="space-y-3">
              {['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'].map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-900">{day}</span>
                  <span className="text-sm text-gray-600">08:00 - 17:00</span>
                </div>
              ))}
              {['Sabato', 'Domenica'].map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-100">
                  <span className="text-gray-500">{day}</span>
                  <span className="text-sm text-gray-500">Riposo</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Festività e Assenze</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-900">Ferie Programmate</span>
                  <span className="text-xs text-gray-600">23-27 Dic 2024</span>
                </div>
                <div className="text-xs text-gray-600">5 giorni</div>
              </div>
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-900">Permesso</span>
                  <span className="text-xs text-gray-600">15 Gen 2025</span>
                </div>
                <div className="text-xs text-gray-600">1 giorno</div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              Richiedi Permesso
            </Button>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Preferenze Notifiche</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div>
                  <div className="text-sm text-gray-900 mb-1">Notifiche Email</div>
                  <div className="text-xs text-gray-600">Ricevi aggiornamenti via email</div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div>
                  <div className="text-sm text-gray-900 mb-1">Notifiche Push</div>
                  <div className="text-xs text-gray-600">Notifiche sul dispositivo</div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div>
                  <div className="text-sm text-gray-900 mb-1">Nuovi Compiti</div>
                  <div className="text-xs text-gray-600">Avviso per nuovi compiti assegnati</div>
                </div>
                <Switch
                  checked={taskNotifications}
                  onCheckedChange={setTaskNotifications}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout */}
      <Card className="p-6">
        <Button
          onClick={onLogout}
          variant="destructive"
          className="w-full"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Esci dall'Account
        </Button>
      </Card>
    </div>
  );
}
