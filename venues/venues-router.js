const jwt = require('jsonwebtoken');
const router = require('express').Router();
const db = require('../data/dbConfig');

router.get('/parties/:partyid/venues', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload);
    db('venues')
        .where('partyid',Number(req.params.partyid))
        .join('parties', 'partyid', 'parties.id')
        .then(venues => {
            res.status(200).json(venues);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/parties/:partyid/venues/:venueid', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET)
        const { partyid,venueid } = req.params;
        db('venues').where('partyid', Number(partyid)).where('id',venueid)
            .then(venues => {
                res.status(201).json(venues)
            })
    } catch (error) {
        res.status(500).json(error);
    }

});

router.post('/parties/:partyid/venues', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const venue = req.body;
        // party.userid = payload.userid;
        venue.userid = 1;
        console.log(venue.userid)  
         
        db('venues').where('partyid', Number(req.params.partyid)).insert([venue])
            
            .then(venue => {
                res.status(201).json(venue);
            })

    } catch (error) {
        res.status(500).json(error);
    }
    
});

router.delete('/venues/:id', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const party = req.body;
    party.userid = payload.userid;
    db('venues')
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

router.put('/venues/:id', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const party = req.body;
    party.userid = payload.userid;
    db('parties')
        .where('id', Number(req.params.id))
        .update(party)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.status(500).json(error);
        })

})

module.exports = router;