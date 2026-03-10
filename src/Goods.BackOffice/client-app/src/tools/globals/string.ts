export {};

declare global {
	interface StringConstructor {
		isNullOrEmpty(str: string | null | undefined): str is null | undefined;
		isNullOrWhitespace(str: string | null | undefined): str is null | undefined;

		isNotNullOrEmpty(str: string | null | undefined): str is string;
		isNotNullOrWhitespace(str: string | null | undefined): str is string;
	}
}

String.isNullOrEmpty = function (str: string | null | undefined): str is null | undefined {
	return !str;
};

String.isNullOrWhitespace = function (str: string | null | undefined): str is null | undefined {
	return !str || str.trim().length == 0;
};

String.isNotNullOrEmpty = function (str: string | null | undefined): str is string {
	return !String.isNullOrEmpty(str);
};

String.isNotNullOrWhitespace = function (str: string | null | undefined): str is string {
	return !String.isNullOrWhitespace(str);
};
