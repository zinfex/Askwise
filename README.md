# Askwise

Este projeto implementa um **sistema de criação e exibição de formulários** (ou pesquisas) em **React**, utilizando **IndexedDB** para armazenamento local dos dados. A escolha do IndexedDB permite salvar quantidades maiores de informação, manter dados offline e evitar a perda quando a página é atualizada.

---

## Índice

1. [Visão Geral](#visão-geral)  
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)  
3. [Como Funciona](#como-funciona)  
4. [Como Executar o Projeto](#como-executar-o-projeto)  
5. [Estrutura do Código](#estrutura-do-código)  
6. [Exemplo de Fluxo](#exemplo-de-fluxo)  
7. [Personalizações Possíveis](#personalizações-possíveis)  

---

## Visão Geral

Este projeto oferece:

- **Criação de pesquisas** – O usuário pode criar perguntas, definir o tipo de resposta (curta, longa, múltipla escolha, etc.) e salvar no banco local.  
- **Armazenamento no IndexedDB** – Usamos a API interna do navegador (facilitada por uma biblioteca Dexie, idb, localforage ou outra) para salvar todas as pesquisas e suas perguntas.  
- **Visualização de pesquisas** – Ao navegar para `/form/:id`, o projeto carrega a pesquisa correspondente diretamente do IndexedDB e exibe as perguntas.  
- **Edição e Gerenciamento** – Possibilidade de editar perguntas, remover ou adicionar opções, e persistir as mudanças.

---

## Tecnologias Utilizadas

- **React** – Biblioteca principal para construção de interfaces.  
- **IndexedDB** – Banco de dados local do navegador para armazenamento offline (sem depender de um backend remoto).  
- **Biblioteca Dexie / idb / localforage (exemplo)** – Facilita o uso da API nativa do IndexedDB (mais verbosa).  
- **React Router** – Gerenciamento de rotas (ex.: `/create`, `/form/:id`).  
- **Bootstrap / React-Bootstrap** – (Opcional) Estilização de componentes e layout.

---

## Como Funciona

1. **Criação**  
   - O usuário acessa a rota `/create` e monta uma nova pesquisa, informando o título, descrição e perguntas.  
   - Ao clicar em “Salvar” ou “Publicar”, um objeto contendo todas as informações do formulário é gerado.  
   - Esse objeto é inserido no **IndexedDB** (via Dexie, por exemplo), numa tabela (por exemplo, `pesquisas`).  

2. **Busca / Exibição**  
   - Em outra rota, como `/form/:hash_id`, buscamos a pesquisa no IndexedDB consultando pelo `hash_id`.  
   - Caso encontrada, exibimos todas as perguntas e opções de resposta.  
   - Se não houver pesquisa com aquele `hash_id`, mostramos um aviso (“Pesquisa não encontrada”).

3. **Persistência Local**  
   - Tudo fica salvo localmente no navegador do usuário.  
   - Se ele recarregar a página ou voltar mais tarde, as pesquisas ainda estarão lá.  
   - Não há sincronização com um servidor remoto a menos que essa funcionalidade seja adicionada.

---

## Como Executar o Projeto

1. **Clonar** o repositório:
   ```bash
   git clone https://github.com/zinfex/simple-forms.git
   cd simple-forms
2. **Instalar** dependências:
   ```bash
   npm i
3. **Rodar** projeto:
   ```bash
   npm run dev
