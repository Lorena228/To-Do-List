const URL = 'http://127.0.0.1:5000'
//UPDATE
export function salvarTarefa(novaTarefa, indice = null) {
  return fetch(`${URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novaTarefa)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao criar a tarefa no servidor')
      }
      return response.json()
    })

    .catch(error => {
      console.error('Erro ao criar tarefa:', error)
    })
}

//DELETE
export function excluirTarefaIndice() {
  const indice = obterIndiceEdicao()
  //const indice = localStorage.getItem('indiceEdicao')

  if (indice !== null) {
    return fetch(`${URL}/tarefas/${indice}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir a tarefa')
        }
        localStorage.removeItem('indiceEdicao')
        console.log(
          `Tarefa de indice ${indice} excluída com sucesso do servidor`
        )
      })
      .catch(error => {
        console.error('Erro ao excluir a tarefa do servidor:', error)
      })
  } else {
    console.warn('Nenhum índice de tarefa foi encontrado para exclusão')
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
export function editarTarefa(indice, tarefaAtualizada) {
  if (indiceEdicao !== null) {
    return fetch(`${URL}/tarefas/${indice}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarefaAtualizada)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar a tarefa no servidor')
        }
        return response.json()
      })
      .then(data => {
        console.log(`Tarefa de indice ${indice} atualizada com sucesso:`, data)
      })
      .catch(error => {
        console.log('Erro ao atualizar tarefa:', error)
      })
  } else {
    console.warm('Nenhum indice foi fornecido para edição')
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
