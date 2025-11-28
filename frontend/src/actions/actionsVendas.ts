'use server'

import { Venda } from "../pages/vendas/HistoricoVendas";
import { ServiceVenda } from "../service/vendas";

export async function buscarTodasVendas() {
  const response = await ServiceVenda.getAllVendas();
  return response;
}

export async function criarUmaVenda(body: Venda) {
    const response = await ServiceVenda.createVenda(body);

    console.log(response);
}

export async function atualizarUmaVenda(body: Venda) {
    const response = await ServiceVenda.updateVenda(body);

    console.log(response);
}

export async function deletarUmaVenda(id: number) {
    // Vendas são deletadas pelo ID
    const response = await ServiceVenda.deleteVenda(id)

    console.log(response);
}