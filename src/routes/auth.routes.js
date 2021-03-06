const express = require ('express')
const router = express.Router()
const msg = require('../helpers/messages')
const User = require('../models/user')
const  authService = require('../services/auth.service')

router.post('/register', async (req, res)=>{
    try{
        const user = new User(req.body)
        console.log(user)
        const token = await authService.register(user)
        console.log(token)
        res.status(200).json(token);
    }catch (error){
        res.send(error)
    }
})

router.post('/login', async (req, res)=>{
    try{
        const{email, password} = req.body
        if(!email || !password){
            res.status(400).json(msg.fieldsRequired)
        }
        const token = await authService.login(req.body)
        res.status(200).send(token)
    }catch (error){
        res.send(error)
    }
})

module.exports = router