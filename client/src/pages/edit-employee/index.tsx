import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEditEmployeeMutation, useGetEmployeeQuery} from "../../app/servises/employees";
import {Row} from "antd";
import {EmployeeForm} from "../../components/employee-form";
import {Layout} from "../../components/layout";
import {IsErrorWithMessage} from "../../utils/is-error-with-message";
import {Employee} from "@prisma/client";
import {Paths} from "../../paths";


export const EditEmployee = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const params = useParams<{ id: string }>()
    const {data , isLoading} = useGetEmployeeQuery(params.id || "") // получает сотрудника по айди
    const [editEmployee] = useEditEmployeeMutation()


    const handleEditUser = async(employee : Employee) => {
        try {
            const editedEmployee = {
                ...data ,
                ...employee
            }

            await editEmployee(editedEmployee).unwrap()
            navigate(`${Paths.status}/updated/`)

        }catch (err) {
            const maybeError = IsErrorWithMessage(err)


            if (maybeError){
                setError(err.data.message)
            }else {
                setError('неизвестная ошибка')
            }
        }
    }

    if (isLoading){
        return <span>загрузка</span>
    }

    return (
        <Layout>
            <Row align={'middle'} justify={'center'} >
                <EmployeeForm employee={data}
                              title={'Редактрировать'}
                              btnTExt={'Подтвердить'}
                              onFinish={handleEditUser}
                              error={error}
                />
            </Row>
        </Layout>
    )
}