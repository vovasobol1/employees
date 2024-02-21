const {prisma} = require("../prisma/prisma-client");
const brypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// @route POST /api/user/login
// @desc логин
// @acces Public

const login = async (req, res) => {
    try {

        const { email , password } = req.body

        if (!email || !password ) {
            return res.status(400).json({message : 'пожалуйста , заполните обязательные поля '})
        }

        const user = await prisma.user.findFirst({
            where:{
                email ,
            }
        })

        const isPasswordCorrect = user &&  (await brypt.compare(password , user.password))
        const secret = process.env.JWT_SECRET ;

        if (user && isPasswordCorrect && secret ){
            res.status(200).json({
                id : user.id ,
                email : user.email ,
                name : user.name,
                token: jwt.sign({id : user.id} , secret , {expiresIn : "30d"})
            })
        } else {
            return res.status(400).json({ message : "неверно введен логин или пароль"})
        }

    }catch{
        res.status(500).json({message:"что то пошло не так"})
    }

}


// @route POST /api/user/register
// @desc логин
// @acces Public
const register = async (req, res) => {
    try {

        const {email , password, name } = req.body;

        if (!password || !email || !name){
            return res.status(400).json({message: "заполните обязательные поля"})
        }

        const registeredUser = await prisma.user.findFirst({
            where:{
                email
            }
        })

        //если пользователь уже зареган
        if (registeredUser){
            return res.status(400).json({message: "пользователь с таким email уже существует"})
        }

        const salt = await brypt.genSalt(10);//строка которая добавляется к хешу
        const hashedPassword = await brypt.hash(password , salt)

        const user = await prisma.user.create({
            data : {
                email,
                name ,
                password : hashedPassword
            }
        })

        const secret = process.env.JWT_SECRET ;

        if (user && secret) {
            res.status(201).json({
                id : user.id ,
                email : user.email,
                name ,
                token: jwt.sign({id : user.id} , secret , {expiresIn : "30d"})
            })
        }else {
            return res.status(400).json({message: "не удалось создать пользователя"})
        }
    }catch{
        res.status(500).json({message:"что то пошло не так"})
    }
}



/*@route GET api/user/current
@desc текущий пользователь
@acces Private*/


const current = async (req, res) => {
    return res.status(200).json(req.user)
}

module.exports = {
    login ,
    current ,
    register
}