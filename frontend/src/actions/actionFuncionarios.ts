'use server'

import { Funcionario } from "../pages/funcionarios";
import { ServiceFuncionario } from "../service/funcionarios";

export async function buscarTodosFuncionarios() {
  const response = await ServiceFuncionario.getAllFuncionarios();
  return response;
}

export async function criarUmFuncionario(body: Funcionario) {
    const response = await ServiceFuncionario.createFuncionario(body);

    console.log(response);
}

export async function atualizarUmFuncionario(body: Funcionario) {
    const response = await ServiceFuncionario.updateFuncionario(body);

    console.log(response);
}

export async function deletarUmFuncionario(id: number | string) {
    const response = await ServiceFuncionario.deleteFuncionario(id)

    console.log(response);
}