import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { InputVariants, Props as InputVariantsProps } from './inputVariants';

export type InputProps = {
	title?: string;

	size?: 'small' | 'medium';

	className?: string;
	sx?: SxProps<Theme>;

	disabled?: boolean;
};

export function Input<T>(props: InputProps & InputVariantsProps<T>) {
	return <InputVariants {...props} />;
}
