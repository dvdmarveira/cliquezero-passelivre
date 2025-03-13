// Evento para o envio do formulário de cadastro de estudante
document
  .getElementById("cadastroForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Coleta os dados do formulário
    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());

    try {
      // Envia os dados para o backend via POST
      const response = await fetch(
        "http://localhost:3000/cadastrar-estudante",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      // Processa a resposta do servidor
      const resultado = await response.json();

      // Exibe os resultados na tela
      const resultadoDiv = document.getElementById("resultado");
      const resultadoConteudo = document.getElementById("resultadoConteudo");

      // Remove a classe 'hidden' para mostrar a seção de resultado
      resultadoDiv.classList.remove("hidden");

      console.log(resultado);
      // Define a classe de elegibilidade (verde se elegível, vermelho se não)
      const elegibilidadeClass = resultado.elegibilidade.elegivel
        ? "text-success"
        : "text-error";

      console.log(elegibilidadeClass);

      // Preenche o conteúdo com o nome, status e motivo
      resultadoConteudo.innerHTML = `
          <div class="space-y-4">
              <p class="font-medium">Estudante: ${resultado.estudante.nome}</p>
                            <p style="color: green;">Aluno matriculado com sucesso!</p>
              <p class="${elegibilidadeClass} font-bold">
                  Status VEM: ${
                    resultado.elegibilidade.elegivel
                      ? "ELEGÍVEL"
                      : "NÃO ELEGÍVEL"
                  }
              </p>
              <p>Motivo: ${resultado.elegibilidade.motivo}</p>

          </div>
      `;

      // Se o estudante for elegível, reseta o formulário
      if (resultado.elegibilidade.elegivel) {
        e.target.reset();
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar a solicitação");
    }
  });

// Evento para listar todos os estudantes cadastrados
document
  .getElementById("listarEstudantesBtn")
  .addEventListener("click", listarEstudantes);

async function listarEstudantes() {
  try {
    // Requisição GET para listar os estudantes
    const response = await fetch("http://localhost:3000/estudantes");

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error("Erro ao obter os dados dos estudantes.");
    }

    // Obtém os dados da resposta
    const dados = await response.json();

    // Elemento onde os estudantes serão listados
    const estudantesDiv = document.getElementById("estudantes");
    estudantesDiv.innerHTML = ""; // Limpa a lista de estudantes

    // Exibe o total de estudantes cadastrados
    const totalEstudantes = document.getElementById("totalEstudantes");
    totalEstudantes.innerText = `Total de Estudantes: ${dados.total}`;

    // Verifica se há estudantes para mostrar
    if (dados.total === 0) {
      estudantesDiv.innerHTML = "<p>Nenhum estudante cadastrado.</p>";
      return;
    }

    // Exibe os estudantes na tela
    dados.estudantes.forEach((estudante) => {
      const estudanteItem = document.createElement("div");
      estudanteItem.classList.add("estudante-item");
      estudanteItem.innerHTML = `
        <p><strong>Nome:</strong> ${estudante.nome}</p>
        <p><strong>Série:</strong> ${estudante.serie}</p>
        <p><strong>Escola:</strong> ${estudante.escola}</p>
        <p><strong>NIS:</strong> ${estudante.nis}</p>
        <p><strong>Renda Per Capita:</strong> ${estudante.rendaPerCapita}</p>
        <p><strong>Responsável:</strong> ${estudante.responsavel}</p>
        <p><strong>Telefone:</strong> ${estudante.telefone}</p>
        <hr />
      `;
      estudantesDiv.appendChild(estudanteItem);
    });

    // Exibe a seção de resultados com os estudantes
    const resultadoEstudantesDiv = document.getElementById(
      "resultadoEstudantes"
    );
    resultadoEstudantesDiv.classList.remove("hidden");
  } catch (error) {
    // Exibe um erro caso não consiga listar os estudantes
    console.error("Erro ao listar estudantes:", error);
    alert("Erro ao listar estudantes.");
  }
}
