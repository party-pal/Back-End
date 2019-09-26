const jwt = require('jsonwebtoken');
const router = require('express').Router();
const db = require('../data/dbConfig');

router.get('/task', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload);
    db('task')
        .where('partyid',req.params.id)
        .join('venues', 'venueid', 'venues.id')
        .then(venues => {
            res.status(200).json(venues);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/task/:id', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET)
        const { id } = req.params;
        db('task').where('venueid', req.params.id)
            .then(venues => {
                res.status(201).json(venues)
            })
    } catch (error) {
        res.status(500).json(error);
    }

});

router.post('/task', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const party = req.body;
        party.userid = payload.userid;
        console.log(party.userid)    
        db('task').insert(party)
            .where('venueid', req.params.id)
            .first()
            .then(venue => {
                res.status(201).json(venue);
            })

    } catch (error) {
        res.status(500).json(error);
    }
    
});

router.delete('/task/:id', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const party = req.body;
    party.userid = payload.userid;
    db('task')
        .where('id', req.params.id)
        .del()
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.put('/task/:id', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const party = req.body;
    party.userid = payload.userid;
    db('task')
        .where('id', req.params.id)
        .update(party)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.status(500).json(error);
        })

})

module.exports = router;