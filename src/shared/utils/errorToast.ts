import toast from 'react-hot-toast';

export const errorToast = (message: string, error?: unknown) => {
    toast.error(message, { style: {
            borderRadius: '40px',
        },})

    if (error) {
        console.error(`${message}\n`, error)
    }
}