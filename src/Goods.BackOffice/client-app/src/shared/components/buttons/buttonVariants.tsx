import React from 'react';
import { AddButton, Props as AddButtonProps } from './variants/addButton';
import { CloseButton, Props as CloseButtonProps } from './variants/closeButton';
import { ConfirmButton, Props as ConfirmButtonProps } from './variants/confirmButton';
import { EditButton, Props as EditButtonProps } from './variants/editButton';
import { RemoveButton, Props as RemoveButtonProps } from './variants/removeButton';
import { SaveButton, Props as SaveButtonProps } from './variants/saveButton';

type AddButtonVariant = { variant: 'add' } & AddButtonProps;
type CloseButtonVariant = { variant: 'close' } & CloseButtonProps;
type ConfirmButtonVariant = { variant: 'confirm' } & ConfirmButtonProps;
type EditButtonVariant = { variant: 'edit' } & EditButtonProps;
type RemoveButtonVariant = { variant: 'remove' } & RemoveButtonProps;
type SaveButtonVariant = { variant: 'save' } & SaveButtonProps;

export type Props =
	| AddButtonVariant
	| CloseButtonVariant
	| ConfirmButtonVariant
	| EditButtonVariant
	| RemoveButtonVariant
	| SaveButtonVariant;

export function ButtonVariants(props: Props) {
	switch (props.variant) {
		case 'add':
			return <AddButton {...props} />;
		case 'close':
			return <CloseButton {...props} />;
		case 'confirm':
			return <ConfirmButton {...props} />;
		case 'edit':
			return <EditButton {...props} />;
		case 'remove':
			return <RemoveButton {...props} />;
		case 'save':
			return <SaveButton {...props} />;
	}
}
