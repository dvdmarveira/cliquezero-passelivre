const express = require("express");
// const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { Database } = require("./src/database");

const db = new Database();

// // Base de dados simulada de estudantes
// let estudantesDB = [
//   {
//     id: 1,
//     nome: "João Silva",
//     serie: "6º ano",
//     escola: "EM Professor João Santos",
//     nis: "12345678901",
//     dataNascimento: "2011-03-15",
//     responsavel: "Maria Silva",
//     telefone: "81999999999",
//   },
//   {
//     id: 2,
//     nome: "Maria Santos",
//     serie: "7º ano",
//     escola: "EM Professor João Santos",
//     nis: "12345678902",
//     dataNascimento: "2010-06-22",
//     responsavel: "José Santos",
//     telefone: "81988888888",
//   },
// ];

// // Base de dados simulada do CadÚnico
// const cadUnico = [
//   {
//     nis: "12345678901",
//     ativo: true,
//     dataAtualizacao: "2024-01-15",
//   },
//   {
//     nis: "12345678902",
//     ativo: true,
//     dataAtualizacao: "2023-02-20",
//   },
// ];

const cadUnico = db.select("cadUnico");

/**
 * Verifica a elegibilidade do estudante para o Passe Livre
 * @param {Object} estudante - Dados do estudante
 * @returns {Object} Resultado da verificação
 */
function verificarElegibilidade(estudante) {
  // Busca dados do CadÚnico
  const cadastroUnico = db
    .select("cadUnico")
    .find((c) => c.nis === estudante.nis);

  // Verifica existência no CadÚnico
  if (!cadastroUnico) {
    return {
      elegivel: false,
      motivo: "Estudante não encontrado no CadÚnico",
      codigoMotivo: "CAD_NAO_ENCONTRADO",
    };
  }

  // Verifica se cadastro está ativo
  if (!cadastroUnico.ativo) {
    return {
      elegivel: false,
      motivo: "Cadastro no CadÚnico não está ativo",
      codigoMotivo: "CAD_INATIVO",
    };
  }

  // Verifica data de atualização do CadÚnico
  const dataAtualizacao = new Date(cadastroUnico.dataAtualizacao);
  const doisAnosAtras = new Date();
  doisAnosAtras.setFullYear(doisAnosAtras.getFullYear() - 2);

  if (dataAtualizacao < doisAnosAtras) {
    return {
      elegivel: false,
      motivo: "Cadastro no CadÚnico desatualizado (mais de 2 anos)",
      codigoMotivo: "CAD_DESATUALIZADO",
    };
  }

  // // Verifica renda per capita
  // if (cadastroUnico.rendaPerCapita > 500) {
  //   return {
  //     elegivel: false,
  //     motivo: "Renda per capita acima do limite permitido",
  //     codigoMotivo: "RENDA_EXCEDIDA",
  //   };
  // }

  // Verifica série escolar
  const seriesPermitidas = ["6º ano", "7º ano", "8º ano", "9º ano"];
  if (!seriesPermitidas.includes(estudante.serie)) {
    return {
      elegivel: false,
      motivo: "Série escolar não elegível para o programa",
      codigoMotivo: "SERIE_INVALIDA",
    };
  }

  return {
    elegivel: true,
    motivo:
      "Estudante atende todos os critérios. <a href='https://wa.me/5581985461063?text=Parab%C3%A9ns!%20Verificamos%20que%20a%20sua%20matr%C3%ADcula%20no%20Embarque%20Digital%20foi%20efetivada%20com%20sucesso.%20Uhuuul!%20%0A%0AAgora%20voc%C3%AA%20tem%20acesso%20ao%20benef%C3%ADcio%20do%20Passe%20Livre%20para%20utilizar%20o%20transporte%20p%C3%BAblico%20na%20Regi%C3%A3o%20Metropolitana%20do%20Recife.%0A%0AVoc%C3%AA%20possui%20interesse%20em%20ativar%20esse%20benef%C3%ADcio%3F%0A%0AResponda%20com%20%22Sim%22%20ou%20%22N%C3%A3o%22.'>Notificar o estudante via WhatsApp.</a>",
    codigoMotivo: "ELEGIVEL",
  };
}

// Rota para cadastrar novo estudante
app.post("/cadastrar-estudante", (req, res) => {
  try {
    const estudantes = db.select("estudantes");
    const novoEstudante = {
      id: estudantes.length + 1,
      ...req.body,
    };

    db.insert("estudantes", novoEstudante);

    const resultado = verificarElegibilidade(novoEstudante);

    res.status(201).json({
      mensagem: "Estudante cadastrado com sucesso",
      estudante: novoEstudante,
      elegibilidade: resultado,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao cadastrar estudante",
      detalhes: error.message,
    });
  }
});

// Rota para listar todos os estudantes
app.get("/estudantes", (req, res) => {
  try {
    const estudantes = db.select("estudantes");
    res.json({
      estudantes,
      total: estudantes.length,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar estudantes",
      detalhes: error.message,
    });
  }
});

// Rota para listar todos os usuários do CadÚnico
app.get("/cadunico", (req, res) => {
  try {
    res.json({
      cadUnico: cadUnico,
      total: cadUnico.length,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar CadÚnico",
      detalhes: error.message,
    });
  }
});

// Rota para processar automaticamente as solicitações
app.get("/processar-solicitacoes", async (req, res) => {
  try {
    const resultados = db.select("estudantes").map((estudante) => {
      const resultado = verificarElegibilidade(estudante);
      return {
        estudante: {
          nome: estudante.nome,
          serie: estudante.serie,
          escola: estudante.escola,
          nis: estudante.nis,
        },
        ...resultado,
        dataProcessamento: new Date().toISOString(),
      };
    });

    const elegiveisCount = resultados.filter((r) => r.elegivel).length;
    const naoElegiveisCount = resultados.length - elegiveisCount;

    res.json({
      data_processamento: new Date().toISOString(),
      total_processado: resultados.length,
      total_elegiveis: elegiveisCount,
      total_nao_elegiveis: naoElegiveisCount,
      resultados,
    });
  } catch (error) {
    console.error("Erro no processamento:", error);
    res.status(500).json({
      erro: "Erro ao processar solicitações",
      detalhes: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Rota para verificar o status de um estudante específico
app.get("/verificar-estudante/:nis", (req, res) => {
  const { nis } = req.params;
  const estudante = db.select("estudantes").find((e) => e.nis === nis);

  if (!estudante) {
    return res.status(404).json({
      erro: "Estudante não encontrado",
      timestamp: new Date().toISOString(),
    });
  }

  const resultado = verificarElegibilidade(estudante);
  res.json({
    estudante: {
      nome: estudante.nome,
      serie: estudante.serie,
      escola: estudante.escola,
      nis: estudante.nis,
    },
    ...resultado,
    dataVerificacao: new Date().toISOString(),
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log("Sistema de Automação do Passe Livre iniciado");
});
