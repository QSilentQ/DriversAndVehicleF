export class Enum {
	public static getNumberValues<T>(enumObj: any): T[] {
		return Object.values(enumObj).filter((v) => typeof v === 'number') as T[];
	}
}
