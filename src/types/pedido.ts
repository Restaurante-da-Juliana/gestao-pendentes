export interface Pedido {
  id: string | number;
  nome_cliente: string;
  valor_devido: number;
  descricao: string;
  data: string;
  telefone: string;
}

export interface PedidoAgrupado {
  nome_cliente: string;
  total_devido: number;
  pedidos: Pedido[];
}

export interface Filtros {
  busca: string;
  dataInicio: string;
  dataFim: string;
  valorMin: string;
  valorMax: string;
}
