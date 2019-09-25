const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/user-model.js');
const jwt = require('jsonwebtoken'); 

router.post('/register', async (req, res) => {
    let user = req.body;
    const hash = await bcrypt.hash(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
        .then(saved => {
         
            res.status(201).json(saved);
        })
        .catch(error => {
            
            res.status(500).json(error);
        });


});

router.post('/login', (req, res) => {
    let { emailaddress, password } = req.body;

    Users.findBy({ emailaddress })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                // add info about our user to the session
                const payload = {
                    userid:user.id
                }
             const token = jwt.sign(payload,process.env.JWT_SECRET)
                res.status(200).json({
                    token                    
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})



// router.get('/logout', (req, res) => {
//     if (req.session) {
//       req.session.destroy(err => {
//         if (err) {
//           res.json({
//             message: "you can checkout but you can't leave"
//           });
//         } else {
//           res.end();
//         }
//       })
//     }
//   });
  
  module.exports = router;
  