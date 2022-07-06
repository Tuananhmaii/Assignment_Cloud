var Toydb = require('../model/model');

// create and save new toy
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }
    // new toys
    const toy = new Toydb({
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity,
        description:req.body.description
    })

    // save toy into the database
    toy.save(toy).then(data=>{
        res.redirect('/add')
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred"
        });
    });
}

// retrieve and return all users / single user
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Toydb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Can not find toy"})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error finding toy"})
        })
    }else{
        Toydb.find()
        .then(toy=>{
            res.send(toy)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || 'Error occured while finding'})
        })
    }
}

// Update a new identified toys by toys id
exports.update = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }   
    const id = req.params.id
    Toydb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: 'Cannot update toy'})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error update toy"})
    })
}

// Delete a toys with specified toys id
exports.delete = (req,res) =>{
    const id = req.params.id;
    Toydb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message: 'Cannot delete toy'})
        }else{
            res.send({message:'Toys deleted'})
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error delete toy'})
    })
}