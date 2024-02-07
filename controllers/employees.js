const {prisma} = require("../prisma/prisma-client");

// @router GET /api/employees
// @deskc получение всех сотрудников
// @acces Private
const all = async (req , res ) => {
    try {
        const employees = await prisma.employee.findMany()

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
        const data = req.body ;

        if (!data.fistName || !data.lastName || !data.age || data.adress){
            return res.status(400).json({message : "все поля обязательны "})
        }

        const employee = await prisma.user.update({
            where : {
                id : req.user.id
            } ,
            data : {
                createdEmployee : {
                    create : data
                }
            }
        })

        return res.status(201).json(employee)

    } catch {
        res.status(500).json({message : "что то пошло не так "})
    }
}


module.exports = {
    all ,
    add
}