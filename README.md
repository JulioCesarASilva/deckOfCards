# Baralho ♠

Uma mesa de cartas virtual em português, feita com React e TypeScript. Digite seu nome, receba cinco cartas e explore sua mão em uma interface inspirada nas cores de uma mesa de baralho.

## Funcionalidades

- Criar uma mesa com cinco cartas aleatórias.
- Comprar uma carta por vez, até nove cartas na mão.
- Embaralhar a ordem das cartas da mão.
- Retomar a última mesa neste navegador, com o histórico salvo em `localStorage`.
- Consultar o número de cartas restantes no baralho.
- Usar o layout em celulares e computadores, com navegação por teclado, mensagens de erro e estados de carregamento.

O aplicativo é um explorador de cartas: não possui regras de pontuação, adversários ou partidas multiplayer.

## Executar localmente

Você precisa de Node.js e npm instalados.

```sh
npm install
npm start
```

Abra [http://localhost:3000](http://localhost:3000). A página recarrega ao editar os arquivos.

```sh
# Gerar a versão de produção na pasta build/
npm run build

# Executar os testes sem modo interativo
npm test -- --watchAll=false
```

## Tecnologias e estrutura

React 18, TypeScript, React Router 6 e Sass, com Create React App.

```text
src/
  components/   Cabeçalho, carta e acesso à última mesa
  pages/        Página inicial e mesa de cartas
  typings/      Tipos dos dados da API e do armazenamento
  util/         Cliente HTTP e persistência local
  global.scss   Estilos globais e layout responsivo
  Router.tsx    Rotas da aplicação
```

## Integração e persistência

As cartas são fornecidas pela [Deck of Cards API](https://deckofcardsapi.com/), acessada via HTTPS. É necessário ter conexão com a internet e a API estar disponível para criar mesas e movimentar cartas. As fontes usam Google Fonts, com fontes locais alternativas quando o serviço não estiver disponível.

O nome e o identificador da mesa ficam na URL; o nome também identifica a pilha de cartas na API externa. Use um apelido e evite informações sensíveis. O navegador salva apenas a última mesa, seu nome e a data de criação; as cartas permanecem na API. Mesas antigas podem deixar de estar disponíveis.

Ao publicar, configure o servidor para encaminhar as rotas da aplicação a `index.html`, permitindo abrir diretamente o endereço de uma mesa.

## Melhorias recentes

- Novo visual com fundo verde, detalhes dourados e ilustração de cartas em CSS.
- Layout responsivo, formulários com rótulos e controles acessíveis.
- Correção das consultas contínuas à API na tela de cartas.
- Cliente HTTP centralizado, validação das respostas e codificação dos parâmetros da URL.
- Bloqueio de ações durante carregamento e tratamento de falhas de rede.
- Leitura segura do histórico, inclusive quando o armazenamento está indisponível ou inválido.
