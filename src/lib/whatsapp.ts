import { Pedido } from "@/types/pedido";
import { formatCurrency } from "./excel";

const ADMIN_PHONE = "5544988602881";

export const openClientWhatsApp = (phone_number: string): void => {
  const phone = phone_number.replace(/\D/g, "");
  const url = `https://wa.me/${phone}`;

  window.open(url, "_blank");
};

export const openRemovalWhatsApp = (pedido: Pedido): void => {
  const message = encodeURIComponent(
    `Solicitação de remoção de pedido:\n\n` +
      `Cliente: ${pedido.customer_name}\n` +
      `Valor devido: ${formatCurrency(pedido.amount_due)}\n` +
      `Descrição: ${pedido.description}\n` +
      `Data: ${pedido.date}\n` +
      `Número: ${pedido.phone_number}`
  );

  const url = `https://wa.me/${ADMIN_PHONE}?text=${message}`;

  window.open(url, "_blank");
};
