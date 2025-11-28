// import React, { useState } from 'react';
// import { Plus } from 'lucide-react';
// import { CadastroClientes } from './CadastroClientes';
// import { ListaClientes } from './ListaClientes';
// import { RelatoriosClientes } from './RelatoriosClientes';

// interface Cliente {
//   id: string;
//   nomeCompleto: string;
//   email: string;
//   celular: string;
//   telefoneFixo: string;
//   endereco: string;
//   bairro: string;
//   cidade: string;
//   uf: string;
// }

// interface FormData {
//   nomeCompleto: string;
//   celular: string;
//   endereco: string;
//   cidade: string;
//   bairro: string;
//   email: string;
//   telefoneFixo: string;
//   uf: string;
// }

// interface cleinteProps {
//   clientes: Cliente[],
// }

// export function Clientes({clientes}: cleinteProps) {
//   const [viewMode, setViewMode] = useState<'cadastro' | 'lista' | 'relatorios'>('cadastro');
//   const [formData, setFormData] = useState<FormData>({
//     nomeCompleto: '',
//     celular: '',
//     endereco: '',
//     cidade: '',
//     bairro: '',
//     email: '',
//     telefoneFixo: '',
//     uf: ''
//   });

//   // Dados mockados para a lista
//   // const [clientes] = useState<Cliente[]>([
//   //   {
//   //     id: '1',
//   //     nomeCompleto: 'João Silva',
//   //     email: 'joao@email.com',
//   //     celular: '(11) 9 1234-5678',
//   //     telefoneFixo: '(11) 3456-7890',
//   //     endereco: 'Rua das Flores, 123',
//   //     bairro: 'Centro',
//   //     cidade: 'São Paulo',
//   //     uf: 'SP'
//   //   },
//   //   {
//   //     id: '2',
//   //     nomeCompleto: 'Maria Santos',
//   //     email: 'maria@email.com',
//   //     celular: '(21) 9 9876-5432',
//   //     telefoneFixo: '(21) 2345-6789',
//   //     endereco: 'Av. Principal, 456',
//   //     bairro: 'Copacabana',
//   //     cidade: 'Rio de Janeiro',
//   //     uf: 'RJ'
//   //   },
//   //   {
//   //     id: '3',
//   //     nomeCompleto: 'Pedro Oliveira',
//   //     email: 'pedro@email.com',
//   //     celular: '(31) 9 8765-4321',
//   //     telefoneFixo: '(31) 3456-7890',
//   //     endereco: 'Rua do Comércio, 789',
//   //     bairro: 'Savassi',
//   //     cidade: 'Belo Horizonte',
//   //     uf: 'MG'
//   //   }
//   // ]);

//   return (
//     <div className="w-full h-full pt-5 px-8 pb-8 overflow-y-auto">
//       <div className="mb-4 flex-shrink-0">
//         <div className="mb-4">
//           <h1 className="text-5xl font-bold text-gray-900 mb-2">Dashboard</h1>
//           <p className="text-gray-600 text-base">Visão geral do seu negócio.</p>
//         </div>
//         <div className="bg-white rounded-lg py-1 px-4 flex gap-3">
//           <button 
//             onClick={() => setViewMode('cadastro')}
//             className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
//               viewMode === 'cadastro' 
//                 ? 'bg-[#008080] text-white hover:bg-[#006666]' 
//                 : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
//             }`}
//           >
//             <Plus className="w-5 h-5" />
//             Clientes
//           </button>
//           <button 
//             onClick={() => setViewMode('lista')}
//             className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
//               viewMode === 'lista' 
//                 ? 'bg-[#008080] text-white hover:bg-[#006666]' 
//                 : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
//             }`}
//           >
//             <Plus className="w-5 h-5" />
//             Lista
//           </button>
//           <button 
//             onClick={() => setViewMode('relatorios')}
//             className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
//               viewMode === 'relatorios' 
//                 ? 'bg-[#008080] text-white hover:bg-[#006666]' 
//                 : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
//             }`}
//           >
//             <Plus className="w-5 h-5" />
//             Relatórios
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl py-3 px-8">
//         {viewMode === 'cadastro' ? (
//           <CadastroClientes formData={formData} onFormDataChange={setFormData} />
//         ) : viewMode === 'lista' ? (
//           <ListaClientes clientes={clientes} />
//         ) : (
//           <RelatoriosClientes />
//         )}
//       </div>
//     </div>
//   );
// }

