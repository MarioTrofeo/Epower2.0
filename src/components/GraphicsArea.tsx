import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Printer, 
  ArrowLeft, 
  FileText, 
  Upload, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface GraphicsProject {
  id: string;
  title: string;
  customer: string;
  type: 'logo' | 'render' | 'print' | 'design';
  description: string;
  files: string[];
  guidelines: string;
  status: 'draft' | 'in_progress' | 'printing' | 'completed' | 'error';
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

const MOCK_PROJECTS: GraphicsProject[] = [
  {
    id: 'G-2024-101',
    title: 'Logo personalizzato E-Mountain Pro',
    customer: 'Cliente Premium A',
    type: 'logo',
    description: 'Creazione logo aziendale per telaio',
    files: ['logo_v1.svg', 'logo_v2.svg'],
    guidelines: 'Colori: Oro e Nero, stile elegante e minimal',
    status: 'in_progress',
    priority: 'high',
  },
  {
    id: 'G-2024-102',
    title: 'Render 3D configurazione personalizzata',
    customer: 'Cliente B',
    type: 'render',
    description: 'Render fotorealistico bici con configurazione speciale',
    files: ['render_draft.png'],
    guidelines: 'Vista laterale e 3/4, sfondo bianco',
    status: 'draft',
    priority: 'medium',
  },
  {
    id: 'G-2024-103',
    title: 'Stampa adesivi telaio City Comfort',
    customer: 'Cliente C',
    type: 'print',
    description: 'Stampa adesivi decorativi per telaio',
    files: ['stickers_final.pdf'],
    guidelines: 'Materiale resistente UV, finitura opaca',
    status: 'printing',
    priority: 'high',
    notes: 'Stampante in uso, ETA 30 minuti',
  },
];

export function GraphicsArea() {
  const [selectedProject, setSelectedProject] = useState<GraphicsProject | null>(null);
  const [projects, setProjects] = useState<GraphicsProject[]>(MOCK_PROJECTS);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      logo: 'Logo',
      render: 'Render 3D',
      print: 'Stampa',
      design: 'Design',
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: 'Bozza',
      in_progress: 'In Lavorazione',
      printing: 'In Stampa',
      completed: 'Completato',
      error: 'Errore',
    };
    return labels[status] || status;
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert('File caricato con successo!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (selectedProject) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-gray-900">Dettaglio Progetto</h1>
            <p className="text-gray-600">{selectedProject.id}</p>
          </div>
        </div>

        {/* Project Info */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="default" className="bg-[#52a8b9]">
              {getTypeLabel(selectedProject.type)}
            </Badge>
            <Badge
              variant={
                selectedProject.status === 'completed'
                  ? 'default'
                  : selectedProject.status === 'error'
                  ? 'destructive'
                  : 'secondary'
              }
              className={selectedProject.status === 'completed' ? 'bg-green-600' : ''}
            >
              {getStatusLabel(selectedProject.status)}
            </Badge>
          </div>

          <h3 className="text-gray-900 mb-2">{selectedProject.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{selectedProject.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Cliente</div>
              <div className="text-gray-900">{selectedProject.customer}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Priorità</div>
              <Badge
                variant={
                  selectedProject.priority === 'high'
                    ? 'destructive'
                    : selectedProject.priority === 'medium'
                    ? 'default'
                    : 'secondary'
                }
              >
                {selectedProject.priority === 'high' ? 'Alta' : selectedProject.priority === 'medium' ? 'Media' : 'Bassa'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Guidelines */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-3">Linee Guida</h3>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-sm text-gray-900">{selectedProject.guidelines}</p>
          </div>
        </Card>

        {/* Files */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">File da Stampare</h3>
          <div className="space-y-2">
            {selectedProject.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{file}</span>
                </div>
                <Button variant="ghost" size="sm">
                  Visualizza
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Print Status */}
        {selectedProject.status === 'printing' && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Printer className="w-5 h-5 text-[#52a8b9]" />
              <h3 className="text-gray-900">Stato Stampa</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#52a8b9]/10 border border-[#52a8b9]/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#52a8b9] animate-pulse" />
                  <span className="text-sm text-gray-900">Stampa in corso...</span>
                </div>
                {selectedProject.notes && (
                  <p className="text-xs text-gray-600">{selectedProject.notes}</p>
                )}
              </div>

              <Progress value={65} className="h-2" />
              <p className="text-sm text-gray-600 text-center">65% completato</p>
            </div>
          </Card>
        )}

        {/* Print Error */}
        {selectedProject.status === 'error' && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-gray-900">Errore Stampa</h3>
            </div>
            
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-4">
              <p className="text-sm text-red-900">
                Errore durante la stampa. Controllare la stampante e i materiali.
              </p>
            </div>

            <Button className="w-full bg-[#52a8b9] hover:bg-[#458a98]">
              Riprova Stampa
            </Button>
          </Card>
        )}

        {/* Upload Files */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">Carica Materiali Finali</h3>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#52a8b9] transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-900 mb-1">
              Clicca per caricare o trascina i file qui
            </p>
            <p className="text-xs text-gray-600">PDF, AI, SVG, PNG (max 50MB)</p>
          </div>

          {isUploading && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="h-2 mb-2" />
              <p className="text-sm text-gray-600 text-center">{uploadProgress}%</p>
            </div>
          )}

          <Button
            onClick={handleSimulateUpload}
            className="w-full mt-4 bg-[#52a8b9] hover:bg-[#458a98]"
            disabled={isUploading}
          >
            {isUploading ? 'Caricamento...' : 'Simula Caricamento File'}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-gray-900 mb-1">Area Grafica & Stampa</h1>
        <p className="text-gray-600">Ordini grafica da realizzare</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-gray-900 mb-1">1</div>
            <div className="text-xs text-gray-600">Bozze</div>
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
            <div className="text-2xl text-purple-600 mb-1">1</div>
            <div className="text-xs text-gray-600">Stampa</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl text-green-600 mb-1">9</div>
            <div className="text-xs text-gray-600">Completati</div>
          </div>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                {project.type === 'print' ? (
                  <Printer className="w-8 h-8 text-purple-600" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-pink-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-gray-900 mb-1">{project.title}</div>
                    <div className="text-sm text-gray-600">{project.id}</div>
                  </div>
                  <Badge variant="default" className="bg-[#52a8b9]">
                    {getTypeLabel(project.type)}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        project.status === 'completed'
                          ? 'bg-green-600'
                          : project.status === 'printing'
                          ? 'bg-purple-600 animate-pulse'
                          : project.status === 'in_progress'
                          ? 'bg-[#52a8b9]'
                          : project.status === 'error'
                          ? 'bg-red-600'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="text-xs text-gray-600">
                      {getStatusLabel(project.status)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {project.files.length} file
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
