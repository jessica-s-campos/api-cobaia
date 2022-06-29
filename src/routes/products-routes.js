'use strict'

const express = require('express');
const router = express.Router();


router.post('/',(req, res, next) => {
    res.status(201).send({message : 'Entrei no post.', dados : req.body});   
});

router.put('/:id',(req, res, next) => {
    const id = req.params.id;
    res.status(201).send("entrei no put com id "+id);   
});

router.delete('/:id',(req, res, next) => {
    const id = req.params.id;
    res.status(201).send("entrei no delete com id "+id);   
});

module.exports = router;