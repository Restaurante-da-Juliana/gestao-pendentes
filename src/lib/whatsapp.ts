import { Pedido } from "@/types/pedido";
import { formatCurrency } from "./excel";

// Número para enviar solicitações de remoção (configurável)
const ADMIN_PHONE = "5511999999999"; // Substituir pelo número real via env se disponível

export const openClientWhatsApp = (phone_number: string): void => {
  const message = encodeURIComponent(
    "Olá! Tudo bem? Estou entrando em contato sobre sua pendência."
  );

  const phone = phone_number.replace(/\D/g, "");
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
};

export const openRemovalWhatsApp = (pedido: Pedido): void => {
  const message = encodeURIComponent(
    `Solicitação de remoção de pedido:\n\n` +
      `Cliente: ${pedido.customer_name}\n` +
      `Valor devido: ${formatCurrency(pedido.amount_due)}\n` +
      `Descrição: ${pedido.description}\n` +
      `Data: ${pedido.date}\n` +
      `Phone_number: ${pedido.phone_number}`
  );

  const url = `https://wa.me/${ADMIN_PHONE}?text=${message}`;

  window.open(url, "_blank");
};
