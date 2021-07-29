import { Iproject } from './ProjectProvider';

export const PENDING_PROJECT = 'pending';
export const SUCCESS_PROJECT = 'success';
export const SUCCESS_PROJECT_FILTER = 'success_filter';
export const ERROR_PROJECT = 'error';
export const CLEAR_FILTER = 'clear_filter';

export interface IState {
    loading: boolean;
    projects: Iproject[];
    projectsFiltered: Iproject[];
    error: string;
}

type Action =
    | { type: typeof PENDING_PROJECT }
    | { type: typeof SUCCESS_PROJECT; payload: Iproject[] }
    | { type: typeof SUCCESS_PROJECT_FILTER; payload: Iproject[] }
    | { type: typeof CLEAR_FILTER }
    | { type: typeof ERROR_PROJECT; payload: string };

export const initState: IState = {
    loading: true,
    projects: [],
    projectsFiltered: [],
    error: ''
};

export function reducer(state: IState, action: Action) {
    switch (action.type) {
        case PENDING_PROJECT:
            return { ...state, loading: true };
        case SUCCESS_PROJECT:
            return { ...state, projects: action.payload, loading: false };
        case SUCCESS_PROJECT_FILTER:
            return { ...state, projectsFiltered: action.payload, loading: false };
        case CLEAR_FILTER:
            return { ...state, projectsFiltered: [] };
        case ERROR_PROJECT:
            return { ...state, error: action.payload, loading: false };
        default:
            throw new Error();
    }
}
