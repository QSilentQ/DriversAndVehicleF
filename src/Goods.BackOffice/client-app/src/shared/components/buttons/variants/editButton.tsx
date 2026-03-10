import EditIcon from '@mui/icons-material/Edit';

import { Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { ButtonProps as DefaultProps } from '../button';

export interface Props extends DefaultProps {}

export function EditButton(props: Props) {
	switch (props.type) {
		case 'icon': {
			return (
				<Tooltip title={props.title ?? 'Изменить'} disableHoverListener={props.disableHoverListener}>
					<IconButton
						color={props.color}
						size={props.size}
						sx={props.sx}
						className={props.className}
						onClick={props.onClick}
						disabled={props.disabled}>
						<EditIcon color={props.color} fontSize={props.size} />
					</IconButton>
				</Tooltip>
			);
		}
		default: {
			return (
				<Button
					startIcon={<EditIcon fontSize={props.size} color={props.color} />}
					variant={props.formVariant ?? 'outlined'}
					size={props.size}
					color={props.color}
					sx={props.sx}
					className={props.className}
					onClick={props.onClick}
					disabled={props.disabled}>
					{props.title ?? 'Изменить'}
				</Button>
			);
		}
	}
}
