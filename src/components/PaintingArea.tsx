import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Paintbrush, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Droplet,
  Layers
} from 'lucide-react';

interface Bike {
  id: string;
  model: string;
  customer: string;
  color: string;
  colorCode: string;
  notes: string;
  phases: {
    primer: { completed: boolean; timestamp?: string };
    painting: { completed: boolean; timestamp?: string };
    finish: { completed: boolean; timestamp?: string };
  };
  priority: 'high' | 'medium' | 'low';
}

const MOCK_BIKES: Bike[] = [
  {
    id: 'B-2024-145',
    model: 'E-Mountain Pro',
    customer: 'Cliente Premium A',
    color: 'Rosso Ferrari',
    colorCode: 'RAL 3020',
    notes: 'Finitura lucida, doppio strato',
    phases: {
      primer: { completed: true, timestamp: '2024-11-21 09:30' },
      painting: { completed: false },
      finish: { completed: false },
    },
    priority: 'high',
  },
  {
    id: 'B-2024-146',
    model: 'City Comfort',
    customer: 'Cliente B',
    color: 'Blu Ocean',
    colorCode: 'RAL 5012',
    notes: 'Finitura opaca',
    phases: {
      primer: { completed: false },
      painting: { completed: false },
      finish: { completed: false },
    },
    priority: 'medium',
  },
  {
    id: 'B-2024-147',
    model: 'Urban Speed',
    customer: 'Cliente C',
    color: 'Verde Militare',
    colorCode: 'RAL 6003',
    notes: 'Attenzione: telaio alluminio',
    phases: {
      primer: { completed: false },
      painting: { completed: false },
      finish: { completed: false },
    },
    priority: 'low',
  },
];

