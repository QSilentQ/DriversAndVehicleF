import React from 'react';
import { NumberInput, Props as NumberInputProps } from './variants/numberInput';
import { Select, Props as SelectProps } from './variants/select';
import { TextAreaInput, Props as TextAreaInputProps } from './variants/textAreaInput';
import { TextInput, Props as TextInputProps } from './variants/textInput';

type NumberInputVariant = { variant: 'number' } & NumberInputProps;
type SelectVariant<T> = { variant: 'select' } & SelectProps<T>;
type TextAreaInputVariant = { variant: 'text-area' } & TextAreaInputProps;
type TextInputVariant = { variant: 'text' } & TextInputProps;
type PasswordInputVariant = { variant: 'password' } & TextInputProps;
type DateInputVariant = { variant: 'date' } & TextInputProps;

export type Props<T> =
	| TextInputVariant
	| TextAreaInputVariant
	| PasswordInputVariant
	| NumberInputVariant
	| SelectVariant<T>
	| DateInputVariant;

export function InputVariants<T>(props: Props<T>) {
	switch (props.variant) {
		case 'text':
			return <TextInput {...props} />;
		case 'text-area':
			return <TextAreaInput {...props} />;
		case 'password':
			return <TextInput {...props} inputType="password" />;
		case 'number':
			return <NumberInput {...props} />;
		case 'select':
			return <Select {...props} />;
		case 'date':
			return <TextInput {...props} inputType="date" />;
	}
}
