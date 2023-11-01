export interface RequestModel<
Body=any,
Params=Body,
Query=Body,
Headers=Body>
{
    body?:Body;
    params?:Params;
    query?:Query;
    headers?:Headers;
}