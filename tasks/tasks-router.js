const jwt = require('jsonwebtoken');
const router = require('express').Router();
const db = require('../data/dbConfig');

router.get('/parties/:partyid/task', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload);
    db('task')
        .where('partyid', Number(req.params.partyid))
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/parties/:partyid/task', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const task = req.body;
        // const task = payload.partyid;
        task.partyid = req.params.partyid;
        db('task').insert([task])
            .then(venue => {
                res.status(201).json(venue);
            })

    } catch (error) {
        res.status(500).json(error);
    }

});

router.delete('/task/:taskid', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
  
    db('task')
        .where('id', Number(req.params.taskid))
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

router.put('/task/:taskid', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const task = req.body;
  
    db('task')
        .where('id', Number(req.params.taskid))
        .update(task)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.status(500).json(error);
        })

})

module.exports = router;