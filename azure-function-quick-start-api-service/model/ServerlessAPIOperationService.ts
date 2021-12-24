import { Context } from '@azure/functions';
import { ServerlessAPIService } from './ServerlessAPIService';
import { ServiceResponse, ServiceResponseFunc, APIOperation } from '.';


/**
 * @description to create a API service which can handle different operation based on different URL path,
 * a ServerlessAPIOperationService can take on multiple operations all-in-one by using attributes `apiOperationMap`,
 * if you want to create a simple serverlessAPI, see class ServerlessAPIService.
 * During the development, a developer can focus on designing function `isValidateRequestSchema()` and `processRequest`
 * (inherited from ServerlessAPIService) in the operationMap.
 * @example
 * ```md
 * /service/user/get    (get is the operation in this case)
 * /service/user/delete (delete is the operation in this case)
 * both url path can execute in the same process, which is capable of sharing similar business logic (helps us to achieve DRY)
 * ```
 */
export abstract class ServerlessAPIOperationService extends ServerlessAPIService {
    /**
     * @description when a class instance is been called, the class itself should know the current operation.
     */
    operation: APIOperation;

    /**
     * @description apiOperationMap is to distribute execution to corresponding function based on the operation,
     * normally, an API should implement both function `processing` and `validation`, noted that sometimes a invalid operation
     * will be sent, you can define a specific action for it as well.
     * @example
     * ```ts
     * apiOperation = {
     *      // create don't need to be verified
     *      create: { processing: async () => { return { isSuccess: true, message: 'success create' }; } },
     *      retrieve: {
     *          processing: async () => { return { isSuccess: true, message: 'success retrieve' }; },
     *          validation: async () => { return { isSuccess: true, message: 'success validation' };
     *      }
     * }
     * ```
     */
    apiOperationMap: Partial<Record<APIOperation, {
        processing?: ServiceResponseFunc,
        validation?: ServiceResponseFunc
    }>> = {};

    constructor(request: any, context: Context = null) {
        super(request, context);
        this.operation =
            context.bindingData.operation in APIOperation ? context.bindingData.operation : APIOperation.unknown;
    }

    /**
     * @description map the execution right to fn based on the operation
     * @returns ServiceResponse
     */
    async isValidateRequestSchema(): Promise<ServiceResponse> {
        this.context.log(`start ServerlessRestAPIService/isValidateRequestSchema: operation = ${this.operation}`);
        const fn = this.apiOperationMap[this.operation].validation;
        if (!!fn) { return await fn(); }
        return { isSuccess: true, message: 'bypass validation'};
    }

    /**
     * @description map the execution right to fn based on the operation
     * @returns ServiceResponse
     */
    async processRequest(): Promise<ServiceResponse> {
        this.context.log(`start ServerlessRestAPIService/processRequest: operation = ${this.operation}`);
        const fn = this.apiOperationMap[this.operation].processing;
        if (!!fn) { return await fn(); }
        return { isSuccess: false, message: 'processing method of operation missing.'};
    }
}