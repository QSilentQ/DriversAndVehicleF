CREATE TABLE drivers (
  id uuid NOT NULL,
  first_name varchar NOT NULl,
  second_name varchar NOT NULL,
  last_name varchar,
  gender int4 NOT NULL,
  driver_license_category _int4 NOT NULL,
  birthday date NOT NULL,
  experience date NOT NULL,
  pay_per_hour float(8) NULL,
  created_datetime_utc timestamp NOT NULL,
  modified_datetime_utc timestamp NULL,
  last_vacation_datetime_utc timestamp NULL,
  is_removed bool NULL,
  CONSTRAINT drivers_pk PRIMARY KEY (id)
);

CREATE TABLE vehicles (
  id uuid NOT NULL,
  driver_id uuid NULL,
  name varchar NOT NULL,
  state_number varchar NOT NULL,
  vehicle_category int4 NOT NULL,
  average_speed float(8) NOT NULL,
  fuel_consumption float(8) NOT NULL,
  created_datetime_utc timestamp NOT NULL,
  modified_datetime_utc timestamp NULL,
  is_removed bool NULL,
  CONSTRAINT vehicles_pk PRIMARY KEY (id)
);

CREATE TABLE history (
	id uuid NOT NULL,
	driver_id uuid NOT NULL,
	vehicle_id uuid NOT NULL,
	datetime_utc timestamp NOT NULL
)