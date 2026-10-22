import express from 'express';
import { criarPool } from './config/database.js';
import { criarShowModelo } from './modelos/showModelo.js';
import { criarIngressoModelo } from './modelos/ingressoModelo.js';
import { criarUsuarioModelo } from './modelos/usuarioModelo.js';
import { criarSessaoModelo } from './modelos/sessaoModelo.js';
import { criarShowServico } from './servicos/showServico.js';
import { criarIngressoServico } from './servicos/ingressoServico.js';
import { criarAutenticacaoServico } from './servicos/autenticacaoServico.js';
import { criarShowControlador } from './controladores/showControlador.js';
import { criarIngressoControlador } from './controladores/ingressoControlador.js';
import { criarAutenticacaoControlador } from './controladores/autenticacaoControlador.js';
import { criarExigirLogin } from './intermediarios/exigirLogin.js';
import { criarShowRotas } from './rotas/showRotas.js';
import { criarIngressoRotas } from './rotas/ingressoRotas.js';
import { criarAutenticacaoRotas } from './rotas/autenticacaoRotas.js';

export const app = express();

app.use(express.json());

export const pool = criarPool();

const showModelo = criarShowModelo({ pool });
const ingressoModelo = criarIngressoModelo({ pool });
const usuarioModelo = criarUsuarioModelo({ pool });
const sessaoModelo = criarSessaoModelo();

const showServico = criarShowServico({ showModelo });
const ingressoServico = criarIngressoServico({ showModelo, ingressoModelo });
const autenticacaoServico = criarAutenticacaoServico({ usuarioModelo, sessaoModelo });

const showControlador = criarShowControlador({ showServico });
const ingressoControlador = criarIngressoControlador({ ingressoServico });
const autenticacaoControlador = criarAutenticacaoControlador({ autenticacaoServico });

const exigirLogin = criarExigirLogin({ autenticacaoServico });

app.get('/api/check', (req, res) => {
    res.status(200).json({ status: 'ok', mensagem: 'Servidor funcionando!' });
});

app.use('/api/auth', criarAutenticacaoRotas({ autenticacaoControlador, exigirLogin }));
app.use('/api/shows', criarShowRotas({ showControlador }));
app.use('/api/ingressos', criarIngressoRotas({ ingressoControlador, exigirLogin }));

app.use((req, res) => {
    res.status(404).json({ erro: `A rota ${req.method} ${req.originalUrl} não existe` });
});

app.use((erro, req, res, _next) => {
    console.error('Erro de sistema: ', erro.message);
    res.status(500).json({ erro: 'Falha interna do servidor' });
});
