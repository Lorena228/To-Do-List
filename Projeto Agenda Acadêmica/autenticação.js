document.addEventListener('DOMContentLoaded', function () {
  const googleLogin = document.getElementById('conta-google')
  const criarLista = document.getElementById('botao_criar')
  const inputNomeLista = document.getElementById('nome-lista')

  googleLogin.addEventListener('click', function () {
    window.location.href = 'main_page.html'
  })

  criarLista.addEventListener('click', function () {
    const nomeLista = inputNomeLista.value.trim()

    if (nomeLista) {
      window.location.href = `main_page.html?lista=${encodeURIComponent(
        nomeLista
      )}`
    } else {
      alert('Por favor, insira um nome para a lista!')
    }
  })
})
