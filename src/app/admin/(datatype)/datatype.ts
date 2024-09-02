export type RegisterResponseData = {
    code: CodeType
    success: boolean
    message: string
    data: any
}

export type RegisterRequestData = {
    username: string
    password: string
}

export type LoginResponseData = {
    code: CodeType
    success: boolean
    message: string
    token: string
}

export type LoginRequestData = {
    username: string
    password: string
}

export type MyJwtPayload = { 
    userId: number,
    username: string,
    exp?: number
}

export const enum CodeType  {
    SUCCESS = 200,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500
}

export type AddMemoRequestData = {
    title: string
    content: string
    userId: number
}

export type AddMemoResponseData = {
    code: CodeType
    success: boolean
    message: string
    data: any
}

export type GetMemoRequestData = {
    title: string
    content: string
    userId: number
}

export type GetMemoResponseData = {
    code: CodeType
    success: boolean
    message: string
    data: any
}

