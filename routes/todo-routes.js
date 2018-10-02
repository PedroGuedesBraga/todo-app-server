const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose')
const Todo = require('../models/todo-model')

router.get('/todo', (req, res) => {
    if(req.user){
        Todo.find({
            ownerId: req.user.id
        }).then((foundTodos) => {
            res.send(foundTodos)
        });
    }else{
        res.send('Você precisa estar logado para fazer isso!').status(401);
    }

});

router.post('/todo', (req, res) => {
    if(req.user){
        new Todo({
            todoName: req.body.todoName,
            todoDescription: req.body.todoDescription,
            ownerId: req.user.id
        }).save().then((todoSaved) => {
            res.send('Todo salvo com sucesso!')
        });
    }else{
        res.send('Você precisa estar logado!').status(401);
    }
});

module.exports = router;