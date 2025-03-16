<h1>Sistema de Automação do Passe Livre Estudantil PCR</h1>

1. **Visão Geral**

A Solução Passe Livre a Zero Clique tem como objetivo automatizar a solicitação do Passe Livre para estudantes de Recife que participam do programa Embarque Digital.

O sistema exemplifica um processo de matrícula institucional automatizado. Após a conclusão da matrícula de um aluno, o sistema realiza uma verificação para confirmar sua adesão ao programa Embarque Digital. Se o aluno for elegível, um chatbot integrado ao WhatsApp notifica o sucesso da matrícula e informa sobre a possibilidade de ativação do benefício do Passe Livre. O chatbot pergunta se o aluno tem interesse em ativar o benefício. Caso o aluno responda "Sim", uma solicitação é automaticamente enviada ao Grande Recife Consórcio de Transporte para a emissão do Passe Livre. Por fim, o sistema envia uma mensagem final ao aluno, informando a previsão de recebimento do cartão.

Essa abordagem automatiza todo o processo de comunicação, garantindo que os responsáveis sejam prontamente informados sobre o status da matrícula e a disponibilidade dos benefícios, aumentando a eficiência e a satisfação dos estudantes.

## Fluxo de Funcionamento

**Validação da Elegibilidade**: A integração verifica automaticamente os dados da matrícula do estudante, a fim de confirmar se ele faz parte do programa Embarque Digital.

**Confirmação via WhatsApp**: O estudante recebe uma mensagem via chatbot perguntando se deseja solicitar o benefício.

**Envio Automático**: Se o estudante confirmar o interesse, a solicitação é enviada automaticamente ao sistema do Grande Recife Consórcio de Transporte.

**Notificação Final**: O sistema informa ao estudante a previsão de retirada do Passe Livre.

2. **Tecnologias Utilizadas**

**Frontend**

HTML + CSS + JavaScript: Para desenvolver a interface.

**Backend**

Node.js + Express.js: Para desenvolvimento da API RESTful responsável pela comunicação entre os sistemas.

**Envio de mensagem**

WhatsApp API (Zap Convertte): Para envio automatizado de mensagens aos estudantes.

4. **Benefícios da Solução**

✅ Redução de Burocracia: Sem necessidade de ação manual por parte do estudante.<br />
✅ Agilidade: Processo automatizado e em tempo real.<br />
✅ Maior Aderência ao Passe Livre: Facilidade no acesso ao benefício.<br />
✅ Segurança e Confiabilidade: Garantia de comunicação segura entre os sistemas.

5. **Conclusão**

O sistema proporciona uma experiência 100% automatizada, garantindo a integração eficiente entre os sistemas, alinhando-se ao conceito de Recife Zero Clique e à modernização dos serviços públicos.

## Como Rodar o Projeto

Para executar o projeto localmente após baixá-lo, siga os passos abaixo:

1. **Clone o repositório**:

```sh
git clone https://github.com/dvdmarveira/cliquezero-passelivre.git
```

2. **Acesse a pasta do projeto**:

```sh
cd cliquezero-passelivre-main
```

3. **Instale as dependências**:

```sh
npm install
```

4. **Configure as variáveis de ambiente** (se necessário, crie um arquivo .env).

5. **Execute o projeto**:

- Para rodar normalmente:

```sh
npm start
```

- Para rodar em ambiente de desenvolvimento (caso use nodemon):

```sh
npm run dev
```

6. **Verifique se o servidor está rodando**:
   O terminal deve exibir uma mensagem indicando que o servidor está ativo, geralmente com um link como `http://localhost:3000`.

Se houver erros, verifique as dependências e a versão do Node.js (`node -v`) e do npm (`npm -v`).
