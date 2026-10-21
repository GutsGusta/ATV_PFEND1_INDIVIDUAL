# Star Ticket

Site para comprar ingressos de shows de música pop. Só usuários cadastrados podem comprar, e cada um vê seus ingressos na página Meus ingressos.

## Banco de dados (MySQL + DBeaver)

Configuração usada pelo backend (arquivo backend/dados/conexao.js):

- Banco: db_starticket
- Usuário: adm
- Senha: 123
- Host: localhost, porta 3306 (padrão do MySQL)

Passos:

1. No DBeaver, crie a conexão MySQL com os dados acima (ou rode sql/00_criar_banco.sql como "root" para criar o banco e o usuário).
2. Conectado em db_starticket, execute sql/01_criar_tabelas.sql e depois sql/02_inserir_shows.sql.

Tabelas: usuarios, shows, ingressos e sessoes (uma para cada modelo do backend).

## Imagens dos shows

1. Copie a imagem para frontend/public/imagens/shows/
2. No DBeaver: UPDATE shows SET imagem = 'nome-do-arquivo.jpg' WHERE id = 1;

Também funciona com uma URL completa (https://...). Sem imagem, o show usa só a cor do "tom".

## Como rodar

Abra dois terminais (com o MySQL ligado).

Backend (porta 3001):

    cd backend
    npm install
    npm start

Frontend (porta 3000):

    cd frontend
    npm install
    npm run dev

Depois abra http://localhost:3000

## Estrutura

- backend: API com Express, em camadas (rotas, controladores, servicos, modelos). Os modelos acessam o MySQL pela conexão em backend/dados/conexao.js.
- sql: scripts para criar e popular o banco.
- frontend: Next.js. Páginas em src/app, componentes em src/components.

## Páginas

- / : início
- /shows : lista de shows
- /shows/:id : detalhes e compra
- /cadastro e /login : acesso
- /painel : meus ingressos
