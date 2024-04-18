import {NamePath} from "antd/es/form/interface";
import React from "react";
import {Form, Input} from "antd";


type Props = {
    name: string
    placeholder: string
    dependencies?: NamePath[]
}

export const PasswordInput = (props: Props) => {
    return (

            <Form.Item name={props.name} dependencies={props.dependencies} hasFeedback
                       rules={[
                           {
                               required: true,
                               message: 'обязательное поле'
                           },
                           ({getFieldValue}) => (
                               {
                                   validator(_, value) {
                                       if (!value) {
                                           return Promise.resolve()
                                       }

                                       if (props.name === "confirmPassword") {
                                           console.log(value)
                                           console.log(getFieldValue('password'))
                                           if (!value || getFieldValue('password') === value) {
                                               return Promise.resolve();
                                           }else{
                                               return Promise.reject(new Error('Пароли должны совпадать!'));
                                           }
                                       } else {
                                           if (value.length < 8) {
                                               return Promise.reject(new Error('Пароль должен быть длинее 8 символов'));
                                           }else{
                                               return Promise.resolve();
                                           }
                                       }
                                   }
                               })
                       ]}>
                <Input.Password placeholder={props.placeholder} size={"large"}/>
            </Form.Item>

    )
}