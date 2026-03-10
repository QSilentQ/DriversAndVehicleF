import React, { useEffect, useState } from 'react';
import { Driver } from '../../../domain/drivers/driver';
import { DriverBlank } from '../../../domain/drivers/driverBlank';
import { DriversProvider } from '../../../domain/drivers/driversProvider';
import { DriverLicenseCategory } from '../../../domain/drivers/enums/driverLicenseCategory';
import { Gender } from '../../../domain/drivers/enums/gender';
import { Button } from '../../../shared/components/buttons/button';
import { Input } from '../../../shared/components/inputs/input';
import { Modal } from '../../../shared/components/modals/modal';
import { Notification } from '../../../shared/components/notification';
import { Enum } from '../../../tools/types/enum';
import CheckIcon from '@mui/icons-material/Check';
import { FormControl, InputLabel, ListItemIcon, MenuItem, Select } from '@mui/material';

interface Props {
	driverId: string | null;
	onClose: (isEdited: boolean) => void;
	isOpen: boolean;
}

function toDateValue(d: Date | null): string {
	if (!d) return '';
	const date = d instanceof Date ? d : new Date(d);
	return isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
}

function fromDateValue(s: string | null): Date | null {
	if (!s || !s.trim()) return null;
	const date = new Date(s);
	return isNaN(date.getTime()) ? null : date;
}

export function DriverEditorModal(props: Props) {
	const [driverBlank, setDriverBlank] = useState<DriverBlank>(DriverBlank.getDefault());
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (!props.isOpen) return;

		async function loadDriverBlank() {
			let driverBlank: DriverBlank | null = null;

			if (props.driverId != null) {
				const driver: Driver | null = await DriversProvider.getDriverById(props.driverId);
				if (driver == null) throw 'Driver is null';

				driverBlank = DriverBlank.fromDriver(driver);
			}

			setDriverBlank(driverBlank ?? DriverBlank.getDefault());
		}

		loadDriverBlank();

		return () => {
			setDriverBlank(DriverBlank.getDefault());
			setErrorMessage(null);
		};
	}, [props.isOpen, props.driverId]);

	async function saveDriver() {
		const result = await DriversProvider.saveDriver(driverBlank);
		if (!result.isSuccess) {
			setErrorMessage(result.getErrorString());
			return;
		}
		props.onClose(true);
	}

	return (
		<>
			<Modal onClose={() => props.onClose(false)} isOpen={props.isOpen}>
				<Modal.Header onClose={() => props.onClose(false)}>Редактор водителя</Modal.Header>
				<Modal.Body
					sx={{
						maxWidth: '800px',
						minWidth: '600px',
						display: 'flex',
						flexDirection: 'column',
						gap: '12px'
					}}>
					<Input
						variant='text'
						title='Введите фамилию'
						value={driverBlank.firstName}
						onChange={(firstName) => setDriverBlank((driverBlank) => ({ ...driverBlank, firstName }))}
						required
					/>
					<Input
						variant='text'
						title='Введите имя'
						value={driverBlank.secondName}
						onChange={(secondName) => setDriverBlank((driverBlank) => ({ ...driverBlank, secondName }))}
						required
					/>
					<Input
						variant='text'
						title='Введите отчество'
						value={driverBlank.lastName}
						onChange={(lastName) =>
							setDriverBlank((driverBlank) => ({ ...driverBlank, lastName }))
						}
					/>
					<Input
						variant='select'
						title='Выберите пол'
						options={Enum.getNumberValues<Gender>(Gender)}
						getOptionLabel={(option) => Gender.getDisplayName(option)}
						isOptionEqualToValue={(a, b) => a === b}
						value={driverBlank.gender}
						onChange={(gender) => setDriverBlank((driverBlank) => ({ ...driverBlank, gender }))}
						required
					/>
					<FormControl fullWidth required size='medium'>
						<InputLabel id='driver-license-category-label'>Выберите категорию прав</InputLabel>
						<Select
							multiple
							labelId='driver-license-category-label'
							value={driverBlank.driverLicenseCategory ?? []}
							label='Выберите категорию прав'
							onChange={(e) =>
								setDriverBlank((prev) => ({
									...prev,
									driverLicenseCategory: [...(e.target.value as DriverLicenseCategory[])]
								}))
							}
							renderValue={(selected: DriverLicenseCategory[]) =>
								selected.map((c) => DriverLicenseCategory.getDisplayName(c)).join(', ')
							}>
							{Enum.getNumberValues<DriverLicenseCategory>(DriverLicenseCategory).map((category) => (
								<MenuItem key={category} value={category}>
									{driverBlank.driverLicenseCategory?.includes(category) ? (
										<ListItemIcon sx={{ minWidth: 36 }}>
											<CheckIcon fontSize='small' />
										</ListItemIcon>
									) : (
										<ListItemIcon sx={{ minWidth: 36 }} />
									)}
									{DriverLicenseCategory.getDisplayName(category)}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Input
						title='Дата рождения'
						variant='date'
						value={toDateValue(driverBlank.birthday)}
						onChange={(value) =>
							setDriverBlank((driverBlank) => ({
								...driverBlank,
								birthday: fromDateValue(value)
							}))
						}
						required
					/>
					<Input
						title='Дата начала стажа'
						variant='date'
						value={toDateValue(driverBlank.experience)}
						onChange={(value) =>
							setDriverBlank((driverBlank) => ({
								...driverBlank,
								experience: fromDateValue(value)
							}))
						}
						required
					/>
					<Input
						variant='number'
						title='Введите оплату за час'
						value={driverBlank.payPerHour}
						onChange={(payPerHour) =>
							setDriverBlank((driverBlank) => ({ ...driverBlank, payPerHour }))
						}
						isAvailableFractionValue
						required
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='save' onClick={() => saveDriver()} />
				</Modal.Footer>
			</Modal>
			{String.isNotNullOrWhitespace(errorMessage) && (
				<Notification severity='error' message={errorMessage} onClose={() => setErrorMessage(null)} />
			)}
		</>
	);
}
