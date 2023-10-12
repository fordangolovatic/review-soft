import {
    ApiOperationOptions,
    ApiResponseOptions,
    ApiBodyOptions,
    ApiQueryOptions,
    ApiOperation,
    ApiResponse,
    ApiSecurity,
    ApiBody,
    ApiQuery,
  } from '@nestjs/swagger';
  import { SecurityRequirementObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
  
  // Description swager decorator
  
  export interface SwaggerRouteDecoratorsOptions {
    apiOperationData?: ApiOperationOptions;
    apiResponseData?: ApiResponseOptions;
    apiSecurityData?: string | SecurityRequirementObject;
    apiBodyData?: ApiBodyOptions;
    apiQueryOptions?: ApiQueryOptions[] | ApiQueryOptions;
  }
  
  export function SwaggerRouteDecorator(opts: SwaggerRouteDecoratorsOptions) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      const map = {
        apiOperationData: ApiOperation,
        apiResponseData: ApiResponse,
        apiSecurityData: ApiSecurity,
        apiBodyData: ApiBody,
        apiQueryOptions: ApiQuery,
      };
      const decorators = [];
      for (const name of Object.keys(opts)) {
        const params = opts[name];
        if (params) {
          if (name == 'apiQueryOptions' && Array.isArray(params)) {
            for (const key of params) {
              decorators.push(map['apiQueryOptions'](key));
            }
          } else {
            decorators.push(map[name](params));
          }
        }
      }
  
      for (const key of decorators) {
        key(target, propertyKey, descriptor);
      }
    };
  }
  