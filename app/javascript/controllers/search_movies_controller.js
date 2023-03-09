import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search-movies"
export default class extends Controller {
  static targets=['form', 'input', 'list']

  connect() {
  }

  update() {
    // Pegar a url do formulário
    const baseUrl = this.formTarget.action

    // Pegar o que o usuário escreveu
    const query = this.inputTarget.value

    // Montar a url para fazer a busca
    const url = `${baseUrl}?query=${query}`
    fetch(url, {
      headers: { "Accept": "text/plain" } // formato da requisição
    })
      .then(response => response.text())
      .then((data) => {
        // Substituir a lista pela que veio do Rails
        this.listTarget.outerHTML = data
      })
  }
}
