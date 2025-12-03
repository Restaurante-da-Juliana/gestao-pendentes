import { useEffect, useRef, useState } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const FileUploadSkeleton = () => {
  return (
    <div className="card-elderly animate-fade-in p-6 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-16 h-16 bg-muted rounded-full animate-pulse" />

          <div className="flex-1 min-w-0 space-y-2">
            <div className="w-48 h-6 bg-muted rounded animate-pulse" />
            <div className="w-32 h-4 bg-muted rounded animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="w-20 h-4 bg-muted rounded animate-pulse" />
          <div className="w-32 h-6 bg-muted rounded animate-pulse" />
        </div>
      </div>

      <div className="mt-6 w-full h-14 bg-muted rounded-xl animate-pulse" />
    </div>
  );
};

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  fileUrl?: string;
}

const FileUpload = ({ onFileSelect, isLoading, fileUrl }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [hasLoadedUrl, setHasLoadedUrl] = useState(false);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);

  useEffect(() => {
    const loadFileFromUrl = async () => {
      if (!fileUrl) return;
      if (hasLoadedUrl) return;
      setIsFetchingUrl(true);

      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          toast({
            title: "Erro ao carregar",
            description: "Link de planilha inválido, verifique.",
            variant: "destructive",
          });
          setHasLoadedUrl(true);
          return;
        }

        const blob = await response.blob();

        const file = new File([blob], "customers.xlsx", {
          type:
            blob.type ||
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        onFileSelect(file);
      } catch (err) {
        console.error("Erro ao carregar arquivo da URL:", err);
      } finally {
        setHasLoadedUrl(true);
      }
    };
    setIsFetchingUrl(false);

    loadFileFromUrl();
  }, [fileUrl, hasLoadedUrl, onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  if (isFetchingUrl) {
    return <FileUploadSkeleton />;
  }

  return (
    <div className="card-elderly animate-fade-in">
      <div className="text-center">
        <FileSpreadsheet size={64} className="mx-auto text-primary mb-4" />
        <h2 className="text-elderly-xl font-bold text-foreground mb-3">
          Carregar Planilha
        </h2>
        <p className="text-elderly-base text-muted-foreground mb-6">
          Selecione o arquivo Excel com as pendências
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={handleClick}
          disabled={isLoading}
          className="btn-elderly-xl w-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/30 flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Carregando...</span>
            </>
          ) : (
            <>
              <Upload size={28} />
              <span>Selecionar Arquivo</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
