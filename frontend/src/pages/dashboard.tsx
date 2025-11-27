import { FunctionSquare } from "lucide-react"
import { ServiceCliente } from "../service/clientes"
import { Cliente } from "./clientes/indexCliente"

// async function req() {
//     const clientes: Cliente[] = await ServiceCliente.getAllClientes()
//     console.log(clientes)

//     ServiceCliente.createCliete(  
//         {
//       id: 2,
//       nomeCompleto: 'Maria Santos',
//       email: 'maria@email.com',
//       celular: '(21) 9 9876-5432',
//       telefoneFixo: '(21) 2345-6789',
//       endereco: 'Av. Principal, 456',
//       bairro: 'Copacabana',
//       cidade: 'Rio de Janeiro',
//       uf: 'RJ'
//     },)

//     ServiceCliente.updateCliente({
//       id: 2,
//       nomeCompleto: 'Maria Santosssss',
//       email: 'maria@email.com',
//       celular: '(21) 9 9876-5432',
//       telefoneFixo: '(21) 2345-6789',
//       endereco: 'Av. Principal, 456',
//       bairro: 'Copacabana',
//       cidade: 'Rio de Janeiro',
//       uf: 'RJ'
//     })

//     ServiceCliente.deleteCliente(clientes[0].id)
// }

// req()

export function DashBoard() {
    const mockDadosDashBoard = {
        vendas_diarias: 1250.48,
        novos_clientes_mes: 12,
        pedidos_mes: 44,
        produtos_com_baixo_estoque: 5
    }

    const produtosMaisVendidos = [
        {
            nomeProduto: 'produto1',
            totalDeVendas: 12
        }
    ]

    return (
        <div className="py-5 h-full w-full pl-5 flex flex-col gap-10">
            <div className="">
                <p className="text-[40px] font-medium">
                    DashBoard
                </p>
                <p className="text-[25px]">
                    Visão geral do seu negócio.
                </p>
            </div>
            <div className=" w-full h-[12%] flex text-center justify-between">
                <div className="w-[20%] rounded-lg flex flex-col justify-center bg-white">
                    <p>
                        Vendas Hoje
                    </p>
                    <p className="text-[30px]">
                        R$ {mockDadosDashBoard.vendas_diarias}
                    </p>
                </div>
                <div className="w-[20%] rounded-lg flex flex-col justify-center bg-white">
                    <p>
                        Novos Clientes
                    </p>
                    <p className="text-[30px]">
                        R$ {mockDadosDashBoard.novos_clientes_mes}
                    </p>
                </div>
                <div className="w-[20%] rounded-lg flex flex-col justify-center bg-white">
                    <p>
                        Pedidos
                    </p>
                    <p className="text-[30px]">
                        R$ {mockDadosDashBoard.pedidos_mes}
                    </p>
                </div>
                <div className="w-[20%] rounded-lg flex flex-col justify-center bg-white">
                    <p>
                        Estoque Baixo
                    </p>
                    <p className="text-[30px]">
                        R$ {mockDadosDashBoard.produtos_com_baixo_estoque}
                    </p>
                </div>
            </div>
            <div className="h-full rounded-xl flex gap-10">
                <div className="w-[65%] h-full rounded-lg bg-white">

                </div>
                <div className="w-[35%] h-full rounded-lg bg-white">

                </div>
            </div>
        </div>
    )
}