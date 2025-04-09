//NOME DA LISTA
document.addEventListener('DOMContentLoaded', function () {
  const parametro = new URLSearchParams(window.location.search)
  const nomeLista = parametro.get('lista')

  if (nomeLista) {
    document.getElementById('titulo-lista').textContent = `${nomeLista}`
  }
})

//Modal sempre limpo ao criar nova tarefa
function abrirModalLimpo(params) {
  document.getElementById('nome_tarefa').value = ''
  document.getElementById('frequencia').value = 'uma vez'
  document.getElementById('note').value = ''
  localStorage.removeItem('indiceEdicao')
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

//FORMULARIO DO MODAL
function salvarTarefa() {
  let nome_tarefa = document.getElementById('nome_tarefa').value
  let frequencia = document.getElementById('frequencia').value
  let notes = document.getElementById('note').value

  const novaTarefa = {
    nome: nome_tarefa,
    frequencia: frequencia,
    anotacoes: notes
  }

  //parse() transformar o texto salvo de volta em array
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

  const indice = localStorage.getItem('indiceEdicao')

  if (indice !== null) {
    tarefas[indice] = novaTarefa
    localStorage.removeItem('indiceEdicao')
  } else {
    tarefas.push(novaTarefa)
  }

  //stringify() transforma o array em texto e salvar
  localStorage.setItem('tarefas', JSON.stringify(tarefas))

  exibirTarefa()

  //limpar campos do modal
  document.getElementById('nome_tarefa').value = ''
  document.getElementById('frequencia').value = 'uma vez'
  document.getElementById('note').value = ''

  //fechar modal ao clicar "salvar"
  document.querySelector('dialog').close()
}

function exibirTarefa() {
  const lista = document.getElementById('lista-tarefas')
  const semTarefas = document.getElementById('sem_tarefas')
  lista.innerHTML = ''

  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
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

function abrirModalEditar(index) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
  const tarefa = tarefas[index]

  document.getElementById('nome_tarefa').value = tarefa.nome
  document.getElementById('frequencia').value = tarefa.frequencia
  document.getElementById('note').value = tarefa.anotacoes

  localStorage.setItem('indiceEdicao', index)

  document.querySelector('dialog').showModal()
}

function excluirTarefa() {
  const indice = localStorage.getItem('indiceEdicao')

  if (indice !== null) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    tarefas.splice(indice, 1)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    localStorage.removeItem('indiceEdicao')
    exibirTarefa()
    modal.close()
  }
}
document
  .getElementById('botao_excluir')
  .addEventListener('click', excluirTarefa)

window.addEventListener('load', exibirTarefa)
