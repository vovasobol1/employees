import {Row, Result, Button} from "antd"
import {Link, useParams} from "react-router-dom"

const Statuses: Record<string, string> = {
    created: 'пользователь успешно создан',
    updated: 'пользователь успешно обновлен',
    deleted: 'пользователь успешно удален',
}

export const Status = () => {
    const {status} = useParams()

    return (
        <Row justify={'center'} align={'middle'} style={{width: "100%"}}>
            <Result
                status={status ? 'success' : 404}
                title={status ? Statuses[status] : 'не найдено'}
                extra={
                    <Link to={'/'}>
                        <Button key={'dashboard'}>
                            на главную
                        </Button>
                    </Link>
                }
            />
        </Row>
    )
}