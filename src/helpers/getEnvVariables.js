

export const getEnvVariables = () => {

    import.meta.env

    return {
        VITE_MODE: import.meta.VITE_MODE,
        ...import.meta.env
    }
}