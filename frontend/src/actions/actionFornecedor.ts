'use server'

import { Fornecedor } from "../pages/fornecedores";
import { ServiceFornecedor } from "../service/fornecedor";

export async function buscarTodosFornecedores() {
  const response = await ServiceFornecedor.getAllFornecedores();
  return response;
}

export async function criarUmFornecedor(body: Fornecedor) {
    const response = await ServiceFornecedor.createFornecedor(body);

    console.log(response);
}

export async function atualizarUmFornecedor(body: Fornecedor) {
    const response = await ServiceFornecedor.updateFornecedor(body);

    console.log(response);
}

export async function deletarUmFornecedor(email: string) {
    const response = await ServiceFornecedor.deleteFornecedor(email)

    console.log(response);
}