const URL = 'http://127.0.0.1:5000'
//UPDATE
export async function salvarTarefa(novaTarefa, indice = null) {
  return fetch(`${URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novaTarefa)
  })
    .then(response => {
      if (!response.ok) {
        console.log(response.json())
        debugger
        throw new Error('Erro ao criar a tarefa no servidor')
      }
      console.log(response.json())
      debugger
      return response.json()
    })

    .catch(error => {
      console.error('Erro ao criar tarefa:', error)
    })
}

//DELETE
export async function excluirTarefaIndice() {
  const indice = obterIndiceEdicao()
  const idTarefa = await EncontrarId(indice)
  //const indice = localStorage.getItem('indiceEdicao')

  if (idTarefa) {
    try {
      const response = await fetch(`${URL}/tarefas/${idTarefa}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Erro ao excluir a tarefa')
      }
      console.log(`Tarefa com ID ${idTarefa} excluída com sucesso do servidor.`)
    } catch (error) {
      console.error('Erro ao excluir a tarefa do servidor:', error)
    }
  } else {
    console.warn('Não foi possível encontrar a tarefa para exclusão.')
  }
}

let indiceEdicao = null

export function definirIndiceEdicao(indice) {
  indiceEdicao = indice
}

export function obterIndiceEdicao() {
  return indiceEdicao
}

export function limparEdicao() {
  indiceEdicao = null
}

//UPDATE
export async function editarTarefa(indice, tarefaAtualizada) {
  try {
    const idTarefa = await EncontrarId(indice)
    if (!idTarefa) {
      console.warn('ID da tarefa não encontrado para o índice fornecido.')
      return
    }

    const response = await fetch(`${URL}/tarefas/${idTarefa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarefaAtualizada)
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar a tarefa no servidor.')
    }

    const resultado = await response.json()
    console.log(`Tarefa com ID ${idTarefa} atualizada com sucesso:`, resultado)
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
  }
}

//READ
export function listarTarefas() {
  return fetch(`${URL}/tarefas`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao listar tarefas')
      }
      return response.json() //retorna as tarefas como promessa
    })
    .then(data => {
      console.log('Tarefas recebidas do servidor:', data)
      return data
    })
    .catch(error => {
      console.error('Erro ao buscar tarefas:', error)
      return [] //retorna uma lista vazia
    })
  //return JSON.parse(localStorage.getItem('tarefas')) || []
}

export async function EncontrarId(indice) {
  try {
    const response = await fetch(`${URL}/tarefas`, { method: 'GET' })
    if (!response.ok) {
      throw new Error('Erro ao buscar a lista de tarefas')
    }
    const tarefas = await response.json() // converte em json
    if (indice >= 0 && indice < tarefas.length) {
      return tarefas[indice].id // retorna o id
    } else {
      throw new Error('Índice fora do intervalo da lista de tarefas')
    }
  } catch (error) {
    console.error('Erro ao obter ID por índice:', error)
    return null
  }
}
