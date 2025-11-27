import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FormData {
  nomeCompleto: string;
  celular: string;
  endereco: string;
  cidade: string;
  bairro: string;
  email: string;
  telefoneFixo: string;
  uf: string;
}

interface CadastroClientesProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
}

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export function CadastroClientes({ formData, onFormDataChange }: CadastroClientesProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do cliente:', formData);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
  };

  return (
    <>
      <div className="mb-3 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cadastro de Clientes</h2>
        <p className="text-gray-600">Insira os dados abaixo para registrar um novo cliente</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-6">
          {/* Coluna Esquerda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                placeholder="Digite o nome completo"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Celular
              </label>
              <input
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                placeholder="(xx) x xxxx-xxxx"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Endereço
              </label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Digite o endereço"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Insira a Cidade"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Bairro
              </label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Insira o bairro"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Telefone fixo
              </label>
              <input
                type="text"
                name="telefoneFixo"
                value={formData.telefoneFixo}
                onChange={handleChange}
                placeholder="(xx) x xxxx-xxxx"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                UF
              </label>
              <div className="relative w-24">
                <select
                  name="uf"
                  value={formData.uf}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="">UF</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

