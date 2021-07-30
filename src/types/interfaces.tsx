export interface Iresponse {
	count: number;
	page: number;
	page_count: number;
	page_size: number;
	total: number;
	total_items: number;
	_embedded: any;
	_links: any;
}

export interface Iproject {
	[key: string]: any;
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
	projects: IProjects;
	projectsFiltered: IProjects;
	error: string;
}

export interface IPagination {
	start: number;
	end: number;
	pageNumber: number;
}

export interface IProjects {
	data: Array<Iproject>;
	paginationData: {
		totalItems: number;
		apiPaginationPage: number;
	};
}
