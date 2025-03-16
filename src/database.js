import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  constructor() {
    this.database = {
      estudantes: [], // Inicialmente vazio, estudantes serão cadastrados pelo usuário
    };
    this.cadUnico = [
      {
        nis: "12345678901",
        ativo: true,
        dataAtualizacao: "2024-01-15",
      },
      {
        nis: "12345678902",
        ativo: true,
        dataAtualizacao: "2023-02-20",
      },
    ];

    this.loadDatabase();
  }

  // Carregar os dados do arquivo ou criar um arquivo vazio
  async loadDatabase() {
    try {
      const data = await fs.readFile(databasePath, "utf-8");
      this.database = JSON.parse(data); // Carrega apenas os dados de "estudantes"
    } catch (error) {
      console.error("Erro ao carregar dados do banco de dados:", error);
      // Caso o arquivo não exista ou erro na leitura, cria um arquivo vazio
      await this.#persist();
    }
  }

  // Persistir os dados no arquivo
  async #persist() {
    try {
      const dataToPersist = { estudantes: this.database.estudantes }; // Apenas os estudantes
      await fs.writeFile(databasePath, JSON.stringify(dataToPersist, null, 2));
    } catch (error) {
      console.error("Erro ao salvar dados no arquivo:", error);
    }
  }

  select(table) {
    if (table === "cadUnico") {
      return this.cadUnico;
    }
    return this.database[table] ?? [];
  }

  insert(table, data) {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data);
    } else {
      this.database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
