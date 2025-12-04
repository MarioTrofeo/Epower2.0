import { User } from '../App';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  Paintbrush,
  Wrench,
  Printer
} from 'lucide-react';

interface ManagerDashboardProps {
  user: User;
}

export function ManagerDashboard({ user }: ManagerDashboardProps) {
  const productionStats = [
    { label: 'Verniciatura', value: 12, total: 15, color: 'bg-purple-500', icon: Paintbrush },
    { label: 'Montaggio', value: 8, total: 10, color: 'bg-[#52a8b9]', icon: Wrench },
    { label: 'Smontaggio', value: 5, total: 7, color: 'bg-orange-500', icon: Wrench },
    { label: 'Grafica', value: 9, total: 12, color: 'bg-pink-500', icon: Printer },
  ];

  const employeePerformance = [
    { name: 'Marco Rossi', role: 'Verniciatore', completed: 8, status: 'active' },
    { name: 'Luca Bianchi', role: 'Montaggio', completed: 6, status: 'active' },
    { name: 'Sofia Ferrari', role: 'Grafica', completed: 9, status: 'active' },
    { name: 'Giovanni Verdi', role: 'Smontaggio', completed: 5, status: 'break' },
  ];

  const issues = [
    { id: 1, title: 'Materiale mancante - Ordine #145', area: 'Verniciatura', priority: 'high' },
    { id: 2, title: 'Ritardo consegna batterie', area: 'Montaggio', priority: 'medium' },
    { id: 3, title: 'Stampante in manutenzione', area: 'Grafica', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-gray-900 mb-1">Dashboard Produzione</h1>
        <p className="text-gray-600">Panoramica generale delle attività</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl text-gray-900 mb-1">34</div>
          <div className="text-sm text-gray-600">Ordini Completati</div>
          <div className="text-xs text-green-600 mt-1">+12% questa settimana</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#52a8b9]/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#52a8b9]" />
            </div>
          </div>
          <div className="text-2xl text-gray-900 mb-1">44</div>
          <div className="text-sm text-gray-600">In Lavorazione</div>
          <div className="text-xs text-gray-600 mt-1">4 aree operative</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl text-gray-900 mb-1">12</div>
          <div className="text-sm text-gray-600">Dipendenti Attivi</div>
          <div className="text-xs text-gray-600 mt-1">3 in pausa</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl text-gray-900 mb-1">3</div>
          <div className="text-sm text-gray-600">Problemi Aperti</div>
          <div className="text-xs text-orange-600 mt-1">1 urgente</div>
        </Card>
      </div>

      {/* Production Status */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-5">Stato Produzione per Area</h3>
        <div className="space-y-5">
          {productionStats.map((stat, index) => {
            const Icon = stat.icon;
            const percentage = (stat.value / stat.total) * 100;
            
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900">{stat.label}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {stat.value}/{stat.total}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Employee Performance */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Performance Dipendenti (Oggi)</h3>
        <div className="space-y-3">
          {employeePerformance.map((employee, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#52a8b9] flex items-center justify-center">
                  <span className="text-white text-sm">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-gray-900">{employee.name}</div>
                  <div className="text-sm text-gray-600">{employee.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-900">{employee.completed} completati</div>
                <Badge variant={employee.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                  {employee.status === 'active' ? 'Attivo' : 'Pausa'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Issues & Alerts */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <h3 className="text-gray-900">Problemi e Segnalazioni</h3>
        </div>
        <div className="space-y-3">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={`p-4 rounded-xl border ${
                issue.priority === 'high'
                  ? 'border-red-200 bg-red-50'
                  : issue.priority === 'medium'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-gray-900">{issue.title}</span>
                <Badge
                  variant={
                    issue.priority === 'high'
                      ? 'destructive'
                      : issue.priority === 'medium'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {issue.priority === 'high' ? 'Urgente' : issue.priority === 'medium' ? 'Medio' : 'Basso'}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">{issue.area}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
