const express =  require('express');
const router = express.Router()
const Person = require('../models/person');


router.post('', (async (req, res) => {
    try {
        const PersonData = new Person(req.body)
        const response = await PersonData.save()
        console.log('data save successfully ...');
        res.status(201).json(response)
    } catch (error) {

        console.log('error ', error);
        res.status(500).json({
            message: "internal Server Error",
            error: error
        })
    }

}));
router.get('', (async (req, res) => {
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



router.get('/:workType',async  (req,res)=>{
    const type= req.params.workType
    if(type == 'manager' || type == 'chef' || type == 'waiter' ){
    const person = await Person.find({work:type})
    res.status(200).json({result:person})


    }else{
        res.status(404).json('workType is not proper')
    }
      
})
router.put('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body

        const response = await  Person.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(404).json('No person found');
        }
        res.status(200).json(response);



        
    } catch (error) {
        res.status(500).json(error);

    }
})

module.exports = router