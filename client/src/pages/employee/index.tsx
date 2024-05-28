import {Link, Navigate, useNavigate, useNavigation, useParams} from "react-router-dom";
import {useState} from "react";
import {EmployeeForm} from "../../components/employee-form";
import {useGetEmployeeQuery, useRemoveEmployeeMutation} from "../../app/servises/employees";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {Layout} from "../../components/layout";
import {Descriptions, Divider, Modal, Space} from "antd";
import {CustomButton} from "../../components/custom-button";
import {DeleteOutlined, EditOutlined, LoadingOutlined} from "@ant-design/icons";
import {ErrorMessage} from "../../components/error-Message";
import {Paths} from "../../paths";
import {IsErrorWithMessage} from "../../utils/is-error-with-message";



export const Employee = () => {
    const navigate = useNavigate()
    const [error , setError] = useState('')
    const params = useParams<{ id: string }>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {data , isLoading} = useGetEmployeeQuery(params.id || "")
    const [removeEmployee] = useRemoveEmployeeMutation()
    const user = useSelector(selectUser) //текущий пользователь

    const showModal = () => {
        // функция вызывается когда нажимают кнопку удалить и открывает модальное окно
        setIsModalOpen(true)
    }

    const hideModal = () => {
        // функция вызывается когда нажимают кнопку отменить в модальном окне
        setIsModalOpen(false)
    }

    const handleDeleteUser = async () => {
        //вызовется когда в модальном окне нажмут подтвердить (удаляет сотрудника)
        hideModal()

        try{
            if (data && data.id) {
                await removeEmployee(data.id).unwrap();
                navigate(`${Paths.status}/deleted`);
            } else {
                // Обработка случая, когда data или data.id не определены
                setError('Invalid data or data.id is undefined');
            }

            navigate(`${Paths.status}/deleted`)
        }catch (err) {
            const maybeError = IsErrorWithMessage(err)

            //если ошибку мой обработал сервер и дал ответ с сообщением для пользователя
            if (maybeError){
                setError(err.data.message)
            }else {
                setError('неизвестная ошибка')
            }
        }

    }


    if (isLoading) {
        return <LoadingOutlined style={{fontSize: '150px'}} />
    }

    if (!data) {
        return <Navigate to={'/'}/>
    }

    return (
        <Layout>
            <Descriptions title={'информация о сотруднике'} bordered={true}>
                <Descriptions.Item label={'Имя'} span={3}>
                    {`${data.firstName} ${data.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label={'Возраст'} span={3}>
                    {`${data.age}`}
                </Descriptions.Item>
                <Descriptions.Item label={'Адрес'} span={3}>
                    {`${data.address}`}
                </Descriptions.Item>
            </Descriptions>
            {

                user?.id === data.userId && (
                    <>
                        <Divider orientation={"left"}>Действия</Divider>
                        <Space>
                            <Link to={`/employee/edit/${data.id}`}>
                                <CustomButton shape={'round'}
                                              type={'default'}
                                              icon={<EditOutlined/>}
                                >
                                    Редактрировать
                                </CustomButton>
                            </Link>
                            <CustomButton shape={'round'}
                                          danger
                                          icon={<DeleteOutlined/>}
                                          onClick={showModal}
                            >
                                Удалить
                            </CustomButton>
                        </Space>
                    </>
                )
            }
            <ErrorMessage message={error}/>
            <Modal
                title={'Подтвердите удаление'}
                open={isModalOpen}
                onOk={handleDeleteUser}
                onCancel={hideModal}
                okText={'Подтвердить'}
                cancelText={'Отменить'}
            >
                Вы дейтвительно ходите удалить сотрудника ?
            </Modal>
        </Layout>
    )
}