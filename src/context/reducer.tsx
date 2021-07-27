import {Iproject} from './ProjectProvider';

export const PENDING_PROJECT = 'pending';
export const COMPLETE_PROJECT = 'completed';
export const ERROR_PROJECT = 'error';

interface IinicialState {
    loading: boolean,
    projects: (Iproject)[];
}

export const initState: IinicialState = { loading: true, projects: [] }

export function reducer(state: any, action: any) {
    switch (action.type) {
        case PENDING_PROJECT:
            return { ...state, loading: true };
        case COMPLETE_PROJECT:
            return { ...state, projects: action.payload, loading: false };
        default:
            throw new Error();
    }
}
