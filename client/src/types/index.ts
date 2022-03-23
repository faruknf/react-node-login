export interface ILoginFetchInfo {
    method:'POST',
    credentials:'include',
    headers?:HeadersInit
    body:BodyInit
}

export interface IGetFetchInfoWithCookie{
    method:'GET',
    credentials:'include',
    headers?:HeadersInit
}



export interface IUserPayload{
    id?:string
}

export interface IUserAction{
    type:string,
    payload?:IUserPayload
}