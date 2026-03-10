import DeleteIcon from '@mui/icons-material/Delete';

import { Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { ButtonProps as DefaultProps } from '../button';

export interface Props extends DefaultProps {}

export function RemoveButton(props: Props) {
	switch (props.type) {
		case 'icon': {
			return (
				<Tooltip title={props.title ?? 'Удалить'} disableHoverListener={props.disableHoverListener}>
					<IconButton
						color={props.color}
						size={props.size}
						sx={props.sx}
						className={props.className}
						onClick={props.onClick}
						disabled={props.disabled}>
						<DeleteIcon
							color={props.disabled ? 'disabled' : props.color ?? 'error'}
							fontSize={props.size}
						/>
					</IconButton>
				</Tooltip>
			);
		}
		default: {
			return (
				<Button
					startIcon={
						<DeleteIcon
							fontSize={props.size}
							color={props.disabled ? 'disabled' : props.color ?? 'error'}
						/>
					}
					variant={props.formVariant ?? 'outlined'}
					size={props.size}
					color={props.color ?? 'error'}
					sx={props.sx}
					className={props.className}
					onClick={props.onClick}
					disabled={props.disabled}>
					{props.title ?? 'Удалить'}
				</Button>
			);
		}
	}
}
