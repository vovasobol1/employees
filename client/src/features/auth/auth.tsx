import {useCurrentQuery} from "../../app/servises/auth";
import {LoadingOutlined} from "@ant-design/icons";

type childrenType = {
     children : JSX.Element
}

export const Auth = ({children} : childrenType) =>{
    const { isLoading } = useCurrentQuery()

    //если идет загрузка
    if (isLoading) {
        return <LoadingOutlined style={{fontSize: '150px'}} />
    }

    return(
        children
    )
}