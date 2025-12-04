import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Wrench, ArrowLeft, CheckCircle2, FileText } from 'lucide-react';

interface DisassemblyJob {
  id: string;
  type: 'replacement' | 'revision' | 'disassembly';
  bikeModel: string;
  customer: string;
  description: string;
  notes: string;
  partsNeeded: string[];
  status: 'pending' | 'in_progress' | 'completed';
  mechanicNotes?: string;
  defectsFound?: string;
}

const MOCK_JOBS: DisassemblyJob[] = [
  {
    id: 'S-2024-001',
    type: 'replacement',
    bikeModel: 'E-Mountain Pro',
    customer: 'Cliente F',
    description: 'Sostituzione batteria e revisione motore',
    notes: 'Cliente segnala perdita di autonomia',
    partsNeeded: ['Batteria 500Wh', 'Guarnizioni motore'],
    status: 'in_progress',
  },
  {
    id: 'S-2024-002',
    type: 'revision',
    bikeModel: 'City Comfort',
    customer: 'Cliente G',
    description: 'Revisione generale post 2000km',
    notes: 'Controllo freni, catena, e sistema elettrico',
    partsNeeded: ['Pastiglie freno', 'Catena'],
    status: 'pending',
  },
  {
    id: 'S-2024-003',
    type: 'disassembly',
    bikeModel: 'Urban Speed',
    customer: 'Cliente H',
    description: 'Smontaggio completo per verniciatura telaio',
    notes: 'Rimuovere tutti i componenti elettrici con cura',
    partsNeeded: [],
    status: 'pending',
  },
];

export function DisassemblyArea() {
  const [selectedJob, setSelectedJob] = useState<DisassemblyJob | null>(null);
  const [jobs, setJobs] = useState<DisassemblyJob[]>(MOCK_JOBS);
  const [mechanicNotes, setMechanicNotes] = useState('');
  const [defectsFound, setDefectsFound] = useState('');

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      replacement: 'Sostituzione',
      revision: 'Revisione',
      disassembly: 'Smontaggio',
    };
    return labels[type] || type;
  };

  const handleCompleteJob = () => {
    if (!selectedJob) return;

    setJobs((prev) =>
      prev.map((job) =>
        job.id === selectedJob.id
          ? {
              ...job,
              status: 'completed' as const,
              mechanicNotes,
              defectsFound,
            }
          : job
      )
    );

    alert('Intervento completato con successo!');
    setSelectedJob(null);
    setMechanicNotes('');
    setDefectsFound('');
  };

  if (selectedJob) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => setSelectedJob(null)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-gray-900">Dettaglio Intervento</h1>
            <p className="text-gray-600">{selectedJob.id}</p>
          </div>
        </div>

        {/* Job Info */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="default" className="bg-[#52a8b9]">
              {getTypeLabel(selectedJob.type)}
            </Badge>
            <Badge
              variant={
                selectedJob.status === 'completed'
                  ? 'default'
                  : selectedJob.status === 'in_progress'
                  ? 'default'
                  : 'secondary'
              }
              className={
                selectedJob.status === 'completed'
                  ? 'bg-green-600'
                  : selectedJob.status === 'in_progress'
                  ? 'bg-[#52a8b9]'
                  : ''
              }
            >
              {selectedJob.status === 'completed'
                ? 'Completato'
                : selectedJob.status === 'in_progress'
                ? 'In Corso'
                : 'Da Iniziare'}
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600 mb-1">Modello Bici</div>
              <div className="text-gray-900">{selectedJob.bikeModel}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Cliente</div>
              <div className="text-gray-900">{selectedJob.customer}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Descrizione</div>
              <div className="text-gray-900">{selectedJob.description}</div>
            </div>
          </div>
        </Card>

        {/* Notes */}
        {selectedJob.notes && (
          <Card className="p-6">
            <h3 className="text-gray-900 mb-3">Note Intervento</h3>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-sm text-gray-900">{selectedJob.notes}</p>
            </div>
          </Card>
        )}

        {/* Parts Needed */}
        {selectedJob.partsNeeded.length > 0 && (
          <Card className="p-6">
            <h3 className="text-gray-900 mb-3">Ricambi Necessari</h3>
            <div className="space-y-2">
              {selectedJob.partsNeeded.map((part, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-gray-900">{part}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Mechanic Notes */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-3">Note Meccanico</h3>
          <Textarea
            placeholder="Inserisci note sull'intervento effettuato..."
            value={mechanicNotes}
            onChange={(e) => setMechanicNotes(e.target.value)}
            rows={4}
            className="mb-3"
          />
          <p className="text-xs text-gray-600">
            Descrivi le operazioni effettuate e le condizioni della bici
          </p>
        </Card>

        {/* Defects Found */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-3">Difetti Rilevati</h3>
          <Textarea
            placeholder="Segnala eventuali difetti o problemi riscontrati..."
            value={defectsFound}
            onChange={(e) => setDefectsFound(e.target.value)}
            rows={4}
            className="mb-3"
          />
          <p className="text-xs text-gray-600">
            Indica eventuali problemi da segnalare al responsabile
          </p>
        </Card>

        {/* Complete Button */}
        <Button
          onClick={handleCompleteJob}
          className="w-full bg-[#52a8b9] hover:bg-[#458a98]"
          disabled={selectedJob.status === 'completed'}
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          {selectedJob.status === 'completed' ? 'Intervento Completato' : 'Completa Intervento'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-gray-900 mb-1">Area Smontaggio</h1>
        <p className="text-gray-600">Interventi e lavorazioni speciali</p>
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
            <div className="text-2xl text-[#52a8b9] mb-1">1</div>
            <div className="text-xs text-gray-600">In Corso</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-green-600 mb-1">5</div>
            <div className="text-xs text-gray-600">Completati</div>
          </div>
        </Card>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-8 h-8 text-gray-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-gray-900 mb-1">{job.bikeModel}</div>
                    <div className="text-sm text-gray-600">{job.id}</div>
                  </div>
                  <Badge variant="default" className="bg-[#52a8b9]">
                    {getTypeLabel(job.type)}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      job.status === 'completed'
                        ? 'bg-green-600'
                        : job.status === 'in_progress'
                        ? 'bg-[#52a8b9]'
                        : 'bg-gray-300'
                    }`}
                  />
                  <span className="text-xs text-gray-600">
                    {job.status === 'completed'
                      ? 'Completato'
                      : job.status === 'in_progress'
                      ? 'In Corso'
                      : 'Da Iniziare'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
