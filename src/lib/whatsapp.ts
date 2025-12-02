import { Pedido } from '@/types/pedido';
import { formatCurrency } from './excel';

// Número para enviar solicitações de remoção (configurável)
const ADMIN_PHONE = '5511999999999'; // Substituir pelo número real via env se disponível

export const openClientWhatsApp = (telefone: string): void => {
  const message = encodeURIComponent(
    'Olá! Tudo bem? Estou entrando em contato sobre sua pendência.'
  );
  
  const phone = telefone.replace(/\D/g, '');
  const url = `https://wa.me/${phone}?text=${message}`;
  
  window.open(url, '_blank');
};

export const openRemovalWhatsApp = (pedido: Pedido): void => {
  const message = encodeURIComponent(
    `Solicitação de remoção de pedido:\n\n` +
    `ID: ${pedido.id}\n` +
    `Cliente: ${pedido.nome_cliente}\n` +
    `Valor devido: ${formatCurrency(pedido.valor_devido)}\n` +
    `Descrição: ${pedido.descricao}\n` +
    `Data: ${pedido.data}\n` +
    `Telefone: ${pedido.telefone}`
  );
  
  const url = `https://wa.me/${ADMIN_PHONE}?text=${message}`;
  
  window.open(url, '_blank');
};
