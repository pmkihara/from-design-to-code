import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-movie"
export default class extends Controller {
  static targets=['infos', 'form']

  connect() {
  }

  revealForm() {
    // Esconder as infos e mostrar o form
    this.infosTarget.classList.add('d-none')
    this.formTarget.classList.remove('d-none')
  }

  update(event) {
    // Não deixar a página dar o reload
    event.preventDefault()

    // Pegar a url do form
    const url = this.formTarget.action

    // Enviar o form via AJAX
    fetch(url, {
      headers: { "Accept": "text/plain" }, // formato da requisição
      method: 'PATCH', // método da requisição (update = PATCH)
      body: new FormData(this.formTarget) // informações do formulário
    })
      .then(response => response.text())
      .then((data) => {
        // Substituir o card do filme com a info que o Rails mandou
        // O this.element é o elemento que contém a propriedade do data-controller
        this.element.outerHTML = data
      })
  }
}