export function PaintingArea() {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [bikes, setBikes] = useState<Bike[]>(MOCK_BIKES);

  const handleCompletePhase = (bikeId: string, phase: keyof Bike['phases']) => {
    setBikes((prev) =>
      prev.map((bike) =>
        bike.id === bikeId
          ? {
              ...bike,
              phases: {
                ...bike.phases,
                [phase]: {
                  completed: !bike.phases[phase].completed,
                  timestamp: !bike.phases[phase].completed
                    ? new Date().toLocaleString('it-IT')
                    : undefined,
                },
              },
            }
          : bike
      )
    );

    if (selectedBike && selectedBike.id === bikeId) {
      setSelectedBike((prev) =>
        prev
          ? {
              ...prev,
              phases: {
                ...prev.phases,
                [phase]: {
                  completed: !prev.phases[phase].completed,
                  timestamp: !prev.phases[phase].completed
                    ? new Date().toLocaleString('it-IT')
                    : undefined,
                },
              },
            }
          : null
      );
    }
  };

  if (selectedBike) {
    const completedPhases = Object.values(selectedBike.phases).filter(
      (p) => p.completed
    ).length;
    const totalPhases = 3;
    const progress = (completedPhases / totalPhases) * 100;

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
            <h1 className="text-gray-900">Dettaglio Ordine</h1>
            <p className="text-gray-600">{selectedBike.id}</p>
          </div>
        </div>

        {/* Bike Image */}
        <Card className="p-6">
          <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-4">
            <div className="text-center">
              <Paintbrush className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{selectedBike.model}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Modello</div>
              <div className="text-gray-900">{selectedBike.model}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Cliente</div>
              <div className="text-gray-900">{selectedBike.customer}</div>
            </div>
          </div>
        </Card>

        {/* Color Information */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Informazioni Colore</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl border-2 border-gray-200"
                style={{ backgroundColor: selectedBike.colorCode }}
              />
              <div>
                <div className="text-gray-900 mb-1">{selectedBike.color}</div>
                <div className="text-sm text-gray-600">{selectedBike.colorCode}</div>
              </div>
            </div>

            {selectedBike.notes && (
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                <div className="text-sm text-orange-900">{selectedBike.notes}</div>
              </div>
            )}
          </div>
        </Card>

        {/* Progress */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Avanzamento</h3>
          <Progress value={progress} className="mb-2" />
          <div className="text-sm text-gray-600">
            {completedPhases} di {totalPhases} fasi completate
          </div>
        </Card>

        {/* Phases */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Fasi di Lavorazione</h3>
          <div className="space-y-4">
            {/* Primer */}
            <div
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedBike.phases.primer.completed
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">1. Primer</span>
                </div>
                {selectedBike.phases.primer.completed && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
              </div>
              {selectedBike.phases.primer.completed && selectedBike.phases.primer.timestamp && (
                <div className="text-xs text-gray-600 mb-3">
                  Completato: {selectedBike.phases.primer.timestamp}
                </div>
              )}
              <Button
                onClick={() => handleCompletePhase(selectedBike.id, 'primer')}
                className={`w-full ${
                  selectedBike.phases.primer.completed
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-[#52a8b9] hover:bg-[#458a98]'
                }`}
              >
                {selectedBike.phases.primer.completed ? 'Annulla Completamento' : 'Completa Primer'}
              </Button>
            </div>

            {/* Painting */}
            <div
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedBike.phases.painting.completed
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Paintbrush className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">2. Verniciatura</span>
                </div>
                {selectedBike.phases.painting.completed && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
              </div>
              {selectedBike.phases.painting.completed && selectedBike.phases.painting.timestamp && (
                <div className="text-xs text-gray-600 mb-3">
                  Completato: {selectedBike.phases.painting.timestamp}
                </div>
              )}
              <Button
                onClick={() => handleCompletePhase(selectedBike.id, 'painting')}
                className={`w-full ${
                  selectedBike.phases.painting.completed
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-[#52a8b9] hover:bg-[#458a98]'
                }`}
                disabled={!selectedBike.phases.primer.completed}
              >
                {selectedBike.phases.painting.completed ? 'Annulla Completamento' : 'Completa Verniciatura'}
              </Button>
            </div>

            {/* Finish */}
            <div
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedBike.phases.finish.completed
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">3. Finitura</span>
                </div>
                {selectedBike.phases.finish.completed && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
              </div>
              {selectedBike.phases.finish.completed && selectedBike.phases.finish.timestamp && (
                <div className="text-xs text-gray-600 mb-3">
                  Completato: {selectedBike.phases.finish.timestamp}
                </div>
              )}
              <Button
                onClick={() => handleCompletePhase(selectedBike.id, 'finish')}
                className={`w-full ${
                  selectedBike.phases.finish.completed
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-[#52a8b9] hover:bg-[#458a98]'
                }`}
                disabled={!selectedBike.phases.painting.completed}
              >
                {selectedBike.phases.finish.completed ? 'Annulla Completamento' : 'Completa Finitura'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Materials */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Materiali Utilizzati</h3>
          <div className="space-y-3">
            {[
              { name: 'Primer bianco', quantity: '200ml' },
              { name: `Vernice ${selectedBike.color}`, quantity: '300ml' },
              { name: 'Trasparente lucido', quantity: '150ml' },
            ].map((material, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <Checkbox id={`material-${index}`} />
                  <label htmlFor={`material-${index}`} className="text-gray-900">
                    {material.name}
                  </label>
                </div>
                <span className="text-sm text-gray-600">{material.quantity}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-gray-900 mb-1">Area Verniciatura</h1>
        <p className="text-gray-600">Bici da verniciare</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-gray-900 mb-1">3</div>
            <div className="text-xs text-gray-600">Da Iniziare</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-[#52a8b9] mb-1">1</div>
            <div className="text-xs text-gray-600">In Corso</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-green-600 mb-1">8</div>
            <div className="text-xs text-gray-600">Completate</div>
          </div>
        </Card>
      </div>

      {/* Bikes List */}
      <div className="space-y-3">
        {bikes.map((bike) => {
          const completedPhases = Object.values(bike.phases).filter((p) => p.completed).length;
          const totalPhases = 3;
          const progress = (completedPhases / totalPhases) * 100;

          return (
            <Card
              key={bike.id}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedBike(bike)}
            >
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Paintbrush className="w-8 h-8 text-gray-400" />
                </div>

                {/* Content */}
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

                  {/* Color */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-6 h-6 rounded-lg border border-gray-200"
                      style={{ backgroundColor: bike.colorCode }}
                    />
                    <span className="text-sm text-gray-600">{bike.color}</span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1">
                    <Progress value={progress} className="h-1.5" />
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>
                        {completedPhases}/{totalPhases} fasi completate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
