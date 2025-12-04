import { User } from '../App';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageSquare,
  Bell
} from 'lucide-react';

interface EmployeeDashboardProps {
  user: User;
}

export function EmployeeDashboard({ user }: EmployeeDashboardProps) {
  const getRoleTitle = (role: string) => {
    const titles: Record<string, string> = {
      painter: 'Verniciatore',
      assembly_tech: 'Meccanico Montaggio',
      disassembly_tech: 'Meccanico Smontaggio',
      graphics_tech: 'Area Grafica & Stampa',
    };
    return titles[role] || role;
  };

  const todayTasks = [
    { id: 1, title: 'Bici #B-2024-145', status: 'in_progress', priority: 'high' },
    { id: 2, title: 'Bici #B-2024-146', status: 'pending', priority: 'medium' },
    { id: 3, title: 'Bici #B-2024-147', status: 'pending', priority: 'low' },
  ];

  const assignedProduction = [
    { id: 1, bike: 'E-Mountain Pro', customer: 'Cliente A', deadline: '2 ore' },
    { id: 2, bike: 'City Comfort', customer: 'Cliente B', deadline: '4 ore' },
  ];

  const messages = [
    { id: 1, from: 'Responsabile Produzione', text: 'Priorità alta per ordine #145', time: '10:30' },
    { id: 2, from: 'Officina', text: 'Materiale disponibile in magazzino', time: '09:15' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-gray-900 mb-1">Benvenuto, {user.name}</h1>
        <p className="text-gray-600">{getRoleTitle(user.role)}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl text-gray-900 mb-1">8</div>
            <div className="text-xs text-gray-600">Completati</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#52a8b9]/10 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-[#52a8b9]" />
            </div>
            <div className="text-2xl text-gray-900 mb-1">3</div>
            <div className="text-xs text-gray-600">In Corso</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl text-gray-900 mb-1">1</div>
            <div className="text-xs text-gray-600">Urgente</div>
          </div>
        </Card>
      </div>

      {/* Today's Tasks */}
      <Card className="p-5">
        <h3 className="text-gray-900 mb-4">Compiti del Giorno</h3>
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  task.status === 'in_progress' ? 'bg-[#52a8b9]' : 'bg-gray-300'
                }`} />
                <span className="text-gray-900">{task.title}</span>
              </div>
              <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                {task.priority === 'high' ? 'Urgente' : task.priority === 'medium' ? 'Normale' : 'Bassa'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Assigned Production */}
      <Card className="p-5">
        <h3 className="text-gray-900 mb-4">Produzione Assegnata</h3>
        <div className="space-y-3">
          {assignedProduction.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-gray-200 hover:border-[#52a8b9] transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-gray-900">{item.bike}</div>
                <div className="text-xs text-gray-600">{item.deadline}</div>
              </div>
              <div className="text-sm text-gray-600">{item.customer}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Messages */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Messaggi</h3>
        </div>
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-3 rounded-xl bg-gray-50"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm text-gray-900">{msg.from}</span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-600">{msg.text}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Notifiche</h3>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-[#52a8b9]/5 border border-[#52a8b9]/20">
            <p className="text-sm text-gray-900 mb-1">Nuovo ordine assegnato</p>
            <p className="text-xs text-gray-600">5 minuti fa</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-900 mb-1">Materiali disponibili</p>
            <p className="text-xs text-gray-600">1 ora fa</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
