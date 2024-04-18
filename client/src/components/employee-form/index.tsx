import {Employee} from "@prisma/client";
import { Card } from "antd";

type Props<T> = {
    onFinish : (values : T) => void ;
    btnTExt : string ;
    title : string ;
    error? : string ;
    employee? : T ;

}
export const employeeForm = ({onFinish , title , btnTExt , error , employee}:Props<Employee>) => {
    return(
        <Card>

        </Card>
    )
}