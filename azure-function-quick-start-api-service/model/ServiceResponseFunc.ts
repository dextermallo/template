import { ServiceResponse } from '.';

/**
 * @description serviceResponseFunc indicates a function that will return serviceResponse for both sync and async.
 */
export type ServiceResponseFunc = () => ServiceResponse | Promise<ServiceResponse>;