import {useCurrentQuery} from "../../app/servises/auth";

type childrenType = {
     children : JSX.Element
}

export const Auth = ({children} : childrenType) =>{
    const { isLoading } = useCurrentQuery()

    //если идет загрузка
    if (isLoading){
        return <span>загрузка</span>
    }

    return(
        children
    )
}