import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { 
  Wrench, 
  CheckCircle2, 
  ArrowLeft,
  AlertTriangle,
  Camera,
  Battery,
  Gauge
} from 'lucide-react';

interface AssemblyBike {
  id: string;
  model: string;
  customer: string;
  priority: 'high' | 'medium' | 'low';
  components: {
    frame: boolean;
    wheels: boolean;
    battery: boolean;
    motor: boolean;
    display: boolean;
    accessories: boolean;
  };
  checklist: Array<{ id: string; task: string; completed: boolean }>;
  issues: Array<{ id: string; description: string; urgent: boolean }>;
}

const MOCK_BIKES: AssemblyBike[] = [
  {
    id: 'B-2024-148',
    model: 'E-Mountain Pro',
    customer: 'Cliente D',
    priority: 'high',
    components: {
      frame: true,
      wheels: true,
      battery: false,
      motor: true,
      display: false,
      accessories: false,
    },
    checklist: [
      { id: '1', task: 'Montaggio telaio e forcella', completed: true },
      { id: '2', task: 'Installazione ruote e pneumatici', completed: true },
      { id: '3', task: 'Montaggio motore centrale', completed: true },
      { id: '4', task: 'Collegamento batteria', completed: false },
      { id: '5', task: 'Installazione display e comandi', completed: false },
      { id: '6', task: 'Montaggio accessori (parafanghi, portapacchi)', completed: false },
      { id: '7', task: 'Test funzionale completo', completed: false },
    ],
    issues: [],
  },
  {
    id: 'B-2024-149',
    model: 'City Comfort',
    customer: 'Cliente E',
    priority: 'medium',
    components: {
      frame: false,
      wheels: false,
      battery: false,
      motor: false,
      display: false,
      accessories: false,
    },
    checklist: [
      { id: '1', task: 'Montaggio telaio e forcella', completed: false },
      { id: '2', task: 'Installazione ruote e pneumatici', completed: false },
      { id: '3', task: 'Montaggio motore mozzo', completed: false },
      { id: '4', task: 'Collegamento batteria', completed: false },
      { id: '5', task: 'Installazione display e comandi', completed: false },
      { id: '6', task: 'Test funzionale completo', completed: false },
    ],
    issues: [],
  },
];

