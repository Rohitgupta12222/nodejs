const express = require('express')
const router = express.Router();
const menuItem = require('../models/menuItems')


router.post('', async (req, res) => {
    try {
        const data = new menuItem(req.body);
        const response = await data.save();
        res.status(201).json(response);
        console.log('item saved ');

    } catch (error) {
        res.status(201).json(error)
        console.log(error);

    }
})
router.get('', async (req, res) => {
    try {
        console.log('calling data  === >>>>');
        const response = await menuItem.find();
        const count = await menuItem.count()
        res.status(200).json({ result: response });
        console.log('data fetch');
    } catch (error) {
        res.status(500).json(error);

        console.log(error);

    }
})
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste
        if (taste == 'sweet' || taste == 'soul' || taste == 'spicy') {


            const response = await menuItem.find({ taste: taste })
            res.status(200).json({ result: response })
        } else {
            res.status(404).json('taste  is invalid')
        }

    } catch (error) {
        res.status(500).json(error)

    }

})
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const response = await menuItem.findByIdAndUpdate(id, data, {
            new: true,
            runValidations: true
        })
        if(!response){
            res.status(404).json('no item found')

        }

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json('Interal server error')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
   
        const response = await menuItem.findByIdAndDelete(id)
        if(!response){
            res.status(404).json('no item found')

        }

        res.status(200).json({message:'Record deleted successfully'})


    } catch (error) {
    console.log(error);
        res.status(500).json('Interal server error')
    }
})


module.exports = router