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
      <h2 className="text-elderly-xl font-bold text-foreground mb-5 flex items-center gap-2">
        <Search size={24} />
        Filtros
      </h2>

      <div className="space-y-5">
        {/* Busca por nome */}
        <div>
          <label htmlFor="busca" className="label-elderly flex items-center gap-2">
            <Search size={18} />
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

        {/* Filtro por data */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="dataInicio" className="label-elderly flex items-center gap-2">
              <Calendar size={18} />
              Data Início
            </label>
            <input
              id="dataInicio"
              type="date"
              value={filtros.dataInicio}
              onChange={(e) => onFiltrosChange({ ...filtros, dataInicio: e.target.value })}
              className="input-elderly w-full"
            />
          </div>
          <div>
            <label htmlFor="dataFim" className="label-elderly flex items-center gap-2">
              <Calendar size={18} />
              Data Fim
            </label>
            <input
              id="dataFim"
              type="date"
              value={filtros.dataFim}
              onChange={(e) => onFiltrosChange({ ...filtros, dataFim: e.target.value })}
              className="input-elderly w-full"
            />
          </div>
        </div>

        {/* Filtro por valor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="valorMin" className="label-elderly flex items-center gap-2">
              <DollarSign size={18} />
              Valor Mínimo
            </label>
            <input
              id="valorMin"
              type="number"
              min="0"
              step="0.01"
              value={filtros.valorMin}
              onChange={(e) => onFiltrosChange({ ...filtros, valorMin: e.target.value })}
              className="input-elderly w-full"
              placeholder="R$ 0,00"
            />
          </div>
          <div>
            <label htmlFor="valorMax" className="label-elderly flex items-center gap-2">
              <DollarSign size={18} />
              Valor Máximo
            </label>
            <input
              id="valorMax"
              type="number"
              min="0"
              step="0.01"
              value={filtros.valorMax}
              onChange={(e) => onFiltrosChange({ ...filtros, valorMax: e.target.value })}
              className="input-elderly w-full"
              placeholder="R$ 9999,99"
            />
          </div>
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
