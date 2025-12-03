import {
  MessageCircle,
  Trash2,
  User,
  Calendar,
  FileText,
  Phone,
  Hash,
} from "lucide-react";
import { Pedido } from "@/types/pedido";
import { formatCurrency, formatPhoneDisplay } from "@/lib/excel";
import { openClientWhatsApp, openRemovalWhatsApp } from "@/lib/whatsapp";

interface PedidoCardProps {
  pedido: Pedido;
}

const PedidoCard = ({ pedido }: PedidoCardProps) => {
  return (
    <div className="card-elderly animate-fade-in">
      {/* Nome do Cliente - Destaque */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-border">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <User size={24} className="text-primary" />
        </div>
        <h3 className="text-elderly-xl font-bold text-foreground flex-1">
          {pedido.customer_name}
        </h3>
      </div>

      {/* Valor Devido - Maior destaque */}
      <div className="bg-primary/5 rounded-xl p-4 mb-5">
        <p className="text-elderly-base text-muted-foreground mb-1">
          Valor Devido
        </p>
        <p className="text-elderly-2xl font-bold text-primary">
          {formatCurrency(pedido.amount_due)}
        </p>
      </div>

      {/* Informações do Pedido */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <FileText
            size={22}
            className="text-muted-foreground mt-1 flex-shrink-0"
          />
          <div>
            <p className="text-elderly-sm text-muted-foreground">Descrição</p>
            <p className="text-elderly-base font-medium text-foreground">
              {pedido.description || "Sem descrição"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar
            size={22}
            className="text-muted-foreground mt-1 flex-shrink-0"
          />
          <div>
            <p className="text-elderly-sm text-muted-foreground">Data</p>
            <p className="text-elderly-base font-medium text-foreground">
              {pedido.date}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone
            size={22}
            className="text-muted-foreground mt-1 flex-shrink-0"
          />
          <div>
            <p className="text-elderly-sm text-muted-foreground">
              Número de Telefone
            </p>
            <p className="text-elderly-base font-medium text-foreground">
              {formatPhoneDisplay(pedido.phone_number)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => openClientWhatsApp(pedido.phone_number)}
          className="btn-elderly-xl w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 focus:ring-whatsapp/30 flex items-center justify-center gap-3"
        >
          <MessageCircle size={28} />
          <span>Abrir Conversa</span>
        </button>

        <button
          onClick={() => openRemovalWhatsApp(pedido)}
          className="btn-elderly-xl w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive/30 flex items-center justify-center gap-3"
        >
          <Trash2 size={28} />
          <span>Remover Pedido</span>
        </button>
      </div>
    </div>
  );
};

export default PedidoCard;
