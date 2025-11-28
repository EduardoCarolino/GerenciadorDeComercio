import { Funcionario } from "../pages/funcionarios/index" // Ajuste o caminho se necessário

async function getAllFuncionarios(){
    const data = await fetch('http://127.0.0.1:8000/funcionarios/')

    if(!data.ok){
        throw new Error('Requisição dos funcionários não realizada')
    }

    return await data.json() as Funcionario[]
}

async function createFuncionario(bodyFuncionario: Funcionario) {
    const response = await fetch('http://127.0.0.1:8000/funcionarios/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyFuncionario)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json()
}

async function updateFuncionario(bodyFuncionario: Funcionario) {
    const response = await fetch('http://127.0.0.1:8000/funcionarios/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyFuncionario)
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

async function deleteFuncionario(id: number | string) {
    const response = await fetch(`http://127.0.0.1:8000/funcionarios/${id}`, {
        method: 'DELETE'
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

export const ServiceFuncionario = {
    getAllFuncionarios,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario,
}