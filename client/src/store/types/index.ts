export enum IStatus {
    idle = 0,
    running = 1,
    success = 2,
    error = 3
}

export interface IRequestStatus<T> {
    data: T | null;
    status: IStatus;
    error: null | string;
}