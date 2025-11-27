import { useState } from 'react'
import { Box, CircleDollarSign, CircleUser, House, Settings, Truck, User, Users, LogOut } from 'lucide-react';
import { useRoutes } from 'react-router-dom';
import { DashBoard } from './pages/dashboard';
import { Clientes } from './pages/clientes/index';
import { Vendas } from './pages/vendas/index';
import { Produtos } from './pages/produtos/index';
import { Logo } from './components/Logo';

import { Fornecedores } from './pages/fornecedores';

function App() {
  const [pageActive, setPageActive] = useState('dashboard')

  return (
    <div className='w-screen max-w-[1400px] h-screen max-h-[788px] m-auto flex'>
      <div className='w-[22%] h-full py-5 pl-5'>
        <div className='h-full w-full rounded-2xl flex flex-col items-center bg-white p-5 gap-10'>
          <p className=' text-[25px] text-[#008080] font-bold'>
            Meu sistema
          </p>
          <li className='w-full list-none gap-2 flex flex-col'>
            <ul className={`${pageActive === 'dashboard' ? 'bg-[#008080] text-white ' : 'bg-white'} rounded-lg pl-5 h-[30px]  flex items-center gap-2 cursor-pointer`} onClick={() => { setPageActive('dashboard') }}>
              <House className='w-[20px]' /> DashBoard
            </ul>
            <ul className={`${pageActive === 'clientes' ? 'bg-[#008080] text-white ' : 'bg-white'} rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} onClick={() => { setPageActive('clientes') }}>
              <User className='w-[20px]' /> Clientes
            </ul>
            <ul className={`${pageActive === 'funcionarios' ? 'bg-[#008080] text-white ' : 'bg-white'} rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} onClick={() => { setPageActive('funcionarios') }}>
              <CircleUser className='w-[20px]' /> Funcionários
            </ul>
            <ul className={`${pageActive === 'fornecedores' ? 'bg-[#008080] text-white ' : 'bg-white'} rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} onClick={() => { setPageActive('fornecedores') }}>
              <Truck className='w-[20px]' /> Fornecedores
            </ul>
            <ul className={`${pageActive === 'produtos' ? 'bg-[#008080] text-white ' : 'bg-white'} rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} onClick={() => { setPageActive('produtos') }}>
              <Box className='w-[20px]' /> Produtos
            </ul>
            <ul className={`${pageActive === 'vendas' ? 'bg-[#008080] text-white ' : 'bg-white'} rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} onClick={() => { setPageActive('vendas') }}>
              <CircleDollarSign className='w-[20px]' /> Vendas
            </ul>
            <ul className={`${pageActive === 'configuracoes' ? 'bg-[#008080] text-white ' : 'bg-white'} rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer`} onClick={() => { setPageActive('configuracoes') }}>
              <Settings className='w-[20px]' /> Configurações
            </ul>
          </li>
          <button className='w-full bg-red-500 text-white rounded-lg pl-5 h-[30px] flex items-center gap-2 cursor-pointer hover:bg-red-600 transition-colors justify-center'>
            <LogOut className='w-[20px]' /> Sair
          </button>
        </div>
      </div>
      <div className='w-[78%] h-full'>
        {pageActive === 'dashboard' ? <DashBoard /> : ''}
        {pageActive === 'clientes' ? <Clientes /> : ''}
        {pageActive === 'fornecedores' ? <Fornecedores /> : ''}
        {pageActive === 'produtos' ? <Produtos /> : ''}
        {pageActive === 'vendas' ? <Vendas /> : ''}
      </div>
    </div>
  )
}

export default App
