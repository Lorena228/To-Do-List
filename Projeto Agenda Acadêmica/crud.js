export function salvarTarefa(novaTarefa, indice = null) {
  //parse() transformar o texto salvo de volta em array
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

  if (indice !== null) {
    tarefas[indice] = novaTarefa //edita
    localStorage.removeItem('indiceEdicao')
  } else {
    tarefas.push(novaTarefa) //adiciona
  }

  //stringify() transforma o array em texto e salvar
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

export function excluirTarefaIndice() {
  const indice = localStorage.getItem('indiceEdicao')

  if (indice !== null) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    tarefas.splice(indice, 1)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    localStorage.removeItem('indiceEdicao')
  }
}

let indiceEdicao = null

export function definirIndiceEdicao(indice) {
  indiceEdicao = indice
}

export function obterIndiceEdicao() {
  return indiceEdicao
}

export function editarTarefa(tarefaAtualizada) {
  if (indiceEdicao !== null) {
    const tarefas = obterTarefas()
    tarefas[indiceEdicao] = tarefaAtualizada
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    limparEdicao()
  }
}

export function obterTarefas() {
  return JSON.parse(localStorage.getItem('tarefas')) || []
}

export function limparEdicao() {
  indiceEdicao = null
}
