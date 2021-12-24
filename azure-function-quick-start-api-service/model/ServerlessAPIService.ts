import { Context } from '@azure/functions';
import { ServiceResponse, StatusCode } from '.';

/**
 * @description to create a serverless API service
 */
export abstract class ServerlessAPIService {

    /**
     * @description inbound request
     */
    request: any;

    /**
     * @description context references to Azure Function's context so that we can do logging easier
     */
    context?: Context;

    constructor(request: any, context: Context = null) {
        this.request = request;
        this.context = context;
    }

    /**
     * @description to identify any authorization method
     * @returns whether the authorization is pass or not
     * @example
     * suppose you have an API-key:
     * ```ts
     * if (request.headers['API-key'] === '<your API key>') {
     *      return true;
     * }
     * ```
     */
    async isAuthorized(): Promise<Boolean> {
        this.context.log('start ServerlessAPIService/verifyRequestType');
        // code authorization verification method here
        return true;
    }

    /**
     * To set the http response, once the function is be called, Azure Function will be signaled as completed.
     * @param response - ServiceResponse
     * @param statusCode - http status code
     */
    async setResponse(response: ServiceResponse, statusCode: StatusCode) {
        this.context.log('start ServerlessAPIService/setResponse');
        this.context.res = { body: response, status: statusCode, type: 'application/json' };
        this.context.done();
    }

    /**
     * To validate request schema. That is, normally a API request will have several params as input,
     * this function is the place for validating these params.
     * @returns ServiceResponse
     * @example
     * ```ts
     * if (this.request.body['userId'] === 1) {
     *      return { isSuccess: false, message: 'user is not allowed to this API' };
     * } 
     * ```
     */
    abstract isValidateRequestSchema() : Promise<ServiceResponse> | ServiceResponse;

    /**
     * To process the business logic
     * @returns ServiceResponse
     * @example
     * ```ts
     * const userId = this.request.body['userId'];
     * const userName = this.request.body['userName'];
     * let data = database.user.find(userId=userId);
     * data.update(userName=userName);
     * data.save();
     * ```
     */
    abstract processRequest(): Promise<ServiceResponse> | ServiceResponse;


    /**
     * execute as the facade pattern executer; acting as a class instance, the only function should be called is execute()
     */
    async execute() {

        if (!await this.isAuthorized()) {
            this.setResponse({ isSuccess: false, message: 'unauthorized' }, StatusCode.unauthorized);
            return;
        }

        const requestValidation = await this.isValidateRequestSchema();
        if (!requestValidation.isSuccess) {
            this.setResponse(requestValidation, StatusCode.badRequest);
            return;
        }

        const processRequest = await this.processRequest();
        this.setResponse(processRequest, processRequest.isSuccess ? StatusCode.ok : StatusCode.internalServerError);
    }
}