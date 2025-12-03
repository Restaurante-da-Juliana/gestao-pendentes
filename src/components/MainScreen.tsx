import { useState, useMemo } from "react";
import { List, Users, AlertCircle } from "lucide-react";
import { Pedido, Filtros } from "@/types/pedido";
import { parseExcelFile } from "@/lib/excel";
import FileUpload from "./FileUpload";
import FilterSection from "./FilterSection";
import PedidoCard from "./PedidoCard";
import GroupedView from "./GroupedView";
import { toast } from "@/hooks/use-toast";

const initialFiltros: Filtros = {
  busca: "",
};

const MainScreen = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtros, setFiltros] = useState<Filtros>(initialFiltros);
  const [viewMode, setViewMode] = useState<"lista" | "agrupado">("agrupado");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      const data = await parseExcelFile(file);
      setPedidos(data);
      toast({
        title: "Arquivo carregado!",
        description: `${data.length} pedidos encontrados.`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao carregar",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPedidos = useMemo(() => {
    return pedidos.filter((pedido) => {
      if (filtros.busca) {
        const searchTerm = filtros.busca.toLowerCase();
        if (!pedido.customer_name.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [pedidos, filtros]);

  const totalDevido = useMemo(() => {
    return filteredPedidos.reduce((sum, p) => sum + p.amount_due, 0);
  }, [filteredPedidos]);

  const handleLimparFiltros = () => {
    setFiltros(initialFiltros);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground p-5 shadow-lg">
        <h1 className="text-elderly-2xl font-bold text-center">Pendências</h1>
      </header>

      <main
        className={`p-4 pb-8 max-w-2xl mx-auto ${
          viewMode === "agrupado" ? "overflow-x-hidden" : ""
        }`}
      >
        {pedidos.length === 0 ? (
          <div className="mt-8">
            <FileUpload
              onFileSelect={handleFileSelect}
              isLoading={isLoading}
              fileUrl={import.meta.env.VITE_FILE_URL}
            />
          </div>
        ) : (
          <>
            <div className="card-elderly mb-6 bg-primary/5 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-elderly-base text-muted-foreground">
                    Total de Pendências
                  </p>
                  <p className="text-elderly-2xl font-bold text-primary">
                    R${" "}
                    {totalDevido.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
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

            <FilterSection
              filtros={filtros}
              onFiltrosChange={setFiltros}
              onLimpar={handleLimparFiltros}
            />

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setViewMode("agrupado")}
                className={`btn-elderly flex-1 flex items-center justify-center gap-2 ${
                  viewMode === "agrupado"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <List size={22} />
                <span>Por Cliente</span>
              </button>
              <button
                onClick={() => setViewMode("lista")}
                className={`btn-elderly flex-1 flex items-center justify-center gap-2 ${
                  viewMode === "lista"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Users size={22} />
                <span>Lista</span>
              </button>
            </div>

            {filteredPedidos.length === 0 ? (
              <div className="card-elderly text-center animate-fade-in">
                <AlertCircle
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <p className="text-elderly-lg text-muted-foreground">
                  Nenhum pedido encontrado com os filtros atuais.
                </p>
              </div>
            ) : viewMode === "lista" ? (
              <div className="space-y-4">
                {filteredPedidos.map((pedido, key) => (
                  <PedidoCard key={key} pedido={pedido} />
                ))}
              </div>
            ) : (
              <GroupedView pedidos={filteredPedidos} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MainScreen;
