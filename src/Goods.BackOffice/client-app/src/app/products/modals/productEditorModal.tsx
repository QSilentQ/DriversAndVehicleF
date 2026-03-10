import React, { useEffect, useState } from 'react';
import { ProductCategory } from '../../../domain/products/enums/productCategory';
import { Product } from '../../../domain/products/product';
import { ProductBlank } from '../../../domain/products/productBlank';
import { ProductsProvider } from '../../../domain/products/productsProvider';
import { Button } from '../../../shared/components/buttons/button';
import { Input } from '../../../shared/components/inputs/input';
import { Modal } from '../../../shared/components/modals/modal';
import { Notification } from '../../../shared/components/notification';
import { Enum } from '../../../tools/types/enum';

interface Props {
	productId: string | null;
	onClose: (isEdited: boolean) => void;
	isOpen: boolean;
}

export function ProductEditorModal(props: Props) {
	const [productBlank, setProductBlank] = useState<ProductBlank>(ProductBlank.getDefault());
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (!props.isOpen) return;

		async function loadProductBlank() {
			let productBlank: ProductBlank | null = null;

			if (props.productId != null) {
				const product: Product | null = await ProductsProvider.getProductById(props.productId);
				if (product == null) throw 'Product is null';

				productBlank = ProductBlank.fromProduct(product);
			}

			setProductBlank(productBlank ?? ProductBlank.getDefault());
		}

		loadProductBlank();

		return () => {
			setProductBlank(ProductBlank.getDefault());
			setErrorMessage(null);
		};
	}, [props.isOpen, props.productId]);

	async function saveProduct() {
		const result = await ProductsProvider.saveProduct(productBlank);
		if (!result.isSuccess) {
			setErrorMessage(result.getErrorString());
			return;
		}

		props.onClose(true);
	}

	return (
		<>
			<Modal onClose={() => props.onClose(false)} isOpen={props.isOpen}>
				<Modal.Header onClose={() => props.onClose(false)}>Редактор продукта</Modal.Header>
				<Modal.Body
					sx={{
						maxWidth: '800px',
						minWidth: '600px',
						display: 'flex',
						flexDirection: 'column',
						gap: '12px'
					}}>
					<Input
						variant='select'
						title='Выберите категорию'
						options={Enum.getNumberValues<ProductCategory>(ProductCategory)}
						getOptionLabel={(option) => ProductCategory.getDisplayName(option)}
						isOptionEqualToValue={(a, b) => a === b}
						value={productBlank.category}
						onChange={(category) => setProductBlank((productBlank) => ({ ...productBlank, category }))}
						required
					/>
					<Input
						variant='text'
						title='Введите название'
						value={productBlank.name}
						onChange={(name) => setProductBlank((productBlank) => ({ ...productBlank, name }))}
						required
					/>
					<Input
						variant='text-area'
						title='Введите описание'
						minRows={2}
						value={productBlank.description}
						onChange={(description) =>
							setProductBlank((productBlank) => ({ ...productBlank, description }))
						}
					/>
					<Input
						variant='number'
						title='Введите цену'
						value={productBlank.price}
						onChange={(price) => setProductBlank((productBlank) => ({ ...productBlank, price }))}
						isAvailableFractionValue
						required
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='save' onClick={() => saveProduct()} />
				</Modal.Footer>
			</Modal>
			{String.isNotNullOrWhitespace(errorMessage) && (
				<Notification severity='error' message={errorMessage} onClose={() => setErrorMessage(null)} />
			)}
		</>
	);
}
