const express = require('express');
const router = express.Router()
const {auth} = require("../middleware/auth")
const {all , add } = require("../controllers/employees");

// /api/employees
router.get('/' , auth ,  all)

// /api/employees/add
router.post('/add', auth, add);

// /api/employees/remove:id
router.post('/remove/:id' , auth ,  ()=> console.log('remove employee'))

router.put('/edit/:id' , auth ,  ()=> console.log('edit employee'))

// /api/employees/:id
router.post('/:id' , auth ,  ()=> console.log('get single employee'))

module.exports = router ;