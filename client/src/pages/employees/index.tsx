import {Layout} from "../../components/layout";
import {CustomButton} from "../../components/custom-button";
import {PlusCircleOutlined} from "@ant-design/icons";
import {Table} from "antd";
import {useGetAllEmployeesQuery} from "../../app/servises/employees";
import {ColumnsType} from "antd/es/table";
import {Employee} from "@prisma/client";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {log} from "util";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {useEffect} from "react";


const columns : ColumnsType<Employee> = [
    {
        title : 'имя',
        dataIndex : "firstName" ,
        key : 'firstName'
    } ,
    {
        title : 'возраст',
        dataIndex : "age" ,
        key : 'age'
    } ,
    {
        title : 'адрес',
        dataIndex : "address" ,
        key : 'address'
    } ,
]

export const Employees = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const {data , isLoading} = useGetAllEmployeesQuery()

    useEffect(() => {
        if (!user){
            navigate('/login')
        }
    }, [navigate , user]);


    const goToAddEmployee = () => {
        navigate(Paths.employeeAdd)
    }

    return (
        <Layout>
            <CustomButton type={"primary"} onClick={goToAddEmployee} icon={<PlusCircleOutlined/>}>
                добавить
            </CustomButton>
            <Table
                loading={isLoading}
                dataSource={data}
                pagination={ false }
                columns={columns}
                rowKey={ (record) => record.id}
                onRow={(record, index) => ({
                    onClick: () => navigate(`${Paths.employee}/${record.id}`),
                })}
            />
        </Layout>
    )
}