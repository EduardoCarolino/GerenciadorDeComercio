import React from "react";
import { Save, RefreshCcw, ChevronDown } from "lucide-react";

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

interface CadastroFornecedoresProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
}

const estados = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO"
];

export function CadastroFornecedores({ formData, onFormDataChange }: CadastroFornecedoresProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormDataChange({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fornecedor cadastrado:", formData);
    alert("Fornecedor cadastrado com sucesso!");
  };

  const handleReset = () => {
    onFormDataChange({
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
  };

  return (
    <div className="max-h-screen overflow-auto px-4 py-6">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cadastro de Fornecedores</h2>
        <p className="text-gray-600">Preencha os dados abaixo para registrar um novo fornecedor</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-6">
          {/* Coluna Esquerda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o nome do fornecedor"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 0000-0000"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Celular</label>
              <input
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                placeholder="(00) 0 0000-0000"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Endereço</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Rua, Av, etc."
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Número</label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Número"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Complemento</label>
              <input
                type="text"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                placeholder="Complemento"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bairro</label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Bairro"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Cidade"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">CEP</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="00000-000"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemplo@email.com"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado (UF)</label>
              <div className="relative w-24">
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="">UF</option>
                  {estados.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="w-full h-12 bg-[#008080] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors"
          >
            <Save className="w-4 h-4" /> Salvar
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Limpar
          </button>
        </div>
      </form>
    </div>
  );
}
