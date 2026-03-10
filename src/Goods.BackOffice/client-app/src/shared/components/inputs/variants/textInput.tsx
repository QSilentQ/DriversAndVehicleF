import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { InputProps as DefaultProps } from '../input';

export interface Props extends DefaultProps {
	placeholder?: string;

	inputType?: 'text' | 'date' | 'password';

	value: string | null;
	onChange: (value: string | null) => void;

	required?: boolean;
}

export function TextInput(props: Props) {
	function onChange(event: ChangeEvent<HTMLInputElement>) {
		let value: string | null = event.target.value;
		if (String.isNullOrWhitespace(value)) value = null;

		props.onChange(value);
	}

	return (
		<TextField
			type={props.inputType ?? 'text'}
			label={props.title}
			placeholder={props.placeholder}
			className={props.className}
			size={props.size}
			sx={props.sx}
			value={props.value ?? ''}
			onChange={onChange}
			required={props.required}
			disabled={props.disabled}
			fullWidth
			slotProps={props.inputType === 'date' ? { inputLabel: { shrink: true } } : undefined}
		/>
	);
}
