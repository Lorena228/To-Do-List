//NOME DA LISTA
document.addEventListener('DOMContentLoaded', function () {
  const parametro = new URLSearchParams(window.location.search)
  const nomeLista = parametro.get('lista')

  console.log(`Nome da lista recebido: ${nomeLista}`)

  if (nomeLista) {
    document.getElementById('titulo-lista').textContent = `${nomeLista}`
  }
})

function limparCamposModal() {
  document.getElementById('nome_tarefa').value = ''
  document.getElementById('frequencia').value = 'uma vez'
  document.getElementById('note').value = ''
  localStorage.removeItem('indiceEdicao')
}
//Modal sempre limpo ao criar nova tarefa
function abrirModalLimpo(params) {
  limparCamposModal()
  document.getElementById('modal_tarefas').showModal()
}
document.getElementById('adc_tarefa').addEventListener('click', abrirModalLimpo)

//MODAL
const botao_abrir = document.getElementById('adc_tarefa')
const modal = document.querySelector('dialog')
const botao_fechar = document.querySelector('dialog button')
const botao_fechar2 = document.getElementById('salvar_tarefa')

botao_abrir.onclick = function () {
  modal.showModal()
}

botao_fechar.onclick = function () {
  modal.close()
}

import {
  salvarTarefa,
  listarTarefas,
  limparEdicao,
  excluirTarefaIndice,
  definirIndiceEdicao,
  obterIndiceEdicao,
  editarTarefa
} from './crud.js'
//FORMULARIO DO MODAL
//SALVA
document.getElementById('salvar_tarefa').addEventListener('click', () => {
  let nome_tarefa = document.getElementById('nome_tarefa').value
  let frequencia = document.getElementById('frequencia').value
  let notes = document.getElementById('note').value

  const novaTarefa = {
    nome: nome_tarefa,
    frequencia: frequencia,
    anotacoes: notes
  }
  //editando ou adc
  const indiceEdicao = obterIndiceEdicao()

  if (indiceEdicao !== null) {
    console.log(obterIndiceEdicao())
    console.log(novaTarefa)
    debugger
    editarTarefa(indiceEdicao, novaTarefa)
    window.location.reload()
  } else {
    console.log(novaTarefa)
    debugger
    salvarTarefa(novaTarefa, null)
    window.location.reload()
  }

  exibirTarefa()

  limparCamposModal()

  //fechar modal ao clicar "salvar"
  document.querySelector('dialog').close()
})

async function exibirTarefa() {
  const lista = document.getElementById('lista-tarefas')
  const semTarefas = document.getElementById('sem_tarefas')
  lista.innerHTML = ''

  const tarefas = await listarTarefas()
  console.log(tarefas)
  //const tarefas = crud.listar();

  if (tarefas.length === 0) {
    semTarefas.style.display = 'block'
    setTimeout(() => {
      semTarefas.classList.remove('escondido') //mostra a imagem
    }, 10)
  } else {
    semTarefas.classList.add('escondido') //esconde a imagem
    setTimeout(() => {
      semTarefas.style.display = 'none'
    }, 500)
  }

  tarefas.forEach((tarefa, index) => {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = `tarefa-${index}`

    const label = document.createElement('label')
    label.htmlFor = `tarefa-${index}`
    label.textContent = `${tarefa.nome}`
    label.addEventListener('click', () => abrirModalEditar(index))
    document.getElementById('lista-tarefas').appendChild(label)

    const container = document.createElement('div')
    container.classList.add('campo-tarefa')
    container.appendChild(checkbox)
    container.appendChild(label)

    lista.appendChild(container)
  })
}

async function abrirModalEditar(index) {
  const tarefas = await listarTarefas()
  const tarefa = tarefas[index]

  document.getElementById('nome_tarefa').value = tarefa.nome
  document.getElementById('frequencia').value = tarefa.frequencia
  document.getElementById('note').value = tarefa.anotacoes

  definirIndiceEdicao(index)

  document.querySelector('dialog').showModal()
}

function ajudanteExcluirTarefa() {
  excluirTarefaIndice()
  exibirTarefa()
  window.location.reload()
  modal.close()
}
document
  .getElementById('botao_excluir')
  .addEventListener('click', ajudanteExcluirTarefa)

window.addEventListener('load', exibirTarefa)
