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
import { Driver } from '../../domain/drivers/driver';
import { DriversProvider } from '../../domain/drivers/driversProvider';
import { DriverLicenseCategory } from '../../domain/drivers/enums/driverLicenseCategory';
import { Gender } from '../../domain/drivers/enums/gender';
import { Button } from '../../shared/components/buttons/button';
import { ConfirmModal } from '../../shared/components/modals/confirmModal';
import { Notification } from '../../shared/components/notification';
import { TablePagination } from '../../shared/components/tablePagination';
import { ConfirmModalState } from '../../shared/types/confirmModalState';
import { Pagination } from '../../tools/types/pagination';
import { DriverEditorModal } from './modals/driverEditorModal';

type DriverEditorModalState = {
	driverId: string | null;
	isOpen: boolean;
};

interface RemoveDriverConfirmModalState extends ConfirmModalState {
	driverId: string | null;
}

function formatDate(d: Date): string {
	const x = d instanceof Date ? d : new Date(d);
	return isNaN(x.getTime()) ? '—' : x.toLocaleDateString('ru-RU');
}

export function DriversPage() {
	const [drivers, setDrivers] = useState<Driver[]>([]);
	const [assignedDriverIds, setAssignedDriverIds] = useState<Set<string>>(new Set());
	const [pagination, setPagination] = useState<Pagination>(Pagination.default);

	const [driverEditorModalState, setDriverEditorModalState] = useState<DriverEditorModalState>({
		driverId: null,
		isOpen: false
	});
	const [removeDriverConfirmModalState, setRemoveDriverConfirmModalState] =
		useState<RemoveDriverConfirmModalState>({ driverId: null, ...ConfirmModalState.getClosed() });

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		loadDriversPage({ ...pagination });
	}, []);

	async function loadDriversPage(newPagination: Pagination) {
		const [driversPage, ids] = await Promise.all([
			DriversProvider.getDriversPage(newPagination.page, newPagination.countInPage),
			DriversProvider.getAssignedDriverIds()
		]);

		setDrivers(driversPage.values);
		setAssignedDriverIds(new Set(ids));
		setPagination((pagination) => ({
			...pagination,
			page: newPagination.page,
			countInPage: newPagination.countInPage,
			totalRows: driversPage.totalRows
		}));
	}

	function changePage(page: number) {
		loadDriversPage({ ...pagination, page });
	}

	function changeCountInPage(countInPage: number) {
		loadDriversPage({ ...pagination, countInPage });
	}

	function openDriverEditorModal(driverId?: string) {
		setDriverEditorModalState({ driverId: driverId ?? null, isOpen: true });
	}

	function closeDriverEditorModal(isEdited: boolean) {
		if (isEdited) loadDriversPage({ ...pagination, page: 1 });
		setDriverEditorModalState({ driverId: null, isOpen: false });
	}

	function getDriverFio(d: Driver) {
		return [d.firstName, d.secondName, d.lastName].filter(Boolean).join(' ') || '—';
	}

	function openRemoveDriverConfirmModal(driverId: string, fio: string) {
		setRemoveDriverConfirmModalState({
			driverId,
			...ConfirmModalState.getOpen(`Вы действительно хотите удалить водителя "${fio}"?`)
		});
	}

	function calculateDriverExperience(experience: Date) {
		const diffMs = new Date().getTime() - new Date(experience).getTime();
		const years = diffMs / (365 * 24 * 60 * 60 * 1000);
		return Math.floor(years);
	}

	async function closeRemoveDriverConfirmModal(isConfirmed: boolean) {
		if (isConfirmed) {
			if (removeDriverConfirmModalState.driverId == null) throw 'Cannot remove driver with DriverId = null';

			const result = await DriversProvider.markDriverAsRemoved(removeDriverConfirmModalState.driverId);
			if (!result.isSuccess) {
				setErrorMessage(result.errors.map((error) => error.message).join('. '));
				return;
			}

			loadDriversPage({ ...pagination, page: 1 });
		}

		setRemoveDriverConfirmModalState({ driverId: null, ...ConfirmModalState.getClosed() });
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
				<Typography variant='h6'>Водители</Typography>
				<Button variant='add' title='Создать' onClick={() => openDriverEditorModal()} />
			</Paper>
			<Paper elevation={3} sx={{ height: 'calc(100% - 52px)' }}>
				<TableContainer sx={{ height: 'inherit' }}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>ФИО</TableCell>
								<TableCell>Пол</TableCell>
								<TableCell>Категория прав</TableCell>
								<TableCell>Дата рождения</TableCell>
								<TableCell>Стаж, лет</TableCell>
								<TableCell>Оплата/час</TableCell>
								<TableCell>Статус</TableCell>
								<TableCell>Управление</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{drivers.length === 0 && (
								<TableRow>
									<TableCell colSpan={8}>Пусто</TableCell>
								</TableRow>
							)}
							{drivers.map((driver) => {
								return (
									<TableRow key={`driver__${driver.id}`}>
										<TableCell width='20%'>{getDriverFio(driver)}</TableCell>
										<TableCell width='10%'>
											{driver.gender != null ? Gender.getDisplayName(driver.gender) : '—'}
										</TableCell>
										<TableCell width='22%'>
											{driver.driverLicenseCategory?.length
												? driver.driverLicenseCategory
														.map((c) => DriverLicenseCategory.getDisplayName(c))
														.join(', ')
												: '—'}
										</TableCell>
										<TableCell width='12%'>{formatDate(driver.birthday)}</TableCell>
										<TableCell width='12%'>{calculateDriverExperience(driver.experience)}</TableCell>
										<TableCell width='12%'>{driver.payPerHour ?? '—'}</TableCell>
										<TableCell width='10%'>
											{assignedDriverIds.has(driver.id) ? 'За рулём' : 'В отпуске'}
										</TableCell>
										<TableCell width='12%'>
											<Button
												type='icon'
												variant='edit'
												size='small'
												onClick={() => openDriverEditorModal(driver.id)}
											/>
											<Button
												type='icon'
												variant='remove'
												size='small'
												onClick={() => openRemoveDriverConfirmModal(driver.id, getDriverFio(driver))}
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
			<DriverEditorModal
				driverId={driverEditorModalState.driverId}
				onClose={closeDriverEditorModal}
				isOpen={driverEditorModalState.isOpen}
			/>
			<ConfirmModal
				title={removeDriverConfirmModalState.title}
				onClose={(isConfirmed) => closeRemoveDriverConfirmModal(isConfirmed)}
				isOpen={removeDriverConfirmModalState.isOpen}
			/>
			{String.isNotNullOrWhitespace(errorMessage) && (
				<Notification severity='error' message={errorMessage} onClose={() => setErrorMessage(null)} />
			)}
		</Container>
	);
}
