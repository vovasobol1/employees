const jwt = require('jsonwebtoken')
const {prisma} = require('../prisma/prisma-client')

const auth = async (req , res , next ) =>{
    try {
        let token = req.headers.authorization?.split(' ')[1]//достаем токен

        const decodet = jwt.verify(token, process.env.JWT_SECRET )

        const user = await prisma.user.findUnique({
            where : {
                id : decodet.id
            }
        })

        req.user = user

        next();
    } catch (err){
        res.status(401).json({message : "не авторизован"})
    }
}


module.exports = {
    auth
}