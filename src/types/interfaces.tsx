export interface Iproject {
   [key:string]: any,
    name: string;
    identifier: string;
    published_on?: null;
    affected_on: string;
    first_published_on?: null;
    status: string;
    has_header?: null;
    options: any;
    level: string;
    category: string;
    is_starred?: null;
    screenshot_store: string;
    id: number;
    created_on: string;
    modified_on: string;
    _embedded: any;
    _links: any;
 }

 export interface Ifilter {
    field: string;
    type: string;
    value: string;
 }

 export interface IState {
	loading: boolean;
	projects: Iproject[];
	projectsFiltered: Iproject[];
	error: string;
	paginationData: any;
}

export interface IPagination {
   start: number, end: number, pageNumber: number
}