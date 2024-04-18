import {Alert} from "antd";

type Props = {
    message? : string
}


export const ErrorMessage = ({message}:Props) =>{
    if (!message) {
        return null
    } else {
        return <Alert message={message} type={"error"}/>
    }

}