//тип для ошибок приложения которые вернутся с бекенда

export type ErrorWithMessage = {
    status : number ,
    data : {
        message : string
    }
}