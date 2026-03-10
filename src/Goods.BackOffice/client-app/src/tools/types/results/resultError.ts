export class ResultError {
	constructor(public key: string | null, public message: string) {}

	static get(message: string): ResultError {
		return new ResultError(null, message);
	}
}

export function mapToResultErrors(data: any[]): ResultError[] {
	return data.map(mapToResultError);
}

export function mapToResultError(data: any): ResultError {
	return new ResultError(data.key ?? null, data.message);
}
