import { useState } from 'react';
import { ChevronDown, ChevronUp, User, Users } from 'lucide-react';
import { Pedido, PedidoAgrupado } from '@/types/pedido';
import { formatCurrency } from '@/lib/excel';
import PedidoCard from './PedidoCard';

interface GroupedViewProps {
  pedidos: Pedido[];
}

const GroupedView = ({ pedidos }: GroupedViewProps) => {
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set());

  // Group pedidos by client name
  const grupos: PedidoAgrupado[] = pedidos.reduce((acc, pedido) => {
    const existingGroup = acc.find(g => g.nome_cliente === pedido.nome_cliente);
    
    if (existingGroup) {
      existingGroup.pedidos.push(pedido);
      existingGroup.total_devido += pedido.valor_devido;
    } else {
      acc.push({
        nome_cliente: pedido.nome_cliente,
        total_devido: pedido.valor_devido,
        pedidos: [pedido],
      });
    }
    
    return acc;
  }, [] as PedidoAgrupado[]);

  // Sort by total value (highest first)
  grupos.sort((a, b) => b.total_devido - a.total_devido);

  const toggleExpand = (clientName: string) => {
    const newExpanded = new Set(expandedClients);
    if (newExpanded.has(clientName)) {
      newExpanded.delete(clientName);
    } else {
      newExpanded.add(clientName);
    }
    setExpandedClients(newExpanded);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Users size={20} />
        <span className="text-elderly-base font-medium">
          {grupos.length} cliente{grupos.length !== 1 ? 's' : ''}
        </span>
      </div>

      {grupos.map((grupo) => {
        const isExpanded = expandedClients.has(grupo.nome_cliente);
        
        return (
          <div key={grupo.nome_cliente} className="animate-fade-in">
            {/* Client Header - Clickable */}
            <button
              onClick={() => toggleExpand(grupo.nome_cliente)}
              className="card-elderly w-full text-left hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-elderly-xl font-bold text-foreground truncate">
                      {grupo.nome_cliente}
                    </h3>
                    <p className="text-elderly-base text-muted-foreground">
                      {grupo.pedidos.length} pedido{grupo.pedidos.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-elderly-sm text-muted-foreground">Total</p>
                    <p className="text-elderly-xl font-bold text-primary">
                      {formatCurrency(grupo.total_devido)}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={28} className="text-muted-foreground" />
                  ) : (
                    <ChevronDown size={28} className="text-muted-foreground" />
                  )}
                </div>
              </div>
            </button>

            {/* Expanded Pedidos */}
            {isExpanded && (
              <div className="mt-3 ml-4 pl-4 border-l-4 border-primary/20 space-y-4">
                {grupo.pedidos.map((pedido) => (
                  <PedidoCard key={pedido.id} pedido={pedido} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GroupedView;
