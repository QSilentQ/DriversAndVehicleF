import AddIcon from '@mui/icons-material/Add';

import { Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { ButtonProps as DefaultProps } from '../button';

export interface Props extends DefaultProps {}

export function AddButton(props: Props) {
	switch (props.type) {
		case 'icon': {
			return (
				<Tooltip title={props.title ?? 'Создать'} disableHoverListener={props.disableHoverListener}>
					<IconButton
						color={props.color ?? 'success'}
						size={props.size}
						sx={props.sx}
						className={props.className}
						onClick={props.onClick}
						disabled={props.disabled}>
						<AddIcon color={props.color ?? 'success'} fontSize={props.size} />
					</IconButton>
				</Tooltip>
			);
		}
		default: {
			return (
				<Button
					startIcon={<AddIcon fontSize={props.size} color={props.color ?? 'success'} />}
					variant={props.formVariant ?? 'outlined'}
					size={props.size}
					color={props.color ?? 'success'}
					sx={props.sx}
					className={props.className}
					onClick={props.onClick}
					disabled={props.disabled}>
					{props.title ?? 'Создать'}
				</Button>
			);
		}
	}
}
