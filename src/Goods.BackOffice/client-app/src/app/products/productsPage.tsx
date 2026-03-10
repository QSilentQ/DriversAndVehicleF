import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProductCategory } from '../../domain/products/enums/productCategory';
import { Product } from '../../domain/products/product';
import { ProductsProvider } from '../../domain/products/productsProvider';
import { Button } from '../../shared/components/buttons/button';
import { ConfirmModal } from '../../shared/components/modals/confirmModal';
import { Notification } from '../../shared/components/notification';
import { TablePagination } from '../../shared/components/tablePagination';
import { ConfirmModalState } from '../../shared/types/confirmModalState';
import { Pagination } from '../../tools/types/pagination';
import { ProductEditorModal } from './modals/productEditorModal';

type ProductEditorModalState = {
	productId: string | null;
	isOpen: boolean;
};

interface RemoveProductConfirmModalState extends ConfirmModalState {
	productId: string | null;
}

export function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [pagination, setPagination] = useState<Pagination>(Pagination.default);

	const [productEditorModalState, setProductEditorModalState] = useState<ProductEditorModalState>({
		productId: null,
		isOpen: false
	});
	const [removeProductConfirmModalState, setRemoveProductConfirmModalState] =
		useState<RemoveProductConfirmModalState>({ productId: null, ...ConfirmModalState.getClosed() });

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		loadProductsPage({ ...pagination });
	}, []);

	async function loadProductsPage(newPagination: Pagination) {
		const productsPage = await ProductsProvider.getProductsPage(newPagination.page, newPagination.countInPage);

		setProducts(productsPage.values);
		setPagination((pagination) => ({
			...pagination,
			page: newPagination.page,
			countInPage: newPagination.countInPage,
			totalRows: productsPage.totalRows
		}));
	}

	function changePage(page: number) {
		loadProductsPage({ ...pagination, page });
	}

	function changeCountInPage(countInPage: number) {
		loadProductsPage({ ...pagination, countInPage });
	}

	function openProductEditorModal(productId?: string) {
		setProductEditorModalState({ productId: productId ?? null, isOpen: true });
	}

	function closeProductEditorModal(isEdited: boolean) {
		if (isEdited) loadProductsPage({ ...pagination, page: 1 });
		setProductEditorModalState({ productId: null, isOpen: false });
	}

	function openRemoveProductConfirmModal(productId: string, productName: string) {
		setRemoveProductConfirmModalState({
			productId,
			...ConfirmModalState.getOpen(`Вы действительно хотите удалить продукт "${productName}"`)
		});
	}

	async function closeRemoveProductConfirmModal(isConfirmed: boolean) {
		if (isConfirmed) {
			if (removeProductConfirmModalState.productId == null) throw 'Cannot remove product with ProductId = null';

			const result = await ProductsProvider.markProductAsRemoved(removeProductConfirmModalState.productId);
			if (!result.isSuccess) {
				setErrorMessage(result.errors.map((error) => error.message).join('. '));
				return;
			}

			loadProductsPage({ ...pagination, page: 1 });
		}

		setRemoveProductConfirmModalState({ productId: null, ...ConfirmModalState.getClosed() });
	}

	return (
		<Container
			sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}
			maxWidth={false}
			disableGutters>
			<Paper
				elevation={3}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingX: '12px',
					paddingY: '6px'
				}}>
				<Typography variant='h6'>Продукты</Typography>
				<Button variant='add' title='Создать' onClick={() => openProductEditorModal()} />
			</Paper>
			<Paper elevation={3} sx={{ height: 'calc(100% - 52px)' }}>
				<TableContainer sx={{ height: 'inherit' }}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>Категория</TableCell>
								<TableCell>Название</TableCell>
								<TableCell>Описание</TableCell>
								<TableCell>Цена</TableCell>
								<TableCell>Управление</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.length === 0 && (
								<TableRow>
									<TableCell colSpan={5}>Пусто</TableCell>
								</TableRow>
							)}
							{products.map((product) => {
								return (
									<TableRow key={`product__${product.id}`}>
										<TableCell width='15%'>
											{ProductCategory.getDisplayName(product.category)}
										</TableCell>
										<TableCell width='20%'>{product.name}</TableCell>
										<TableCell width='40%'>{product.description ?? '—'}</TableCell>
										<TableCell width='15%'>{product.price}</TableCell>
										<TableCell>
											<Button
												type='icon'
												variant='edit'
												size='small'
												onClick={() => openProductEditorModal(product.id)}
											/>
											<Button
												type='icon'
												variant='remove'
												size='small'
												onClick={() => openRemoveProductConfirmModal(product.id, product.name)}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					countInPageOptions={Pagination.getPageSizeOptions()}
					page={pagination.page}
					countInPage={pagination.countInPage}
					totalRows={pagination.totalRows}
					changePage={(page) => changePage(page)}
					changeCountInPage={(countInPage) => changeCountInPage(countInPage)}
				/>
			</Paper>
			<ProductEditorModal
				productId={productEditorModalState.productId}
				onClose={closeProductEditorModal}
				isOpen={productEditorModalState.isOpen}
			/>
			<ConfirmModal
				title={removeProductConfirmModalState.title}
				onClose={(isConfirmed) => closeRemoveProductConfirmModal(isConfirmed)}
				isOpen={removeProductConfirmModalState.isOpen}
			/>
			{String.isNotNullOrWhitespace(errorMessage) && (
				<Notification severity='error' message={errorMessage} onClose={() => setErrorMessage(null)} />
			)}
		</Container>
	);
}
