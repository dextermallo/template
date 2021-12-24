/**
 * @description APIOperation listed down all possible action as a API may act, 
 * you need to define your own if you want any other operation being executable when a user call the API
 */
export enum APIOperation {
    create = 'create',
    retrieve = 'retrieve',
    update = 'update',
    delete = 'delete',
    unknown = 'unknown'
}