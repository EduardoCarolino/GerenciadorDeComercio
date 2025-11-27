import { useState } from "react";
import { Plus } from "lucide-react";
import { CadastroFornecedores } from "./CadastroFornecedores";
import { ListaFornecedores } from "./ListaFornecedores";
import { RelatoriosFornecedores } from "./RelatoriosFornecedores";

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  celular: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface FormData {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  celular: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export function Fornecedores() {
  const [viewMode, setViewMode] = useState<"cadastro" | "lista" | "relatorios">("cadastro");
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    celular: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [fornecedores] = useState<Fornecedor[]>([
    {
      id: 1,
      nome: "Fornecedor A",
      cnpj: "00.000.000/0001-00",
      email: "a@fornecedor.com",
      telefone: "(11) 3456-7890",
      celular: "(11) 91234-5678",
      cep: "01000-000",
      endereco: "Rua A",
      numero: "123",
      complemento: "",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 2,
      nome: "Fornecedor B",
      cnpj: "11.111.111/0001-11",
      email: "b@fornecedor.com",
      telefone: "(21) 2345-6789",
      celular: "(21) 98765-4321",
      cep: "20000-000",
      endereco: "Av. B",
      numero: "456",
      complemento: "Sala 2",
      bairro: "Copacabana",
      cidade: "Rio de Janeiro",
      estado: "RJ",
    },
  ]);

  return (
    <div className="w-full h-full pt-5 px-8 pb-8 overflow-hidden">
      <div className="mb-4">
        <div className="mb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Fornecedores</h1>
          <p className="text-gray-600 text-base">Visão geral dos fornecedores.</p>
        </div>

        <div className="bg-white rounded-lg py-1 px-4 flex gap-3">
          {["cadastro", "lista", "relatorios"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
                viewMode === mode
                  ? "bg-[#008080] text-white hover:bg-[#006666]"
                  : "bg-[#80C0C0] text-white hover:bg-[#66A6A6]"
              }`}
            >
              <Plus className="w-5 h-5" />
              {mode === "cadastro" ? "Cadastro" : mode === "lista" ? "Lista" : "Relatórios"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl py-3 px-8">
        {viewMode === "cadastro" && <CadastroFornecedores formData={formData} onFormDataChange={setFormData} />}
        {viewMode === "lista" && <ListaFornecedores fornecedores={fornecedores} />}
        {viewMode === "relatorios" && <RelatoriosFornecedores />}
      </div>
    </div>
  );
}
