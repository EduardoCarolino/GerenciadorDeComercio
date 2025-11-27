'use server'

import { Produto } from "../pages/produtos/index";
import { ServiceProduto } from "../service/produtos";

export async function buscarTodosProdutos() {
  const response = await ServiceProduto.getAllProdutos();
  return response;
}

export async function criarUmProduto(body: Produto) {
    const response = await ServiceProduto.createProduto(body);

    console.log(response);
}

export async function atualizarUmProduto(body: Produto) {
    const response = await ServiceProduto.updateProduto(body);

    console.log(response);
}

export async function deletarUmProduto(nome: string) {
    const response = await ServiceProduto.deleteProduto(nome)

    console.log(response);
}