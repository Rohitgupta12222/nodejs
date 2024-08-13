const express = require('express');
const router = express.Router()
const Person = require('../models/person');
const { jwtAuthMiddleWare, genrateToken } = require('../jwt/jwt')


router.post('/signup', (async (req, res) => {
    try {
        const PersonData = new Person(req.body)
        const response = await PersonData.save()
        const payloadJwt = {
            id: response.id,
            username: response.username,
        }

        const token = genrateToken(payloadJwt)
        console.log(' this is token ', token);
        console.log('data save successfully ...');
        res.status(201).json({ response: response, token: token })
    } catch (error) {

        console.log('error ', error);
        res.status(500).json({
            message: "internal Server Error",
            error: error
        })
    }

}));
router.get('',jwtAuthMiddleWare, (async (req, res) => {
    try {
        const response = await Person.find()
        res.status(200).json({
            result: response
        })

    } catch (error) {
        res.status(500).json({
            message: "internal Server Error",
            error: error
        })
    }
}))

router.get('/profile',jwtAuthMiddleWare,async (req,res)=>{
    const userData = req.user
    try {
        const responce = await Person.findById(userData.id)
       return res.status(200).json({responce})
        
    } catch (error) {
      return  res.status(500).json({error})
    }
    

})


router.get('/:workType', async (req, res) => {
    const type = req.params.workType
    if (type == 'manager' || type == 'chef' || type == 'waiter') {
        const person = await Person.find({ work: type })
        res.status(200).json({ result: person })


    } else {
        res.status(404).json('workType is not proper')
    }

})
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body

        const response = await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
        if (!response) {
            res.status(404).json('No person found');
        }
        res.status(200).json(response);




    } catch (error) {
        res.status(500).json(error);

    }
})

router.post('/login', async (req, res) => {
    const  {username,password} = req.body
    // console.log(req.body?.username,'login data');
    const user = await Person.findOne({ username: username })

    if (!user) return res.status(404).json({ error: 'user not found' })
    const check = await user.comparePassword(password)
    if (!check) return res.status(404).json({ error: 'invaild password' })
    const payload = {
        id: user.id,
        username: user.username
    }
    res.status(200).json({ response: user, token: genrateToken(payload) })


})
module.exports = router