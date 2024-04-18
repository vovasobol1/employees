import React, {useState} from "react";
import {Layout} from "../../components/layout";
import {Card, Form, Row, Space, Typography} from "antd";
import {CustomInput} from "../../components/custom-input";
import {PasswordInput} from "../../components/password-input";
import {CustomButton} from "../../components/custom-button";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useLoginMutation, UserData} from "../../app/servises/auth";
import {IsErrorWithMessage} from "../../utils/is-error-with-message";
import {ErrorMessage} from "../../components/error-Message";

// функция которая вызовется когда пользователь отправит форму логина
export const Login = () => {
    // loginUser вызывает запрос
    // loginUserResult принимает результат запроса

    const navigate = useNavigate()
    const [loginUser , loginUserResult] = useLoginMutation()
    const [error , setError] = useState('')

    const login = async(data : UserData) =>{
        try{
            await loginUser(data).unwrap()
            navigate('/')
        }catch (error) {
            const maybeError = IsErrorWithMessage(error)

            //если ошибка пришла с сервера
            if (maybeError){
                setError(error.data.message)
            }else {
                setError('неизвестаня ошибка')
            }
        }
    }


    return (
        <Layout>
            <Row align={"middle"} justify={"center"}>
                <Card title={'Войдите'} style={{width: '30rem'}}>
                    <Form onFinish={login}>
                        <CustomInput name={"email"} placeholder={"Email"} type={'email'}/>
                        <PasswordInput name={"password"} placeholder={'пароль'}/>
                        <CustomButton type={"primary"} htmlType={'submit'}>Войти</CustomButton>
                    </Form>
                    <Space direction={'vertical'} size={'large'}>
                        <Typography.Text>
                            Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
                        </Typography.Text>
                        <ErrorMessage message={error}/>
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}