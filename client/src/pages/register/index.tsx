import React, {useState} from "react";
import {Layout} from "../../components/layout";
import {Card, Form, Row, Space, Typography} from "antd";
import {CustomInput} from "../../components/custom-input";
import {PasswordInput} from "../../components/password-input";
import {CustomButton} from "../../components/custom-button";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useLoginMutation, UserData, useRegisterMutation} from "../../app/servises/auth";
import {IsErrorWithMessage} from "../../utils/is-error-with-message";
import {ErrorMessage} from "../../components/error-Message";

export const Register = () =>{
    // registerUser вызывает запрос
    // registerUserResult принимает результат запроса

    const [registerUser , registerUserResult] = useRegisterMutation()
    const [error , setError] = useState('')
    const navigate = useNavigate()

    const register = async(data : UserData) =>{
        try{
            await registerUser(data).unwrap()
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

    return(
        <Layout>
            <Row align={"middle"} justify={"center"}>
                <Card title={'Зарегистрируйтесь'} style={{width: '30rem'}}>
                    <Form onFinish={register}>
                        <CustomInput name={"name"} placeholder={"Имя"} />
                        <CustomInput name={"email"} placeholder={"Email"} type={'email'}/>
                        <PasswordInput name={"password"} placeholder={'пароль'} />
                        <PasswordInput name={"confirmPassword"} placeholder={'повторите пароль'} />
                        <CustomButton type={"primary"} htmlType={'submit'}>Зарегистрироваться</CustomButton>
                    </Form>
                    <Space direction={'vertical'} size={'large'}>
                        <Typography.Text>
                            Уже зарегистрированы ? <Link to={Paths.login}>Войдите</Link>
                        </Typography.Text>
                    </Space>
                    <ErrorMessage message={error}/>
                </Card>
            </Row>
        </Layout>
    )
}