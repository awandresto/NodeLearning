export const ErrorMessage = {
    errorCreatingUser: 'Error creating new user',
    errorRegisteringUser: 'Error registering new user',
    errorUpdatingUser: 'Error updating user',
    errorInvalidCredentials: 'Invalid email or password',
};

export enum ErrorCodes {
    UNAUTHORIZED = 'UNAUTHORIZED',
    GENERAL_ERROR = 'GENERAL_ERROR',
    MISSING_DATA = 'MISSING_DATA',
    BANK_ERROR = 'BANK_ERROR'
}