import React, { useEffect, useState } from 'react';
import { Driver } from '../../../domain/drivers/driver';
import { DriversProvider } from '../../../domain/drivers/driversProvider';
import { Vehicle } from '../../../domain/vehicles/vehicle';
import { VehicleBlank } from '../../../domain/vehicles/vehicleBlank';
import { VehiclesProvider } from '../../../domain/vehicles/vehicleProvider';
import { VehicleCategory } from '../../../domain/vehicles/enums/vehicleCategory';
import { Button } from '../../../shared/components/buttons/button';
import { Input } from '../../../shared/components/inputs/input';
import { Modal } from '../../../shared/components/modals/modal';
import { Notification } from '../../../shared/components/notification';
import { Enum } from '../../../tools/types/enum';

interface Props {
	vehicleId: string | null;
	onClose: (isEdited: boolean) => void;
	isOpen: boolean;
}

function getDriverFio(d: Driver) {
	return [d.firstName, d.secondName, d.lastName].filter(Boolean).join(' ') || '—';
}

export function VehicleEditorModal(props: Props) {
	const [vehicleBlank, setVehicleBlank] = useState<VehicleBlank>(VehicleBlank.getDefault());
	const [drivers, setDrivers] = useState<Driver[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (!props.isOpen) return;

		async function loadVehicleBlank() {
			let vehicleBlank: VehicleBlank | null = null;

			if (props.vehicleId != null) {
				const vehicle: Vehicle | null = await VehiclesProvider.getVehicleById(props.vehicleId);
				if (vehicle == null) throw 'Vehicle is null';

				vehicleBlank = VehicleBlank.fromVehicle(vehicle);
			}

			const driversPage = await DriversProvider.getDriversPage(1, 500);
			setDrivers(driversPage.values);
			setVehicleBlank(vehicleBlank ?? VehicleBlank.getDefault());
		}

		loadVehicleBlank();

		return () => {
			setVehicleBlank(VehicleBlank.getDefault());
			setErrorMessage(null);
		};
	}, [props.isOpen, props.vehicleId]);

	const selectedDriver = drivers.find((d) => d.id === vehicleBlank.driverId) ?? null;

	async function saveVehicle() {
		const result = await VehiclesProvider.saveVehicle(vehicleBlank);
		if (!result.isSuccess) {
			setErrorMessage(result.getErrorString());
			return;
		}
		props.onClose(true);
	}

	return (
		<>
			<Modal onClose={() => props.onClose(false)} isOpen={props.isOpen}>
				<Modal.Header onClose={() => props.onClose(false)}>
					Редактор транспортного средства
				</Modal.Header>
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
						title='Выберите водителя'
						options={drivers}
						getOptionLabel={getDriverFio}
						isOptionEqualToValue={(a, b) => a.id === b.id}
						value={selectedDriver}
						onChange={(driver) =>
							setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, driverId: driver?.id ?? null }))
						}
						clearable
					/>
					<Input
						variant='text'
						title='Введите название'
						value={vehicleBlank.name}
						onChange={(name) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, name }))}
						required
					/>
					<Input
						variant='text'
						title='Введите гос. номер'
						value={vehicleBlank.stateNumber}
						onChange={(stateNumber) =>
							setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, stateNumber }))
						}
						required
					/>
					<Input
						variant='select'
						title='Выберите категорию ТС'
						options={Enum.getNumberValues<VehicleCategory>(VehicleCategory)}
						getOptionLabel={(option) => VehicleCategory.getDisplayName(option)}
						isOptionEqualToValue={(a, b) => a === b}
						value={vehicleBlank.vehicleCategory}
						onChange={(vehicleCategory) =>
							setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, vehicleCategory }))
						}
						required
					/>
					<Input
						variant='number'
						title='Введите среднюю скорость'
						value={vehicleBlank.averageSpeed}
						onChange={(averageSpeed) =>
							setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, averageSpeed }))
						}
						isAvailableFractionValue
						required
					/>
					<Input
						variant='number'
						title='Введите расход топлива'
						value={vehicleBlank.fuelConsumption}
						onChange={(fuelConsumption) =>
							setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, fuelConsumption }))
						}
						isAvailableFractionValue
						required
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='save' onClick={() => saveVehicle()} />
				</Modal.Footer>
			</Modal>
			{String.isNotNullOrWhitespace(errorMessage) && (
				<Notification severity='error' message={errorMessage} onClose={() => setErrorMessage(null)} />
			)}
		</>
	);
}
