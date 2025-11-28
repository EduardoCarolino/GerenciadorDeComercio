import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CadastroFuncionarios } from './CadastroFuncionarios';
import { ListaFuncionarios } from './ListaFuncionarios';
import { RelatoriosFuncionarios } from './RelatoriosFuncionarios';

export interface Funcionario {
  id: number;
  codigo: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  cargo: string;
  salario: number;
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

export function Funcionarios() {
  const [viewMode, setViewMode] = useState<'cadastro' | 'lista' | 'relatorios'>('cadastro');
  const [formData, setFormData] = useState<FormData>({
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

  // Dados mockados para a lista
  const [funcionarios] = useState<Funcionario[]>([
    {
      id: 1,
      codigo: 'FUN0001',
      nomeCompleto: 'João Silva',
      email: 'joao@empresa.com',
      telefone: '(11) 9 1234-5678',
      cargo: 'Gerente',
      salario: 5000.00,
      dataAdmissao: '2023-01-15',
      status: 'Ativo',
      rg: '12.345.678-9',
      cpf: '123.456.789-00',
      dataNascimento: '1990-05-20',
      nivelAcesso: 'Administrador',
      cep: '01234-567',
      endereco: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP'
    },
    {
      id: 2,
      codigo: 'FUN0002',
      nomeCompleto: 'Maria Santos',
      email: 'maria@empresa.com',
      telefone: '(21) 9 9876-5432',
      cargo: 'Vendedor',
      salario: 3000.00,
      dataAdmissao: '2023-03-10',
      status: 'Ativo',
      rg: '23.456.789-0',
      cpf: '234.567.890-11',
      dataNascimento: '1995-08-15',
      nivelAcesso: 'Usuário',
      cep: '20000-000',
      endereco: 'Av. Principal',
      numero: '456',
      bairro: 'Copacabana',
      cidade: 'Rio de Janeiro',
      uf: 'RJ'
    },
    {
      id: 3,
      codigo: 'FUN0003',
      nomeCompleto: 'Pedro Oliveira',
      email: 'pedro@empresa.com',
      telefone: '(31) 9 8765-4321',
      cargo: 'Atendente',
      salario: 2500.00,
      dataAdmissao: '2023-06-01',
      status: 'Ativo',
      rg: '34.567.890-1',
      cpf: '345.678.901-22',
      dataNascimento: '1998-12-05',
      nivelAcesso: 'Usuário',
      cep: '30000-000',
      endereco: 'Rua do Comércio',
      numero: '789',
      bairro: 'Savassi',
      cidade: 'Belo Horizonte',
      uf: 'MG'
    }
  ]);

  return (
    <div className="w-full h-full pt-5 px-8 pb-8 overflow-y-auto">
      <div className="mb-4 flex-shrink-0">
        <div className="mb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Funcionários</h1>
          <p className="text-gray-600 text-base">Gerencie os funcionários da empresa.</p>
        </div>
        <div className="bg-white rounded-lg py-1 px-4 flex gap-3">
          <button 
            onClick={() => setViewMode('cadastro')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
              viewMode === 'cadastro' 
                ? 'bg-[#008080] text-white hover:bg-[#006666]' 
                : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
            }`}
          >
            <Plus className="w-5 h-5" />
            Funcionários
          </button>
          <button 
            onClick={() => setViewMode('lista')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
              viewMode === 'lista' 
                ? 'bg-[#008080] text-white hover:bg-[#006666]' 
                : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
            }`}
          >
            <Plus className="w-5 h-5" />
            Lista
          </button>
          <button 
            onClick={() => setViewMode('relatorios')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
              viewMode === 'relatorios' 
                ? 'bg-[#008080] text-white hover:bg-[#006666]' 
                : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
            }`}
          >
            <Plus className="w-5 h-5" />
            Relatórios
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl py-3 px-8">
        {viewMode === 'cadastro' ? (
          <CadastroFuncionarios formData={formData} onFormDataChange={setFormData} />
        ) : viewMode === 'lista' ? (
          <ListaFuncionarios funcionarios={funcionarios} />
        ) : (
          <RelatoriosFuncionarios />
        )}
      </div>
    </div>
  );
}

