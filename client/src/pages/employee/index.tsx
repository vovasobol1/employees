import {Navigate, useNavigation, useParams} from "react-router-dom";
import {useState} from "react";
import {EmployeeForm} from "../../components/employee-form";
import {useGetEmployeeQuery, useRemoveEmployeeMutation} from "../../app/servises/employees";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {Layout} from "../../components/layout";
import {Descriptions} from "antd";



export const Employee = () => {
    const navigate = useNavigation()
    const [error , setError] = useState('')
    const params = useParams<{ id: string }>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {data , isLoading} = useGetEmployeeQuery(params.id || "")
    const [removeEmployee] = useRemoveEmployeeMutation()
    const user = useSelector(selectUser) //текущий пользователь

    if (isLoading) {
        return <span>Загрузка</span>
    }

    if (!data) {
        return <Navigate to={'/'}/>
    }

    return (
        <Layout>
            <Descriptions title={'информация о сотруднике'}>
                <Descriptions.Item label={'имя'} span={3}>
                    {`${data.firstName} ${data.lastName}`}
                </Descriptions.Item>
            </Descriptions>
        </Layout>
    )
}