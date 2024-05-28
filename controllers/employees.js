const {prisma} = require("../prisma/prisma-client");
const {faker} = require("@faker-js/faker");

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


const addTestEmployees = async (req, res) => {
    try {
        const numberOfEmployees = req.body.numberOfEmployees;

        if (!numberOfEmployees || typeof numberOfEmployees !== 'number') {
            return res.status(400).json({ message: "Необходимо передать количество сотрудников" });
        }

        const employees = [];
        for (let i = 0; i < numberOfEmployees; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const age = faker.number.int({ min: 18, max: 65 }).toString();
            const address = faker.location.city();

            // console.log(`Generated employee ${i + 1}:`, { firstName, lastName, age, address });

            employees.push({
                firstName,
                lastName,
                age,
                address
            });
        }

        const createdEmployees = [];
        console.log(req.user.id)
        for (const employeeData of employees) {
            console.log(employeeData)
            const employee = await prisma.employee.create({
                data:{
                    ...employeeData,
                    userId : req.user.id
                }
            });
            createdEmployees.push(employee);
        }

        return res.status(201).json(createdEmployees);
    } catch (err) {
        console.error('Error creating employees:', err);
        res.status(500).json({ message: 'Не удалось добавить сотрудников' });
    }
};




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

    // Проверяем наличие и корректность поля id в объекте data
    if (!data || !data.id) {
        console.error('Ошибка: некорректные данные для редактирования');
        console.error('Полученные данные:', data);
        return res.status(400).json({ message: 'Некорректные данные для редактирования' });
    }
    
    try{
        await prisma.employee.update({
            where : {
                id
            },
            data : data
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
    try{
        const { id } = req.params
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
    employee ,
    addTestEmployees
}