import { useState, useMemo } from 'react';
import { List, Users, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Pedido, Filtros } from '@/types/pedido';
import { parseExcelFile } from '@/lib/excel';
import FileUpload from './FileUpload';
import FilterSection from './FilterSection';
import PedidoCard from './PedidoCard';
import GroupedView from './GroupedView';
import { toast } from '@/hooks/use-toast';

const initialFiltros: Filtros = {
  busca: '',
  dataInicio: '',
  dataFim: '',
  valorMin: '',
  valorMax: '',
};

const MainScreen = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtros, setFiltros] = useState<Filtros>(initialFiltros);
  const [viewMode, setViewMode] = useState<'lista' | 'agrupado'>('lista');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      const data = await parseExcelFile(file);
      setPedidos(data);
      setFileName(file.name);
      toast({
        title: 'Arquivo carregado!',
        description: `${data.length} pedidos encontrados.`,
      });
    } catch (error) {
      toast({
        title: 'Erro ao carregar',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPedidos = useMemo(() => {
    return pedidos.filter((pedido) => {
      // Busca por nome
      if (filtros.busca) {
        const searchTerm = filtros.busca.toLowerCase();
        if (!pedido.nome_cliente.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      // Filtro por valor
      if (filtros.valorMin) {
        if (pedido.valor_devido < parseFloat(filtros.valorMin)) {
          return false;
        }
      }
      if (filtros.valorMax) {
        if (pedido.valor_devido > parseFloat(filtros.valorMax)) {
          return false;
        }
      }

      // Filtro por data (formato DD/MM/YYYY)
      if (filtros.dataInicio || filtros.dataFim) {
        const parseDate = (dateStr: string): Date | null => {
          // Try DD/MM/YYYY format
          const parts = dateStr.split('/');
          if (parts.length === 3) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1;
            const year = parseInt(parts[2]);
            return new Date(year, month, day);
          }
          return null;
        };

        const pedidoDate = parseDate(pedido.data);
        
        if (pedidoDate) {
          if (filtros.dataInicio) {
            const startDate = new Date(filtros.dataInicio);
            if (pedidoDate < startDate) {
              return false;
            }
          }
          if (filtros.dataFim) {
            const endDate = new Date(filtros.dataFim);
            endDate.setHours(23, 59, 59);
            if (pedidoDate > endDate) {
              return false;
            }
          }
        }
      }

      return true;
    });
  }, [pedidos, filtros]);

  const totalDevido = useMemo(() => {
    return filteredPedidos.reduce((sum, p) => sum + p.valor_devido, 0);
  }, [filteredPedidos]);

  const handleLimparFiltros = () => {
    setFiltros(initialFiltros);
  };

  const handleNewFile = () => {
    setPedidos([]);
    setFileName('');
    setFiltros(initialFiltros);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground p-5 shadow-lg">
        <h1 className="text-elderly-2xl font-bold text-center">
          Pendências
        </h1>
        {fileName && (
          <p className="text-elderly-base text-center mt-1 opacity-90">
            {fileName}
          </p>
        )}
      </header>

      <main className="p-4 pb-8 max-w-2xl mx-auto">
        {pedidos.length === 0 ? (
          <div className="mt-8">
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
          </div>
        ) : (
          <>
            {/* Summary Card */}
            <div className="card-elderly mb-6 bg-primary/5 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-elderly-base text-muted-foreground">
                    Total de Pendências
                  </p>
                  <p className="text-elderly-2xl font-bold text-primary">
                    R$ {totalDevido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-elderly-base text-muted-foreground">
                    Registros
                  </p>
                  <p className="text-elderly-xl font-bold text-foreground">
                    {filteredPedidos.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <FilterSection
              filtros={filtros}
              onFiltrosChange={setFiltros}
              onLimpar={handleLimparFiltros}
            />

            {/* View Toggle */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setViewMode('lista')}
                className={`btn-elderly flex-1 flex items-center justify-center gap-2 ${
                  viewMode === 'lista'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <List size={22} />
                <span>Lista</span>
              </button>
              <button
                onClick={() => setViewMode('agrupado')}
                className={`btn-elderly flex-1 flex items-center justify-center gap-2 ${
                  viewMode === 'agrupado'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <Users size={22} />
                <span>Por Cliente</span>
              </button>
            </div>

            {/* Data Display */}
            {filteredPedidos.length === 0 ? (
              <div className="card-elderly text-center animate-fade-in">
                <AlertCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-elderly-lg text-muted-foreground">
                  Nenhum pedido encontrado com os filtros atuais.
                </p>
              </div>
            ) : viewMode === 'lista' ? (
              <div className="space-y-4">
                {filteredPedidos.map((pedido) => (
                  <PedidoCard key={pedido.id} pedido={pedido} />
                ))}
              </div>
            ) : (
              <GroupedView pedidos={filteredPedidos} />
            )}

            {/* Load New File Button */}
            <button
              onClick={handleNewFile}
              className="btn-elderly w-full mt-8 bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/30 flex items-center justify-center gap-3"
            >
              <FileSpreadsheet size={22} />
              <span>Carregar Nova Planilha</span>
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default MainScreen;
