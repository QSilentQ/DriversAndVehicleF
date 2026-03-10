import React from 'react';
import { Button } from '../buttons/button';
import { Modal } from './modal';

interface Props {
	title: string;
	onClose: (isConfirmed: boolean) => void;
	isOpen: boolean;
}

export function ConfirmModal(props: Props) {
	return (
		<Modal onClose={() => props.onClose(false)} isOpen={props.isOpen}>
			<Modal.Header onClose={() => props.onClose(false)}>{props.title}</Modal.Header>
			<Modal.Footer>
				<Button variant='confirm' title='Да' onClick={() => props.onClose(true)} />
				<Button variant='close' title='Нет' onClick={() => props.onClose(false)} />
			</Modal.Footer>
		</Modal>
	);
}
