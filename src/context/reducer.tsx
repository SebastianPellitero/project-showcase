import { Iresponse, IState } from 'src/types/interfaces';

export const PENDING_PROJECT = 'pending';
export const SUCCESS_PROJECT = 'success';
export const SUCCESS_PROJECT_FILTER = 'success_filter';
export const ERROR_PROJECT = 'error';
export const CLEAR_FILTER = 'clear_filter';

type Action =
	| { type: typeof PENDING_PROJECT }
	| { type: typeof SUCCESS_PROJECT; payload: Iresponse }
	| { type: typeof SUCCESS_PROJECT_FILTER; payload: Iresponse }
	| { type: typeof CLEAR_FILTER }
	| { type: typeof ERROR_PROJECT; payload: string };

export const initState: IState = {
	loading: true,
	projects: {
		data: [],
		paginationData: {
			totalItems: 0,
			apiPaginationPage: 1
		}
	},
	projectsFiltered: {
		data: [],
		paginationData: {
			totalItems: 0,
			apiPaginationPage: 1
		}
	},
	error: ''
};

export function reducer(state: IState, action: Action) {
	switch (action.type) {
		case PENDING_PROJECT:
			return { ...state, loading: true };
		case SUCCESS_PROJECT:
			return {
				...state,
				projects: {
					data: [
						...state.projects.data,
						...action.payload._embedded.edition
					],
					paginationData: {
						totalItems: action.payload.total,
						apiPaginationPage: action.payload.page
					}
				},
				loading: false
			};

		case SUCCESS_PROJECT_FILTER:
			return {
				...state,
				projectsFiltered: {
					data: [
						...state.projectsFiltered.data,
						...action.payload._embedded.edition
					],
					paginationData: {
						totalItems: action.payload.total,
						apiPaginationPage: action.payload.page
					}
				},
				loading: false
			};
		case CLEAR_FILTER:
			return {
				...state,
				projectsFiltered: {
					data: [],
					paginationData: {
						totalItems: 0,
						apiPaginationPage: 1
					}
				},
				loading: false
			};
		case ERROR_PROJECT:
			return { ...state, error: action.payload, loading: false };
		default:
			throw new Error();
	}
}
