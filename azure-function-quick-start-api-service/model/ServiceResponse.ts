/**
 * @description a general service response for both internal and external usage
 */
export type ServiceResponse = {
    
    /**
     * To indicate the status or the service response
     * @example
     * 1 - once a server response is 500, it should be `isSuccess = false`
     * 2 - once a server response is 200, but the processing might to execute completely, 
     * it should be `isSuccess = false` with message to indicate the situation
     */
    isSuccess: boolean;

    /**
     * message can be attached as a ref, it can be a logger or code as well to pinpoint errors.
     */
    message?: string;

    /**
     * response's data
     */
    data?: any;
}