export interface Pedido {
  customer_name: string;
  amount_due: number;
  description: string;
  date: string;
  phone_number: string;
}

export interface PedidoAgrupado {
  customer_name: string;
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
