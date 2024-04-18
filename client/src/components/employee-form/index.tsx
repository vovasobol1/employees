import {Employee} from "@prisma/client";
import { Card, Form, Space } from "antd";
import {CustomInput} from "../custom-input";
import {ErrorMessage} from "../error-Message";
import {CustomButton} from "../custom-button";

type Props<T> = {
    onFinish : (values : T) => void ;
    btnTExt : string ;
    title : string ;
    error? : string ;
    employee? : T ;

}
export const EmployeeForm = ({onFinish , title , btnTExt , error , employee}:Props<Employee>) => {
    return(
        <Card title={title} style={{width : '30rem'}}>
            <Form name={'employee form'} onFinish={onFinish} initialValues={employee}>
                <CustomInput type={'text'} name={'firstName'} placeholder={'Имя'}/>
                <CustomInput type={'text'} name={'lastName'} placeholder={'Фамилия'}/>
                <CustomInput type={'number'} name={'age'} placeholder={'Возраст'}/>
                <CustomInput type={'text'} name={'address'} placeholder={'Адрес'}/>
                <Space >
                    <CustomButton htmlType={'submit'}>
                        {btnTExt}
                    </CustomButton>
                    <ErrorMessage message={error} />
                </Space>
            </Form>
        </Card>
    )
}