export function AssemblyArea() {
  const [selectedBike, setSelectedBike] = useState<AssemblyBike | null>(null);
  const [bikes, setBikes] = useState<AssemblyBike[]>(MOCK_BIKES);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  const [issueUrgent, setIssueUrgent] = useState(false);

  const handleToggleChecklist = (bikeId: string, taskId: string) => {
    setBikes((prev) =>
      prev.map((bike) =>
        bike.id === bikeId
          ? {
              ...bike,
              checklist: bike.checklist.map((item) =>
                item.id === taskId ? { ...item, completed: !item.completed } : item
              ),
            }
          : bike
      )
    );

    if (selectedBike && selectedBike.id === bikeId) {
      setSelectedBike((prev) =>
        prev
          ? {
              ...prev,
              checklist: prev.checklist.map((item) =>
                item.id === taskId ? { ...item, completed: !item.completed } : item
              ),
            }
          : null
      );
    }
  };

  const handleReportIssue = () => {
    if (!selectedBike || !issueDescription.trim()) return;

    const newIssue = {
      id: Date.now().toString(),
      description: issueDescription,
      urgent: issueUrgent,
    };

    setBikes((prev) =>
      prev.map((bike) =>
        bike.id === selectedBike.id
          ? { ...bike, issues: [...bike.issues, newIssue] }
          : bike
      )
    );

    setSelectedBike((prev) =>
      prev ? { ...prev, issues: [...prev.issues, newIssue] } : null
    );

    setIssueDescription('');
    setIssueUrgent(false);
    setShowIssueForm(false);
  };

  if (selectedBike) {
    const completedTasks = selectedBike.checklist.filter((t) => t.completed).length;
    const totalTasks = selectedBike.checklist.length;
    const progress = (completedTasks / totalTasks) * 100;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => setSelectedBike(null)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-gray-900">Dettaglio Montaggio</h1>
            <p className="text-gray-600">{selectedBike.id}</p>
          </div>
        </div>

        {/* Bike Info */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900 mb-1">{selectedBike.model}</h3>
              <p className="text-sm text-gray-600">{selectedBike.customer}</p>
            </div>
            <Badge
              variant={
                selectedBike.priority === 'high'
                  ? 'destructive'
                  : selectedBike.priority === 'medium'
                  ? 'default'
                  : 'secondary'
              }
            >
              {selectedBike.priority === 'high' ? 'Urgente' : selectedBike.priority === 'medium' ? 'Normale' : 'Bassa'}
            </Badge>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-gray-600">
              {completedTasks} di {totalTasks} attività completate
            </div>
          </div>
        </Card>

        {/* Components Required */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Componenti Richiesti</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'frame', label: 'Telaio', icon: Wrench },
              { key: 'wheels', label: 'Cerchi', icon: Wrench },
              { key: 'battery', label: 'Batteria', icon: Battery },
              { key: 'motor', label: 'Motore', icon: Gauge },
              { key: 'display', label: 'Display', icon: Gauge },
              { key: 'accessories', label: 'Accessori', icon: Wrench },
            ].map((component) => {
              const Icon = component.icon;
              const isAvailable = selectedBike.components[component.key as keyof typeof selectedBike.components];

              return (
                <div
                  key={component.key}
                  className={`p-3 rounded-xl border-2 ${
                    isAvailable
                      ? 'border-green-500 bg-green-50'
                      : 'border-orange-200 bg-orange-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-900">{component.label}</span>
                  </div>
                  <div className={`text-xs mt-1 ${isAvailable ? 'text-green-600' : 'text-orange-600'}`}>
                    {isAvailable ? 'Disponibile' : 'In attesa'}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Checklist */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Checklist di Montaggio</h3>
          <div className="space-y-3">
            {selectedBike.checklist.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  item.completed
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`task-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={() => handleToggleChecklist(selectedBike.id, item.id)}
                  />
                  <label
                    htmlFor={`task-${item.id}`}
                    className={`flex-1 cursor-pointer ${
                      item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {item.task}
                  </label>
                  {item.completed && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Report Issue */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Segnala Problema</h3>
            {!showIssueForm && (
              <Button
                onClick={() => setShowIssueForm(true)}
                variant="outline"
                className="text-[#52a8b9] border-[#52a8b9]"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Nuovo Problema
              </Button>
            )}
          </div>

          {showIssueForm && (
            <div className="space-y-4">
              <Textarea
                placeholder="Descrivi il problema riscontrato..."
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows={4}
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  id="urgent"
                  checked={issueUrgent}
                  onCheckedChange={(checked) => setIssueUrgent(checked as boolean)}
                />
                <label htmlFor="urgent" className="text-sm text-gray-900 cursor-pointer">
                  Segna come urgente
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleReportIssue}
                  className="flex-1 bg-[#52a8b9] hover:bg-[#458a98]"
                >
                  Invia Segnalazione
                </Button>
                <Button
                  onClick={() => {
                    setShowIssueForm(false);
                    setIssueDescription('');
                    setIssueUrgent(false);
                  }}
                  variant="outline"
                >
                  Annulla
                </Button>
              </div>
            </div>
          )}

          {selectedBike.issues.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-sm text-gray-600 mb-2">Problemi segnalati:</div>
              {selectedBike.issues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-3 rounded-xl ${
                    issue.urgent ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 mt-0.5 ${
                        issue.urgent ? 'text-red-600' : 'text-gray-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{issue.description}</p>
                      {issue.urgent && (
                        <Badge variant="destructive" className="mt-2">
                          Urgente
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-gray-900 mb-1">Area Montaggio</h1>
        <p className="text-gray-600">Bici da assemblare</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-gray-900 mb-1">2</div>
            <div className="text-xs text-gray-600">Da Iniziare</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-[#52a8b9] mb-1">2</div>
            <div className="text-xs text-gray-600">In Corso</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-green-600 mb-1">6</div>
            <div className="text-xs text-gray-600">Completate</div>
          </div>
        </Card>
      </div>

      {/* Bikes List */}
      <div className="space-y-3">
        {bikes.map((bike) => {
          const completedTasks = bike.checklist.filter((t) => t.completed).length;
          const totalTasks = bike.checklist.length;
          const progress = (completedTasks / totalTasks) * 100;

          return (
            <Card
              key={bike.id}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedBike(bike)}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-8 h-8 text-gray-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-gray-900 mb-1">{bike.model}</div>
                      <div className="text-sm text-gray-600">{bike.id}</div>
                    </div>
                    <Badge
                      variant={
                        bike.priority === 'high'
                          ? 'destructive'
                          : bike.priority === 'medium'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {bike.priority === 'high' ? 'Urgente' : bike.priority === 'medium' ? 'Normale' : 'Bassa'}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Progress value={progress} className="h-1.5" />
                    <div className="text-xs text-gray-600">
                      {completedTasks}/{totalTasks} attività completate
                    </div>
                  </div>

                  {bike.issues.length > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-orange-600">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{bike.issues.length} problema/i segnalato/i</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
