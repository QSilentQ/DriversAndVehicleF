import { Box, TablePagination as MuiTablePagination } from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
	countInPageOptions: number[];

	page: number;
	countInPage: number;
	totalRows: number;

	changePage: (page: number) => void;
	changeCountInPage: (rowsPerPage: number) => void;
}

export function TablePagination(props: Props) {
	const page = useMemo(() => {
		if (props.page <= 0) return 0;
		return props.page - 1;
	}, [props.page]);

	function onChangePage(_: React.MouseEvent<HTMLButtonElement> | null, page: number) {
		props.changePage(page + 1);
	}

	function onChangeCountInPage(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
		const countInPage = +event.target.value;
		props.changeCountInPage(countInPage);
	}

	return (
		<MuiTablePagination
			component={Box}
			page={page}
			rowsPerPage={props.countInPage}
			rowsPerPageOptions={props.countInPageOptions}
			count={props.totalRows}
			labelDisplayedRows={() => `Страница ${props.page}`}
			onPageChange={onChangePage}
			onRowsPerPageChange={onChangeCountInPage}
		/>
	);
}
