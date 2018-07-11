const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

//delete
router.get('/:id/delete', (req,res)=>{
    Food.findByIdAndRemove(req.params.id)
    .then((err)=>{
        res.send('Borrado la food: ' + req.params.id);
    });
});

//update
router.get('/update/:id', (req,res)=>{
    Food.findByIdAndUpdate(req.params.id, {taste:'Delicious but weird'})
    .then(food=>{
        res.send('food modificada');
    })
    .catch(err=>{
        res.send('algo malo pasó');
    });
});

//create
router.get('/new', (req,res)=>{
    Food.create({
        name:'hamburguesa sin asucar', 
        calories:50,
        hasSugar:false,
        ingredients:['verdura','quinoa'],
        taste: 'delicious',
        tipo:'plate'
    })
    .then(food=>res.send('comida creada'))
    .catch(err=>res.send(err));
});

//read a single one
// router.get('/search/:name', (req, res) => {
//     const query = {};
//     if(req.query.name) query.name = {name:{$regex:req.query.name, $options:"i"}};
//     if(req.query.calories) query.calories = {$lte:req.query.calories, $options:"i"};
//     if(req.query.hasSugar) query.hasSugar = {hasSugar:req.query.hasSugar};

//     Food.find(query)
//     .then(food => res.send(food))
//     .catch(e => res.send(e))
// })

//
router.get('/search', (req, res) => {
    res.render('food/form')
});

router.post('/search', (req, res) => {
    const {search} = req.body;
    const query = {};
    if (search) query.name = {name:{$regex:search, $options:'i'}};
    Food.find(query)
    .then(items => res.render('food/form', {items}))
    .catch(err => res.send(err));
    //1.- Hace la busqueda en la bd (model)
    //2.- dentro de la .then, renderiza el view pero le pasa los resultados
});

//read
router.get('/', (req,res)=>{
    Food.find()
    .then(items=>res.render('food/lista',{items}))
    .catch(err=>res.send(err));
});

module.exports = router;