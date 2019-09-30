const jwt = require('jsonwebtoken');
const router = require('express').Router();
const db = require('../data/dbConfig');


router.get('/parties/', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload);

    db('parties')
        // .join('venues', 'venues.partyid', 'parties.id')
        .where({ userid: Number(payload.userid) })
        .then(parties => {
            res.status(200).json(parties);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/parties/:id', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        db('parties').where('userid', Number(payload.userid)).where('partyid', Number(req.params.id))
            .join('venues', 'venues.partyid', 'parties.id')
            .then(parties => {
                res.status(201).json(parties)
            })
    } catch (error) {
        res.status(500).json(error);
    }

});

router.post('/parties', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const party = req.body;
        party.userid = payload.userid;
        console.log(party.userid)
        db('parties').insert([party])
            .where('userid', Number(payload.userid))
            .then(party => {
                res.status(201).json(party);
            })

    } catch (error) {
        res.status(500).json(error);
    }

});

router.delete('/parties/:id', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const party = req.body;
    party.userid = payload.userid;
    db('parties')
        .where('id', Number(req.params.id))
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

router.put('/parties/:id', (req, res) => {

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


module.exports = router;



