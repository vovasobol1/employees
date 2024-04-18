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
        const data = req.body ;

        if (!data.firstName && !data.lastName && !data.age && !data.address){
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
        res.status(500).json({message : 'не удалось добавить сотрудника'})
    }
}


//@router POST /api/employees/remove:id
// @deskc удаление сотрудника
// @acces Private
const remove = async (req , res) =>{
    const { id } = req.body
    try {
        await prisma.employee.delete({
            where:{
                id
            }
        })
        res.status(204).json('OK')
    }catch (err) {
        res.status(500).json({message : "не удалось удалить сотрудника"})
    }
}


// @router PUT /api/employees/edit:id
// @deskc редактирование сотрудника
// @acces Private
const edit = async (req , res) =>{
    const data = req.body
    const id = data.id
    
    try{
        await prisma.employee.update({
            where : {
                id
            },
            data
        })

        res.status(204).json('OK')
    }catch (err) {
        res.status(500).json({message : "не удалось редактировать сотрудника"})
    }
}

// @router GET /api/employees/:id
// @deskc получение сотрудника
// @acces Private
const employee = async (req , res ) =>{
    // const { id } = req.params

    try{
        const employee = await prisma.employee.findUnique({
            where : {
                id ,
            } ,
        })
        res.status(200).json(employee)
    }catch (err) {
        res.status(500).json({message : "не удалось получить сотрудника"})
    }
}

module.exports = {
    all ,
    add ,
    remove ,
    edit ,
    employee
}