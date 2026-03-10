import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './buttons/button';

interface Props {
	severity: 'success' | 'info' | 'warning' | 'error';
	message: string;
	onClose: () => void;
}

export function Notification(props: Props) {
	useEffect(() => {
		const timer = setTimeout(() => {
			props.onClose();
		}, 10000);

		return () => clearTimeout(timer);
	}, []);

	return createPortal(
		<Alert
			severity={props.severity}
			sx={(theme) => ({
				position: 'absolute',
				top: '16px',
				right: '16px',
				zIndex: theme.zIndex.modal + 1,
				display: 'flex',
				alignItems: 'center'
			})}>
			{props.message}
			<Button
				type='icon'
				variant='close'
				size='small'
				sx={{ marginLeft: '8px' }}
				onClick={() => props.onClose()}
				disableHoverListener
			/>
		</Alert>,
		document.body
	);
}
