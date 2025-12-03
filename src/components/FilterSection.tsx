import { Search, Calendar, DollarSign, X } from 'lucide-react';
import { Filtros } from '@/types/pedido';

interface FilterSectionProps {
  filtros: Filtros;
  onFiltrosChange: (filtros: Filtros) => void;
  onLimpar: () => void;
}

const FilterSection = ({ filtros, onFiltrosChange, onLimpar }: FilterSectionProps) => {
  const hasFilters = filtros.busca || filtros.dataInicio || filtros.dataFim || filtros.valorMin || filtros.valorMax;

  return (
    <div className="card-elderly mb-6 animate-fade-in">

      <div className="space-y-5">
        <div>
          <label htmlFor="busca" className="label-elderly flex items-center gap-2">
            Nome do Cliente
          </label>
          <input
            id="busca"
            type="text"
            value={filtros.busca}
            onChange={(e) => onFiltrosChange({ ...filtros, busca: e.target.value })}
            className="input-elderly w-full"
            placeholder="Digite o nome..."
          />
        </div>

        {/* Botão Limpar */}
        {hasFilters && (
          <button
            onClick={onLimpar}
            className="btn-elderly w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/30 flex items-center justify-center gap-3 mt-4"
          >
            <X size={24} />
            <span>Limpar Filtros</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
