const jwt = require('jsonwebtoken');
const router = require('express').Router();
const db = require('../data/dbConfig');

router.get('/parties/venues', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload);
    db('venues')
        .where('userid', payload.userid)
        .join('venues', 'partyid', 'parties.id')
        .then(venues => {
            res.status(200).json(venues);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/parties/venues/:id', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET)
        const { id } = req.params;
        db('venues').where('userid', id)
            .then(venues => {
                res.status(201).json(venues)
            })
    } catch (error) {
        res.status(500).json(error);
    }

});

router.post('/parties/venues', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const party = req.body;
        party.userid = payload.userid;
        console.log(party.userid)    
        db('venues').insert(party)
            .where('userid', payload.userid)
            .first()
            .then(venue => {
                res.status(201).json(venue);
            })

    } catch (error) {
        res.status(500).json(error);
    }
    
});

router.delete('/parties/venues/:id', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const party = req.body;
    party.userid = payload.userid;
    db('venues')
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

router.put('/parties/venues/:id', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const party = req.body;
    party.userid = payload.userid;
    db('parties')
        .where('id', req.params.id)
        .update(party)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.status(500).json(error);
        })

})
