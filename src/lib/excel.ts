import * as XLSX from "xlsx";
import { Pedido } from "@/types/pedido";

export const parseExcelFile = (file: File): Promise<Pedido[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as unknown[][];

        // Skip header row, map data to Pedido interface
        const pedidos: Pedido[] = [];

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (row && row.length >= 5) {
            pedidos.push({
              customer_name: String(row[0] || ""),
              phone_number: formatPhone(String(row[1] || "")),
              amount_due: parseFloat(String(row[2])) || 0,
              date: formatExcelDate(row[3]),
              description: String(row[4] || ""),
            });
          }
        }

        resolve(pedidos);
      } catch (error) {
        reject(
          new Error(
            "Erro ao ler o arquivo Excel. Verifique se o formato está correto."
          )
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Erro ao carregar o arquivo."));
    };

    reader.readAsBinaryString(file);
  });
};

const formatExcelDate = (value: unknown): string => {
  if (!value) return "";

  // If it's already a string date
  if (typeof value === "string") {
    return value;
  }

  // Excel serial date number
  if (typeof value === "number") {
    const date = XLSX.SSF.parse_date_code(value);
    if (date) {
      const day = String(date.d).padStart(2, "0");
      const month = String(date.m).padStart(2, "0");
      const year = date.y;
      return `${day}/${month}/${year}`;
    }
  }

  return String(value);
};

const formatPhone = (phone: string): string => {
  // Remove all non-numeric characters
  const numbers = phone.replace(/\D/g, "");

  // If already has country code, return as is
  if (numbers.startsWith("55") && numbers.length >= 12) {
    return numbers;
  }

  // Add country code if needed
  if (numbers.length === 11 || numbers.length === 10) {
    return `55${numbers}`;
  }

  return numbers;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatPhoneDisplay = (phone: string): string => {
  const numbers = phone.replace(/\D/g, "");

  if (numbers.length === 13) {
    // 55 + DDD + 9 digits
    return `(${numbers.slice(2, 4)}) ${numbers.slice(4, 5)} ${numbers.slice(
      5,
      9
    )}-${numbers.slice(9)}`;
  }

  if (numbers.length === 12) {
    // 55 + DDD + 8 digits
    return `(${numbers.slice(2, 4)}) ${numbers.slice(4, 8)}-${numbers.slice(
      8
    )}`;
  }

  if (numbers.length === 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(
      3,
      7
    )}-${numbers.slice(7)}`;
  }

  if (numbers.length === 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
      6
    )}`;
  }

  return phone;
};
