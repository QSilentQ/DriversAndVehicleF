import { Box, Dialog, DialogActions, DialogContent, DialogTitle, SxProps, Theme } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { SxPropsUtils } from '../../../tools/utils/sxPropsUtils';
import { Button } from '../buttons/button';

interface Props {
	sx?: SxProps<Theme>;
	className?: string;
}

interface ModalProps {
	onClose?: () => void;
	isOpen: boolean;
}

interface ModalHeaderProps {
	onClose?: () => void;
}

export function Modal(props: PropsWithChildren<Props & ModalProps>) {
	return (
		<Dialog className={props.className} sx={props.sx} onClose={props.onClose} open={props.isOpen} maxWidth={false}>
			{props.children}
		</Dialog>
	);
}

Modal.Header = (props: PropsWithChildren<Props & ModalHeaderProps>) => {
	return (
		<DialogTitle
			className={props.className}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: '12px',
				paddingBottom: '8px',
				...SxPropsUtils.prepareToCopy(props.sx)
			}}>
			{props.children}
			{props.onClose !== undefined && (
				<Button variant='close' type='icon' sx={{ marginRight: '-8px' }} onClick={props.onClose} />
			)}
		</DialogTitle>
	);
};

Modal.Body = (props: PropsWithChildren<Props>) => {
	return (
		<DialogContent className={props.className} sx={{ '&.MuiDialogContent-root': { paddingY: '8px' } }}>
			<Box sx={props.sx}>{props.children}</Box>
		</DialogContent>
	);
};

Modal.Footer = (props: PropsWithChildren<Props>) => {
	return (
		<DialogActions className={props.className} sx={props.sx}>
			{props.children}
		</DialogActions>
	);
};
