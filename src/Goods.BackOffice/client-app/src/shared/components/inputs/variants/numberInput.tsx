import { TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { InputProps } from '../input';

export interface Props extends InputProps {
	placeholder?: string;

	min?: number;
	max?: number;
	step?: number;

	value: number | null;
	onChange: (value: number | null) => void;

	isAvailableFractionValue?: boolean;
	required?: boolean;
}

export function NumberInput(props: Props) {
	let prevProps = useRef<Props>(props);

	useEffect(() => {
		if (props.min != null && props.max != null && props.min >= props.max)
			throw 'Некорректное значение min или max!';

		let value = prevProps.current.value;

		if (prevProps.current.value !== null && value !== null) {
			if (props.min != null && prevProps.current.value < props.min) value = props.min;
			if (props.max != null && prevProps.current.value > props.max) value = props.max;
			if (
				props.step != null &&
				prevProps.current.step != null &&
				getNumberDecimalPlaces(props.step) < getNumberDecimalPlaces(prevProps.current.step)
			)
				value = parseFloat(value.toFixed(getNumberDecimalPlaces(props.step)));
			if (!props.isAvailableFractionValue) value = Math.floor(value);
		}
		if (value !== prevProps.current.value) props.onChange(value);
	}, [props.min, props.max, props.step, props.isAvailableFractionValue, props.onChange]);

	function getNumberDecimalPlaces(value: number) {
		let strArray = value.toString().replace(',', '.').split('.');

		return strArray.length > 1 ? strArray[1].length : 0;
	}

	function onChange(event: ChangeEvent<HTMLInputElement>) {
		let inputValue = event.currentTarget.value;

		if (String.isNullOrWhitespace(inputValue)) return props.onChange(null);

		let value = props.isAvailableFractionValue ? parseFloat(inputValue) : parseInt(inputValue);

		if (isNaN(value)) return props.onChange(null);
		if (props.min != null && value < props.min) return;
		if (props.max != null && value > props.max) return;
		if (
			props.isAvailableFractionValue &&
			props.step != null &&
			getNumberDecimalPlaces(value) > getNumberDecimalPlaces(props.step)
		)
			return;

		props.onChange(value);
	}

	function displayByIsFraction() {
		if (props.value === null) return '';
		return props.isAvailableFractionValue ? props.value : props.value.toFixed();
	}

	return (
		<TextField
			type='number'
			label={props.title}
			placeholder={props.placeholder}
			size={props.size}
			className={props.className}
			sx={props.sx}
			value={displayByIsFraction()}
			onChange={onChange}
			required={props.required}
			disabled={props.disabled}
			fullWidth
		/>
	);
}
