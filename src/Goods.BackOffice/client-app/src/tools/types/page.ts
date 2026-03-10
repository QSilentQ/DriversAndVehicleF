export class Page<T> {
	constructor(public values: T[], public totalRows: number) {}

	static get default() {
		return new Page([], 0);
	}

	static convert<T>(data: any, func: (any: any) => T) {
		return new Page<T>((data.values as any[]).map(func), data.totalRows);
	}
}
