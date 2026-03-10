export type ConfirmModalState = {
	title: string;
	isOpen: boolean;
};

export namespace ConfirmModalState {
	export function getClosed(): ConfirmModalState {
		return {
			title: '',
			isOpen: false
		};
	}

	export function getOpen(title: string): ConfirmModalState {
		return {
			title,
			isOpen: true
		};
	}
}
