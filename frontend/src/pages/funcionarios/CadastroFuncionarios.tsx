import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

interface FormData {
  codigo: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  cargo: string;
  salario: string;
  dataAdmissao: string;
  status: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  nivelAcesso: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface CadastroFuncionariosProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
}

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const cargos = [
  'Gerente',
  'Vendedor',
  'Atendente',
  'Caixa',
  'Estoquista',
  'Supervisor',
  'Auxiliar',
  'Assistente'
];

const niveisAcesso = [
  'Usuário',
  'Administrador',
  'Supervisor'
];

export function CadastroFuncionarios({ formData, onFormDataChange }: CadastroFuncionariosProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do funcionário:', formData);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
  };

  const handleNovo = () => {
    onFormDataChange({
      codigo: 'FUN0001',
      nomeCompleto: '',
      email: '',
      telefone: '',
      cargo: '',
      salario: '0,00',
      dataAdmissao: '',
      status: 'Ativo',
      rg: '',
      cpf: '',
      dataNascimento: '',
      nivelAcesso: 'Usuário',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: ''
    });
  };

  return (
    <>
      <div className="mb-3 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cadastro de Funcionários</h2>
        <p className="text-gray-600">Preencha os dados abaixo para registrar um novo funcionário.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        {/* Informações do Funcionário */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#008080] mb-4">Informações do Funcionário</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Código
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                readOnly
                className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                placeholder="Digite o nome completo do funcionário"
                required
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemplo@empresa.com"
                required
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Telefone
              </label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(xx) XXXXX-XXXX"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Cargo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  required
                  className="w-full h-12 border border-gray-300 rounded-lg px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="">Selecione o cargo</option>
                  {cargos.map(cargo => (
                    <option key={cargo} value={cargo}>
                      {cargo}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Salário
              </label>
              <input
                type="text"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                placeholder="0,00"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Data de Admissão
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dataAdmissao"
                  value={formData.dataAdmissao}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#008080] mb-4">Dados Pessoais</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                RG
              </label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                placeholder="XX.XXX.XXX-X"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="XXX.XXX.XXX-XX"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Data de Nascimento
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nível de Acesso
              </label>
              <div className="relative">
                <select
                  name="nivelAcesso"
                  value={formData.nivelAcesso}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  {niveisAcesso.map(nivel => (
                    <option key={nivel} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#008080] mb-4">Endereço</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                CEP
              </label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="XXXXX-XXX"
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
                placeholder="Rua, Avenida, etc."
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nº
              </label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="123"
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
                placeholder="Nome do bairro"
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
                placeholder="Nome da cidade"
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
                  <option value="">Selecionar</option>
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

        <div className="flex justify-end gap-4 pt-4 mt-6">
          <button
            type="button"
            onClick={() => {
              onFormDataChange({
                codigo: 'FUN0001',
                nomeCompleto: '',
                email: '',
                telefone: '',
                cargo: '',
                salario: '0,00',
                dataAdmissao: '',
                status: 'Ativo',
                rg: '',
                cpf: '',
                dataNascimento: '',
                nivelAcesso: 'Usuário',
                cep: '',
                endereco: '',
                numero: '',
                bairro: '',
                cidade: '',
                uf: ''
              });
            }}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
          >
            Salvar Funcionário
          </button>
        </div>
      </form>
    </>
  );
}

