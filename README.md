<h1>Sistema de Automação do Passe Livre Estudantil PCR - Demonstração de um Sistema de Matrícula de Aluno</h1>

1. Visão Geral

O código exemplifica um sistema de matrícula escolar que, ao concluir o cadastro de um aluno, utiliza um chatbot integrado ao WhatsApp para notificar o sucesso da matrícula e informar sobre a elegibilidade ao benefício do Passe Livre. Essa abordagem automatiza a comunicação, garantindo que os responsáveis sejam imediatamente informados sobre o status da matrícula e dos benefícios disponíveis, melhorando a eficiência e a satisfação dos usuários.

A Solução Passe Livre a Zero Clique tem como objetivo automatizar a solicitação e renovação do Passe Livre para estudantes da rede municipal de Recife, dentro do conceito do Recife Zero Clique.

Fluxo de Funcionamento

Validação da Elegibilidade: A integração verifica automaticamente os dados da matrícula escolar do estudante.

Confirmação via WhatsApp: O estudante recebe uma mensagem via chatbot perguntando se deseja solicitar o benefício.

Envio Automático: Se o estudante confirmar o interesse, a solicitação é enviada automaticamente ao sistema do Grande Recife Consórcio de Transporte.

Notificação Final: O sistema informa ao estudante a previsão de retirada do Passe Livre.

2. Tecnologias Utilizadas

Backend

Node.js + Express.js: Para desenvolvimento da API RESTful responsável pela comunicação entre os sistemas.

MongoDB: Para armazenamento de registros de interações, logs e status das solicitações.

Integração e Mensageria

WhatsApp API (Twilio, Zenvia ou Meta Cloud API): Para envio automatizado de mensagens aos estudantes.

Grande Recife Consórcio de Transporte API: Para envio das solicitações do Passe Livre.

Segurança e Autenticação

JWT (JSON Web Token): Para autenticação segura entre os sistemas.

HTTPS + API Keys: Para comunicação segura entre os serviços.

Hospedagem e Infraestrutura

AWS (EC2, Lambda, API Gateway) ou DigitalOcean: Para hospedagem da API.

Docker: Para conteinerização e deploy eficiente.

3. Arquitetura do Sistema

Fluxo da Integração

Recebimento de Matrícula → API da Rede Municipal de Recife.

Consulta de Elegibilidade → Banco de dados interno (MongoDB).

Envio de Mensagem de Confirmação → API do WhatsApp.

Resposta do Estudante → Tratamento pelo Backend (Node.js).

Solicitação Enviada → API do Grande Recife Consórcio de Transporte.

Notificação Final → Envio da mensagem com previsão de retirada.

4. Benefícios da Solução

✅ Redução de Burocracia: Sem necessidade de ação manual por parte do cidadão.
✅ Agilidade: Processo automatizado e em tempo real.
✅ Maior Aderência ao Passe Livre: Facilidade no acesso ao benefício.
✅ Segurança e Confiabilidade: Garantia de comunicação segura entre os sistemas.

5. Conclusão

O sistema proporciona uma experiência 100% automatizada, garantindo a integração eficiente entre os sistemas da Rede Municipal de Ensino do Recife e o Grande Recife Consórcio de Transporte, alinhado ao conceito de Recife Zero Clique e à modernização dos serviços públicos.
