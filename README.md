# Star Ticket

Site para comprar ingressos de shows de música pop. Só usuários cadastrados podem comprar, e cada um vê seus ingressos na página Meus ingressos.

## Banco de dados (MySQL pelo XAMPP, visto no DBeaver)

1. Inicie o MySQL no XAMPP.
2. No DBeaver, conecte como root (porta 3306, senha vazia) e execute os scripts da pasta sql, nesta ordem:
   - 00_banco_e_usuario.sql: cria o banco db_starticket e o usuário adm (senha 123). Pule se já criou.
   - 01_tabelas.sql: cria as tabelas usuarios, shows e pedidos.
   - 02_shows.sql: cadastra os shows de exemplo.
   - 03_imagens.sql: opcional, só depois de colocar as imagens em frontend/public/imagens/shows.
3. Os dados de conexão ficam em backend/.env.

No DBeaver, para rodar um script inteiro use Alt + X.

## Como rodar

Abra dois terminais.

Backend (porta 3001):

    cd backend
    npm install
    npm start

Frontend (porta 3000):

    cd frontend
    npm install
    npm run dev

Depois abra http://localhost:3000

## Imagens dos shows

1. Coloque a imagem em frontend/public/imagens/shows (por exemplo luna-vega.jpg).
2. No DBeaver, rode: UPDATE shows SET imagem = '/imagens/shows/luna-vega.jpg' WHERE id = 1;
3. Recarregue a página. Shows sem imagem continuam com o fundo colorido.

## Estrutura

- sql: scripts do banco de dados.
- backend: API com Express, em camadas (rotas, controladores, servicos, modelos).
- frontend: Next.js. Páginas em src/app, componentes em src/components.

## Páginas

- / : início
- /shows : lista de shows
- /shows/:id : detalhes e compra
- /cadastro e /login : acesso
- /painel : meus ingressos
