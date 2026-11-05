import type {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {errorToast, isErrorWithProperty} from '@/shared/utils';

export const handleError = (error: FetchBaseQueryError) => {
    switch (error.status) {
        case 'CUSTOM_ERROR':
        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'TIMEOUT_ERROR':
            errorToast(JSON.stringify(error.error))
            break

        case 404:
        case 401:
            if (isErrorWithProperty(error.data, 'status_message')) {
                errorToast(error.data.status_message)
            } else {
                errorToast(JSON.stringify(error.data))
            }
            break;

        default:
            if (error.status >= 500 && error.status < 600) {
                errorToast("Server error occurred. Please try again later.")
            } else {
                errorToast("Some error occurred")
            }
    }
}