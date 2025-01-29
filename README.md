# NPS Formulário
## Em desenvolvimento 

- ### Rotas:
    - #### /testebanco (Visualizar formulário)
    - #### /form (Painel de criação de formulário)
    - Conectados com o Banco de Dados

- ### Questionário armazenado em json

    - ### Tipos de dados:
        - type: "text" (Pergunta em texto)
        - type: "radio" (Pergunta de marcações)
    - ### Exemplo:
    ```json
    {
        "id": 1,
        "label" "Exemplo de pergunta de texto",
        "type": "text",
        "placeholder": "Descreva aqui..."
        "options": [],
    },
    {
        "id": 2,
        "label" "Exemplo de pergunta em caixas",
        "type": "radio",
        "placeholder": ""
        "options": ["opção 1", "opção 2", "opção 3"],
    }
    ```

- ## Futuras Features:
    - ### Opção de excluir e editar perguntas salvas
    - ### Barra de progresso do formulário
    - ### Melhora de segurança
    - ### Melhora de respostas
    - ### Estilização profissional
