const express = require('express');

const crypto = require('crypto');

const routes = express.Router();

const multer = require('multer')

const multerConfig = require('./config/multer');

var knex = require('knex')({
    client: 'pg',
    connection: {
      host : '200.19.1.18',
      user : 'aluno4m02',
      password : '852147',
      database : 'BD4AnoManha',
    }
  });

// Rotas REST
// Pessoas
routes.post('/pessoa', (req, res, next) => {
    knex('ALUNO4M02.tb_pessoa')
    .insert({nome: req.body.nome,sobrenome:req.body.sobrenome, senha:crypto.createHash('MD5').update(req.body.senha).digest('hex'), email:req.body.email })
    .then((dados) =>{
    res.send("Inserido com sucesso");
  }, next);
  });
  
  routes.get('/pessoas', (req, res, next) => {
    knex('ALUNO4M02.tb_pessoa')
    .select('*',knex.raw('array(select f.id_portfolio from "ALUNO4M02".tb_portfolio f where f.id_aluno = id_pessoa) as portfolios'))
    .orderBy('id_pessoa')
    .then((dados) => {
    res.send(dados);
  }, next);
  });
  
  routes.get('/pessoas/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_pessoa')
    .select('*',knex.raw('array(select f.id_portfolio from "ALUNO4M02".tb_portfolio f where f.id_aluno = id_pessoa) as portfolios'))
    .where('email', id)
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });
  
  routes.put('/pessoas/update/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_pessoa')
    .where('id_pessoa', id)
    .update(req.body).then((dados) => {
      if(!dados) return res.send('Nada foi encontrado');
      res.send('dados atualizados');
  }, next);
  });
  
  routes.delete('/pessoas/delete/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_pessoa')
    .where('id_pessoa', id)
    .delete()
    .then((dados) => {
      if(!dados) return res.send ('Nada foi encontrado');
      res.send('dados excluidos');
  }, next);
  });
  //Fim Pessoas
  
  // Portfolio
  
 routes.post('/portfolio', (req, res, next) => {
    knex('ALUNO4M02.tb_portfolio')
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
  }, next);
  });
  
  routes.get('/portfolios', (req, res, next) => {
    knex('ALUNO4M02.tb_portfolio')
    .then((dados) => {
      res.send(dados);
  }, next);
  });
  
  routes.get('/portfolios/:id1/:id2', (req, res, next) => {
    const {id1, id2} = req.params;
    knex('ALUNO4M02.tb_portfolio')
    .where({cod_turma:id1, id_aluno:id2})
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });
  
  routes.put('/portfolio/update/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_portfolio')
    .where('id_portfolio', id)
    .update(req.body)
    .then((dados) => {
      if(!dados) return res.send('Nada foi encontrado');
      res.send('dados atualizados');
  }, next);
  });
  
  routes.delete('/portfolio/delete/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_portfolio')
    .where('id_portfolio', id)
    .delete(req.doby).then((dados) => {
      if(!dados) return res.send ('Nada foi encontrado');
      res.send('dados excluidos');
  }, next);
  });
  
  //Fim portfolio
  
  // Arquivo
    routes.post('/portfolio/:id_portfolio/files', multer(multerConfig).single('file'),(req, res, next) => {
    knex('ALUNO4M02.tb_arquivo')
    .insert({
      id_portfolio: req.params.id_portfolio,
      caminho: req.file.key,
      nome: req.file.originalname,})
    .then((dados) =>{
      res.send("Inserido com sucesso");
  }, next);
  });
  
  routes.get('/arquivo', (req, res, next) => {
    knex('ALUNO4M02.tb_arquivo')
    .then((dados) => {
      res.send(dados);
  }, next);
  });
  
  routes.get('/arquivos/:id', (req, res, next) => {
    const {id} = req.params;
    knex('ALUNO4M02.tb_arquivo')
    .where('id_arquivo',id)
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });
  
  routes.put('/arquivos/update/:id', multer(multerConfig).single('file'),(req, res, next) =>{
    const { id } = req.params;
    knex('ALUNO4M02.tb_arquivo')
    .where('id_arquivo', id)
    .update({
      caminho: req.file.key,
      nome: req.file.originalname,})
    .then((dados) => {
      if(!dados) return res.send('Nada foi encontrado');
      res.send('dados atualizados');
  }, next);
  });
  
  routes.delete('/arquivos/delete/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_arquivo')
    .where('id_arquivo', id)
    .delete(req.doby)
    .then((dados) => {
      if(!dados) return res.send ('Nada foi encontrado');
      res.send('dados excluidos');
  }, next);
  });
  //Fim Arquvio
  
  //Turma
  routes.post('/turma', (req, res, next) => {
    knex('ALUNO4M02.tb_turma')
    .insert({cod_turma: crypto.randomBytes(3).toString('hex'),
        id_professor:req.body.id_professor,
        id_diciplina:req.body.id_diciplina,
        nome_turma:req.body.nome_turma})
    .then((dados) =>{
      res.send("Inserido com sucesso");
  }, next);
  });
  
  routes.get('/turmas', (req, res, next) => {
    knex('ALUNO4M02.tb_turma')
    .then((dados) => {
      res.send(dados);
  }, next);
  });
  
  routes.get('/turmas/:id', (req, res, next) => {
    const {id} = req.params;
    knex('ALUNO4M02.tb_turma')
    .where('cod_turma',id)
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });
  
  routes.put('/turmas/update/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_turma')
    .where('cod_turma', id)
    .update(req.body)
    .then((dados) => {
      if(!dados) return res.send('Nada foi encontrado');
      res.send('dados atualizados');
  }, next);
  });
  
  routes.delete('/turmas/delete/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_turma')
    .where('cod_turma', id)
    .delete(req.doby)
    .then((dados) => {
      if(!dados) return res.send ('Nada foi encontrado');
      res.send('dados excluidos');
  }, next);
  });
  //Fim turma
  
  //Diciplina
  routes.post('/diciplina', (req, res, next) => {
    knex('ALUNO4M02.tb_diciplina')
    .insert(req.body)
    .then((dados) =>{
      res.send("Inserido com sucesso");
  }, next);
  });
  
  routes.get('/diciplinas', (req, res, next) => {
    knex('ALUNO4M02.tb_diciplina')
    .then((dados) => {
      res.send(dados);
  }, next);
  });
  
  routes.get('/diciplinas/:id', (req, res, next) => {
    const {id} = req.params;
    knex('ALUNO4M02.tb_diciplina')
    .where('id_diciplina',id)
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });
  
  routes.put('/diciplinas/update/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_diciplina')
    .where('id_diciplina', id)
    .update(req.body)
    .then((dados) => {
      if(!dados) return res.send('Nada foi encontrado');
      res.send('dados atualizados');
  }, next);
  });
  
  routes.delete('/diciplinas/delete/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_diciplina')
    .where('id_diciplina', id)
    .delete(req.doby)
    .then((dados) => {
      if(!dados) return res.send ('Nada foi encontrado');
      res.send('dados excluidos');
  }, next);
  });
  //Fim Diciplina
  
  // Tarefa
  
  routes.post('/tarefa/:cod_turma', (req, res, next) => {
    knex('ALUNO4M02.tb_tarefa')
    .insert({
      peso_nota: req.body.peso_nota,
      dificuldade: req.body.dificuldade,
      descricao: req.body.descricao,
      nome_tarefa: req.body.nome_tarefa
    }).returning('id_tarefa')
    .then((dados) =>{
      
      //adicionando tarefa à turma correspondente
      knex('ALUNO4M02.tb_tarefa_turma')
      .insert({
        cod_turma: req.params.cod_turma,
        id_tarefa: dados[0],
        data_entrega: req.body.data_entrega
      })
      .then((dados) =>{
      });
      //fim
      //adicionar aviso de tarefa adicionada
      

      res.send('tarefa adicionada');      
  }, next);
  });
  
  routes.get('/tarefas', (req, res, next) => {
    knex('ALUNO4M02.tb_tarefa')
    .then((dados) => {
      res.send(dados);
  }, next);
  });
  
  routes.get('/tarefas/:id', (req, res, next) => {
    const {id} = req.params;
    knex('ALUNO4M02.tb_tarefa')
    .where('id_tarefa',id)
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });
  
  routes.put('/tarefas/update/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_tarefa')
    .where('id_tarefa', id)
    .update(req.body)
    .then((dados) => {
      if(!dados) return res.send('Nada foi encontrado');
      res.send('dados atualizados');
  }, next);
  });
  
  routes.delete('/tarefas/delete/:id', (req, res, next) => {
    const { id } = req.params;
    knex('ALUNO4M02.tb_tarefa')
    .where('id_tarefa', id)
    .delete(req.doby)
    .then((dados) => {
      if(!dados) return res.send ('Nada foi encontrado');
      res.send('dados excluidos');
  }, next);
  });

  //pegar Tarefas do Aluno
  routes.get('/pegar_tarefas/:id', (req, res, next) => {
    const { id } = req.params;
    knex.raw(`select t.cod_turma, t.id_professor, t.id_diciplina, tft.data_entrega, tft.data_inicio, tf.* from "ALUNO4M02".tb_turma t inner join "ALUNO4M02".tb_turma_aluno ta on ta.cod_turma = t.cod_turma inner join "ALUNO4M02".tb_tarefa_turma tft on ta.cod_turma = tft.cod_turma inner join "ALUNO4M02".tb_tarefa tf on tf.id_tarefa = tft.id_tarefa where ta.id_aluno = ${id}`)
    .then((dados) => {
      res.send(dados.rows);
  }, next);
  });
  
  //Fim Tarefa
  
  // Tarefa_Turma
  
  routes.get('/tarefas_turma', (req, res, next) => {
    knex('ALUNO4M02.tb_tarefa_turma')
    .then((dados) => {
      res.send(dados);
  }, next);
  });
  
  routes.get('/tarefas_turma/:id1', (req, res, next) => {
    const { id1 } = req.params;
    knex('ALUNO4M02.tb_tarefa_turma')
    .where({id_tarefa:id1})
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });

  routes.get('/tarefas_turmas/:id1', (req, res, next) => {
    const { id1 } = req.params;
    knex('ALUNO4M02.tb_tarefa_turma')
    .where({cod_turma:id1})
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });
  
  routes.put('/tarefas_turma/update/:id1/:id2', (req, res, next) => {
    const {id1, id2} = req.params;
    knex('ALUNO4M02.tb_tarefa_turma')
    .where({id_tarefa:id1,cod_turma:id2})
    .update(req.body)
    .then((dados) => {
      if(!dados) return res.send('Nada foi encontrado');
      res.send('dados atualizados');
  }, next);
  });
  
  routes.delete('/tarefas_turma/delete/:id1/:id2', (req, res, next) => {
    const {id1, id2} = req.params;
    knex('ALUNO4M02.tb_tarefa_turma')
    .where({id_tarefa:id1,cod_turma:id2})
    .delete(req.doby).then((dados) => {
      if(!dados) return res.send ('Nada foi encontrado');
      res.send('dados excluidos');
  }, next);
  });
  //Fim Tarefa_Turma
  
  // Turma_Aluno
  routes.post('/turma_aluno', (req, res, next) => {
    knex('ALUNO4M02.tb_turma_aluno')
    .insert(req.body).then((dados) =>{
      res.send("Inserido com sucesso");
  }, next);
  });
  
  routes.get('/turmas_aluno', (req, res, next) => {
    knex('ALUNO4M02.tb_turma_aluno')
    .then((dados) => {
      res.send(dados);
  }, next);
  });
  
  routes.get('/turmas_aluno/:id1', (req, res, next) => {
    const {id1} = req.params;
    knex('ALUNO4M02.tb_turma_aluno')
    .where({id_aluno:id1})
    .then((dados) => {
      if(!dados) return res.send(("Nada foi encontrado"));
      res.send(dados);
  }, next);
  });
  
  routes.put('/turmas_aluno/update/:id1/id2', (req, res, next) => {
    const {id1,id2} = req.params;
    knex('ALUNO4M02.tb_turma_aluno')
    .where({id_aluno:id1,cod_turma:id2})
    .update(req.body)
    .then((dados) => {
      if(!dados) return res.send('Nada foi encontrado');
      res.send('dados atualizados');
  }, next);
  });
  
  routes.delete('/turmas_aluno/delete/:id1/:id2', (req, res, next) => {
    const {id1,id2} = req.params;
    knex('ALUNO4M02.tb_turma_aluno')
    .where({id_aluno:id1,cod_turma:id2})
    .delete()
    .then((dados) => {
      if(!dados) return res.send ('Nada foi encontrado');
      res.send('dados excluidos');
  }, next);
  });
  //Fim Turma_Aluno

  module.exports = routes;