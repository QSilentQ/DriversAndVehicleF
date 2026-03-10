import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { ButtonVariants, Props as ButtonVariantsProps } from './buttonVariants';

export interface ButtonProps {
	title?: string;

	type?: 'default' | 'icon';

	size?: 'small' | 'medium' | 'large';
	formVariant?: 'text' | 'contained' | 'outlined';
	color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

	sx?: SxProps<Theme>;
	className?: string;

	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

	disabled?: boolean;
	disableHoverListener?: boolean;
}

export function Button(props: ButtonProps & ButtonVariantsProps) {
	return <ButtonVariants {...props} />;
}
