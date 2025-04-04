import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

const getErrorMessage = (error: ValidationError[], existingMessage): string => {
    return error.map((error: ValidationError) => {
        if (error.constraints) {
            return existingMessage + Object.values(error.constraints).join(', ');
        } else if (error.children) {
            return getErrorMessage(error.children, existingMessage);
        } else {
            return '';
        }
    }).join(', ');
};

const validationMiddleware = (
    type: any,
    value: string | 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true
): RequestHandler => {
    return (req, res, next) => {
        validate(plainToInstance(type, req[value]), {
            skipMissingProperties,
            whitelist,
            forbidNonWhitelisted
        }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const errorMessage = getErrorMessage(errors, '');
                res.status(400).json({ error: errorMessage });
            } else {
                next();
            }
        });
    };
};

export default validationMiddleware;
