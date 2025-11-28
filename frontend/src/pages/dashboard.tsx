import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DollarSign, Users, ShoppingCart, AlertTriangle, TrendingUp, Package, UserPlus, Truck } from 'lucide-react';

export function DashBoard() {
    const mockDadosDashBoard = {
        vendas_diarias: 1250.48,
        novos_clientes_mes: 12,
        pedidos_pendentes: 5,
        produtos_com_baixo_estoque: 3,
        receita_total: 45230.50,
        total_produtos: 156,
        funcionarios_ativos: 8,
        fornecedores: 12
    }

    const atividadesRecentes = [
        { id: 'VEN001', cliente: 'João Silva', valor: 450.00, status: 'Concluída' },
        { id: 'VEN002', cliente: 'Maria Santos', valor: 320.50, status: 'Pendente' },
        { id: 'VEN003', cliente: 'Pedro Oliveira', valor: 890.00, status: 'Concluída' },
        { id: 'VEN004', cliente: 'Ana Costa', valor: 125.75, status: 'Concluída' },
        { id: 'VEN005', cliente: 'Carlos Souza', valor: 650.00, status: 'Pendente' }
    ];

    // Gráfico de Vendas da Semana
    const vendasSemanaOptions = {
        chart: {
            type: 'line',
            backgroundColor: 'transparent',
            height: 280,
            spacingTop: 10,
            spacingRight: 15,
            spacingBottom: 20,
            spacingLeft: 15
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            labels: {
                style: {
                    color: '#6b7280',
                    fontSize: '12px'
                }
            },
            lineColor: '#e5e7eb',
            tickColor: '#e5e7eb'
        },
        yAxis: {
            title: {
                text: 'Valor (R$)',
                style: {
                    color: '#6b7280',
                    fontSize: '12px'
                }
            },
            labels: {
                style: {
                    color: '#6b7280',
                    fontSize: '12px'
                }
            },
            min: 1000,
            max: 2750,
            tickInterval: 250,
            gridLineColor: '#f3f4f6',
            lineColor: '#e5e7eb'
        },
        series: [{
            name: 'Vendas',
            data: [1200, 1900, 1500, 2200, 1800, 2500],
            color: '#008080',
            lineWidth: 3,
            marker: {
                radius: 5,
                fillColor: '#008080',
                lineWidth: 2,
                lineColor: '#ffffff'
            }
        }],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb',
            borderRadius: 8,
            style: {
                color: '#1f2937'
            },
            formatter: function(this: any) {
                return '<b>' + this.x + '</b><br/>' +
                       'Valor: <b>R$ ' + this.y.toFixed(2).replace('.', ',') + '</b>';
            }
        }
    };


    return (
        <div className="py-5 h-full w-full pl-5 pr-5 flex flex-col gap-4 overflow-hidden">
            {/* Header */}
            <div className="">
                <p className="text-[40px] font-medium text-gray-900">
                    Dashboard
                </p>
                <p className="text-[25px] text-gray-600">
                    Visão geral do seu negócio.
                </p>
            </div>

            {/* Top KPI Cards */}
            <div className="w-full flex text-center justify-between gap-4">
                <div className="w-[23%] rounded-lg bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#E0F7F7] flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-7 h-7 text-[#008080]" />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-600 text-sm">
                            Vendas Hoje
                        </p>
                        <p className="text-[22px] font-semibold text-gray-900">
                            R$ {mockDadosDashBoard.vendas_diarias.toFixed(2).replace('.', ',')}
                        </p>
                    </div>
                </div>
                <div className="w-[23%] rounded-lg bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Users className="w-7 h-7 text-orange-500" />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-600 text-sm">
                            Novos Clientes
                        </p>
                        <p className="text-[22px] font-semibold text-gray-900">
                            {mockDadosDashBoard.novos_clientes_mes}
                        </p>
                    </div>
                </div>
                <div className="w-[23%] rounded-lg bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="w-7 h-7 text-green-500" />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-600 text-sm">
                            Pedidos Pendentes
                        </p>
                        <p className="text-[22px] font-semibold text-gray-900">
                            {mockDadosDashBoard.pedidos_pendentes}
                        </p>
                    </div>
                </div>
                <div className="w-[23%] rounded-lg bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-7 h-7 text-red-500" />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-600 text-sm">
                            Estoque Baixo
                        </p>
                        <p className="text-[22px] font-semibold text-gray-900">
                            {mockDadosDashBoard.produtos_com_baixo_estoque}
                        </p>
                    </div>
                </div>
            </div>

            {/* Middle Section - Vendas da Semana e Atividades Recentes */}
            <div className="flex gap-6 flex-1 min-h-0">
                {/* Vendas da Semana */}
                <div className="w-[65%] rounded-lg bg-white p-6 shadow-sm flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Vendas da Semana</h3>
                    <div className="flex-1" style={{ minHeight: '250px', maxHeight: '300px', width: '100%' }}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={vendasSemanaOptions}
                            containerProps={{ style: { width: '100%', height: '100%' } }}
                        />
                    </div>
                </div>

                {/* Atividades Recentes */}
                <div className="w-[35%] rounded-lg bg-white p-6 shadow-sm flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Atividades Recentes</h3>
                    <div className="flex-1 overflow-auto">
                        {atividadesRecentes.length > 0 ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID Venda</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cliente</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Valor</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {atividadesRecentes.map((venda, index) => (
                                        <tr key={venda.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="py-3 px-4 text-sm text-gray-900">{venda.id}</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">{venda.cliente}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900 font-medium">R$ {venda.valor.toFixed(2).replace('.', ',')}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    venda.status === 'Concluída' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {venda.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                Nenhuma venda registrada ainda
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom KPI Cards */}
            <div className="w-full flex text-center justify-between gap-4">
                <div className="w-[23%] rounded-lg bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-7 h-7 text-purple-500" />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-600 text-sm">
                            Receita Total
                        </p>
                        <p className="text-[22px] font-semibold text-gray-900">
                            R$ {mockDadosDashBoard.receita_total.toFixed(2).replace('.', ',')}
                        </p>
                    </div>
                </div>
                <div className="w-[23%] rounded-lg bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Package className="w-7 h-7 text-green-500" />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-600 text-sm">
                            Total de Produtos
                        </p>
                        <p className="text-[22px] font-semibold text-gray-900">
                            {mockDadosDashBoard.total_produtos}
                        </p>
                    </div>
                </div>
                <div className="w-[23%] rounded-lg bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <UserPlus className="w-7 h-7 text-orange-500" />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-600 text-sm">
                            Funcionários Ativos
                        </p>
                        <p className="text-[22px] font-semibold text-gray-900">
                            {mockDadosDashBoard.funcionarios_ativos}
                        </p>
                    </div>
                </div>
                <div className="w-[23%] rounded-lg bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-7 h-7 text-blue-500" />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-600 text-sm">
                            Fornecedores
                        </p>
                        <p className="text-[22px] font-semibold text-gray-900">
                            {mockDadosDashBoard.fornecedores}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}