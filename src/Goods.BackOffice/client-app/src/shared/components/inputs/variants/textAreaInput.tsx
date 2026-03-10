import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { InputProps } from '../input';

export interface Props extends InputProps {
	placeholder?: string;

	value: string | null;

	rows?: number;
	minRows?: number;
	maxRows?: number;

	onChange: (value: string | null) => void;

	required?: boolean;
}

export function TextAreaInput(props: Props) {
	function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
		let value: string | null = event.target.value;
		if (String.isNullOrWhitespace(value)) value = null;

		props.onChange(value);
	}

	return (
		<TextField
			label={props.title}
			placeholder={props.placeholder}
			sx={props.sx}
			className={props.className}
			size={props.size}
			value={props.value ?? ''}
			rows={props.rows}
			maxRows={props.maxRows}
			minRows={props.minRows}
			onChange={onChange}
			disabled={props.disabled}
			required={props.required}
			fullWidth
			multiline
		/>
	);
}
