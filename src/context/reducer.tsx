import { Iproject } from './ProjectProvider';

export const PENDING_PROJECT = 'pending';
export const COMPLETE_PROJECT = 'completed';
export const ERROR_PROJECT = 'error';

export interface IState {
    loading: boolean;
    projects: Iproject[];
    error: any;
}

export const initState: IState = { loading: true, projects: [], error: '' };

export function reducer(state: any, action: any) {
    switch (action.type) {
        case PENDING_PROJECT:
            return { ...state, loading: true };
        case COMPLETE_PROJECT:
            return { ...state, projects: action.payload, loading: false };
        case ERROR_PROJECT:
            return { ...state, error: action.payload, loading: false };
        default:
            throw new Error();
    }
}
