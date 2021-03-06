const jwt = require('jsonwebtoken') 
const User = require('../models/user')
const bcrypt = require('bcrypt')
const msg = require('../helpers/messages')
const signToken  = (id) => {
    return jwt.sign({ id }, 'My app',{
        expiresIn: 60 * 60 * 24
    })
};

const authService = {
    
    login: async (data)=>{
        try{
            const{email, password} = data
            let userExists = await User.findOne({email:email}).exec()
            if(await bcrypt.compare(password, userExists.password).then(res=>res)){
                const token = await signToken(userExists.id)
                return{
                    code: 200,
                    token
                }
            }else{
                return msg.authFailed
            }
        } catch (error){
            return error 
        }
    },
    register: async (userData)=> {
        try{
            let hash = await bcrypt.hash(userData.password, 10).then(res => res)
            userData.password = hash
            const responseRegister = await userData.save()
            let token =  signToken(userData._id)
            return{
                code: 200,
                token
            } 
        }catch (error){
            return error
        }
    } 
}

module.exports = authService