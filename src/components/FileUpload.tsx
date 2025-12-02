import { useRef } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUpload = ({ onFileSelect, isLoading }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

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
