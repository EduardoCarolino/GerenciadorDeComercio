import { useState } from 'react'
<<<<<<< HEAD
import { Box, CircleDollarSign, CircleUser, House, Settings, Truck, Users, LogOut } from 'lucide-react';
=======
import { Box, CircleDollarSign, CircleUser, House, Settings, Truck, User, Users, LogOut } from 'lucide-react';
>>>>>>> e89ea2783c4e3837e86c168a0fae45420eadcd8c
import { DashBoard } from './pages/dashboard';
import { Clientes } from './pages/clientes/index';
import { Funcionarios } from './pages/funcionarios/index';
import { Vendas } from './pages/vendas/index';
import { Produtos } from './pages/produtos/index';
import { Logo } from './components/Logo';
import { Fornecedores } from './pages/fornecedores';

function App() {
  const [pageActive, setPageActive] = useState('dashboard')

  return (
    <div className='w-[1400px] h-[800px] flex fixed top-0 left-0'>
      <div className='w-[308px] h-full py-5 pl-5 flex-shrink-0'>
        <div className='h-full w-full rounded-2xl flex flex-col items-center bg-white p-5 gap-10'>
          <Logo />
          <li className='w-full list-none gap-2 flex flex-col flex-1'>
<<<<<<< HEAD

            <ul className={`${pageActive === 'dashboard' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg pl-5 h-[30px]  flex items-center gap-2 cursor-pointer`} 
              onClick={() => setPageActive('dashboard')}>
              <House className='w-[20px]'/> DashBoard
            </ul>

            <ul className={`${pageActive === 'clientes' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} 
              onClick={() => setPageActive('clientes')}>
              <Users className='w-[20px]'/> Clientes
            </ul>

            <ul className={`${pageActive === 'funcionarios' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} 
              onClick={() => setPageActive('funcionarios')}>
              <CircleUser className='w-[20px]'/> Funcionários
            </ul>

            <ul className={`${pageActive === 'fornecedores' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} 
              onClick={() => setPageActive('fornecedores')}>
              <Truck className='w-[20px]'/> Fornecedores
            </ul>

            <ul className={`${pageActive === 'produtos' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} 
              onClick={() => setPageActive('produtos')}>
              <Box className='w-[20px]'/> Produtos
            </ul>

            <ul className={`${pageActive === 'vendas' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} 
              onClick={() => setPageActive('vendas')}>
              <CircleDollarSign className='w-[20px]'/> Vendas
            </ul>

            <ul className={`${pageActive === 'configuracoes' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} 
              onClick={() => setPageActive('configuracoes')}>
=======
            <ul className={`${pageActive === 'dashboard' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg h-[30px] flex items-center gap-2 cursor-pointer font-normal`} style={pageActive === 'dashboard' ? { marginRight: '8px', paddingLeft: '20px' } : { paddingLeft: '20px' }} onClick={() => {setPageActive('dashboard')}}>
              <House className='w-[20px]'/> DashBoard
            </ul>
            <ul className={`${pageActive === 'clientes' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg h-[30px] flex items-center gap-2 cursor-pointer font-normal`} style={pageActive === 'clientes' ? { marginRight: '8px', paddingLeft: '20px' } : { paddingLeft: '20px' }} onClick={() => {setPageActive('clientes')}}>
              <Users className='w-[20px]'/> Clientes
            </ul>
            <ul className={`${pageActive === 'funcionarios' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg h-[30px] flex items-center gap-2 cursor-pointer font-normal`} style={pageActive === 'funcionarios' ? { marginRight: '8px', paddingLeft: '20px' } : { paddingLeft: '20px' }} onClick={() => {setPageActive('funcionarios')}}>
              <CircleUser className='w-[20px]'/> Funcionários
            </ul>
            <ul className={`${pageActive === 'fornecedores' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg h-[30px] flex items-center gap-2 cursor-pointer font-normal`} style={pageActive === 'fornecedores' ? { marginRight: '8px', paddingLeft: '20px' } : { paddingLeft: '20px' }} onClick={() => {setPageActive('fornecedores')}}>
              <Truck className='w-[20px]'/> Fornecedores
            </ul>
            <ul className={`${pageActive === 'produtos' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg h-[30px] flex items-center gap-2 cursor-pointer font-normal`} style={pageActive === 'produtos' ? { marginRight: '8px', paddingLeft: '20px' } : { paddingLeft: '20px' }} onClick={() => {setPageActive('produtos')}}>
              <Box className='w-[20px]'/> Produtos
            </ul>
            <ul className={`${pageActive === 'vendas' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer font-normal`} style={pageActive === 'vendas' ? { marginRight: '8px', paddingLeft: '20px' } : { paddingLeft: '20px' }} onClick={() => {setPageActive('vendas')}}>
              <CircleDollarSign className='w-[20px]'/> Vendas
            </ul>
            <ul className={`${pageActive === 'configuracoes' ? 'bg-[#008080] text-white ' : 'bg-white' } rounded-lg h-[30px] flex items-center gap-2 cursor-pointer font-normal`} style={pageActive === 'configuracoes' ? { marginRight: '8px', paddingLeft: '20px' } : { paddingLeft: '20px' }} onClick={() => {setPageActive('configuracoes')}}>
>>>>>>> e89ea2783c4e3837e86c168a0fae45420eadcd8c
              <Settings className='w-[20px]'/> Configurações
            </ul>

          </li>
<<<<<<< HEAD

          <button className='w-full bg-red-500 text-white rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer hover:bg-red-600 transition-colors justify-center'>
=======
          <button className='w-full bg-red-500 text-white rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer hover:bg-red-600 transition-colors justify-center font-normal'>
>>>>>>> e89ea2783c4e3837e86c168a0fae45420eadcd8c
            <LogOut className='w-[20px]'/> Sair
          </button>
        </div>
      </div>
<<<<<<< HEAD

      <div className='flex-1 h-full overflow-auto'>
        {pageActive === 'dashboard' && <DashBoard />}
        {pageActive === 'clientes' && <Clientes />}
        {pageActive === 'vendas' && <Vendas />}
        {pageActive === 'fornecedores' && <Fornecedores />}
=======
      <div className='w-[1092px] h-full overflow-auto bg-gray-100'>
          {pageActive === 'dashboard' && <DashBoard />}
          {pageActive === 'clientes' && <Clientes />}
          {pageActive === 'funcionarios' && <Funcionarios />}
          {pageActive === 'fornecedores' && <Fornecedores />}
          {pageActive === 'produtos' && <Produtos />}
          {pageActive === 'vendas' && <Vendas />}
>>>>>>> e89ea2783c4e3837e86c168a0fae45420eadcd8c
      </div>

    </div>
  )
}

export default App
