import { Iproject } from './ProjectProvider';

export const PENDING_PROJECT = 'pending';
export const COMPLETE_PROJECT = 'completed';
export const ERROR_PROJECT = 'error';

export interface IState {
    loading: boolean;
    projects: Iproject[];
    error: string;
}

type Action =
    | { type: typeof PENDING_PROJECT }
    | { type: typeof COMPLETE_PROJECT; payload: Iproject[] }
    | { type: typeof ERROR_PROJECT; payload: string };

export const initState: IState = { loading: true, projects: [], error: '' };

export function reducer(state: IState, action: Action) {
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
