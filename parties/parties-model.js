const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const db = require('../data/dbConfig');


router.get('/parties', (req, res) => {
    
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload);
    db('parties')
        .where('user_Id',payload.userid)
        .join('venues','party_Id','parties.id')
        .then(parties => {
            res.status(200).json(parties);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;



