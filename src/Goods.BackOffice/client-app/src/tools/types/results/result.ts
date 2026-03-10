import { mapToResultErrors, ResultError } from './resultError';

export class Result {
	public isSuccess = this.errors.length === 0;

	constructor(public readonly errors: ResultError[]) {}

	getErrorString = () => this.errors.map((error) => error.message).join('. ');

	static get(data: any): Result {
		return new Result(mapToResultErrors(data.errors));
	}
}
