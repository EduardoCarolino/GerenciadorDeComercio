'use server'

import { Cliente } from "../pages/clientes/indexCliente";
import { ServiceCliente } from "../service/clientes";

export async function buscarTodosClientes() {
  const response = await ServiceCliente.getAllClientes();
  return response;
}

export async function criarUmCliente(body: Cliente) {
    const response = await ServiceCliente.createCliete(body);

    console.log(response);
}

export async function atualizarUmCliente(body: Cliente) {
    const response = await ServiceCliente.updateCliente(body);

    console.log(response);
}

export async function deletarUmCliente(email: string) {
    const response = await ServiceCliente.deleteCliente(email)

    console.log(response);
}