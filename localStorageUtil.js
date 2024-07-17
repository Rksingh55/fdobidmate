const LOCAL_STORAGE_KEY = 'token';

export const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY);
        return token ? token.replace(/['"]/g, '') : null;
    }
    return null;
};

export const clearToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
};
