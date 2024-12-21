export const catchReject = async <T, E extends Error = Error>(fn: () => Promise<T>): Promise<[T, null] | [null, E]> => {
    try { return [await fn(), null] } catch (error) { return [null, error as E] }
};

export const catchError = <T, E extends Error = Error>(fn: () => T): [T, null] | [null, E] => {
    try { return [fn(), null] } catch (error) { return [null, error as E] }
};