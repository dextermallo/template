import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ServerlessAPIOperationService, ServiceResponseFunc, APIOperation } from '../model';


/**
 * @description this is a sample about using ServerlessAPIOperationService, for more information, see the class desc.
 */
class UserPreferencesRestAPI extends ServerlessAPIOperationService { 
    /**
     * you can design a shared validation for apiOperationMap
     */
    baseValidationFn: ServiceResponseFunc = () => {
        if (!this.request.body['id']) {
            return { isSuccess: false, message: 'id is empty' };
        }
        return { isSuccess: true };
    }

    apiOperationMap: Partial<Record<APIOperation, {
        processing: ServiceResponseFunc,
        validation?: ServiceResponseFunc
    }>> = {
        create: {
            processing: async () => { return { isSuccess: true, message: 'success create' }; },
        },
        retrieve: {
            processing: async () => { return { isSuccess: true, message: 'success retrieve' }; },
            validation: this.baseValidationFn,
        },
        update: {
            processing: async () => { return { isSuccess: true, message: 'success update' }; },
            validation: this.baseValidationFn,
        },
        delete: {
            processing: async () => { return { isSuccess: true, message: 'success delete' }; },
            validation: this.baseValidationFn,
        }

    };
}

const trigger: AzureFunction = async function (context: Context, request: HttpRequest): Promise<void> {
    const _ = await new UserPreferencesRestAPI(request, context).execute();
    context.done();
};

export { trigger };