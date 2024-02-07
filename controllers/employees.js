const {prisma} = require("../prisma/prisma-client");

// @router GET /api/employees
// @deskc получение всех сотрудников
// @acces Private
const all = async (req , res ) => {
    try {
        const employees = await prisma.employee.findMany({
            where:{
                userId : req.user.id
            }
        })

        res.status(200).json(employees)
    }catch {
        res.status(500).json({message : "не удалось получть сотрудников"})
    }
}

// @router POST /api/employees/add
// @deskc добавление сотрудника
// @acces Private
const add = async (req , res ) => {
    try {
        console.log('добавляю') ;
        const data = req.body ;

        if (!data.firstName || !data.lasName || !data.age || !data.adress){
            return res.status(400).json({message : "все поля обязательны "})
        }

        const employee  = await prisma.employee.create({
            data:{
                ...data,
                userId : req.user.id
            }
        });

        return res.status(201).json(employee)

    } catch(err) {
        console.log(err)
        res.status(500).json({message : "что то пошло не так "})
    }
}


module.exports = {
    all ,
    add
}