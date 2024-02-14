import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const ctx = host.switchToHttp();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message = exceptionResponse['message'] ? exceptionResponse['message'] : message;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        const responseBody = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, status);
    }
}
