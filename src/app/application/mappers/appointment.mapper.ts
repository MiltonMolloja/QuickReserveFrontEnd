import type { Appointment } from '../../domain/models/appointment.model';
import type { CreateAppointmentDto } from '../../domain/models/create-appointment.dto';

/**
 * Backend DTO for appointment responses (snake_case).
 * Represents the raw JSON shape from `GET /api/Appointments`.
 */
export interface AppointmentApiDto {
  readonly id: string;
  readonly place_id: number;
  readonly appointment_at: string;
  readonly service_type: string;
  readonly contact: {
    readonly name: string;
    readonly email: string;
    readonly whatsapp: string;
  };
  readonly vehicle?: {
    readonly make?: string;
    readonly model?: string;
    readonly year?: number;
    readonly license_plate?: string;
  };
  readonly created_at: string;
}

/**
 * Backend DTO for creating appointments (snake_case).
 * Represents the JSON shape for `POST /api/Appointments`.
 */
export interface CreateAppointmentApiDto {
  readonly place_id: number;
  readonly appointment_at: string;
  readonly service_type: string;
  readonly contact: {
    readonly name: string;
    readonly email: string;
    readonly whatsapp: string;
  };
  readonly vehicle?: {
    readonly make?: string;
    readonly model?: string;
    readonly year?: number;
    readonly license_plate?: string;
  };
}

/**
 * Maps a backend appointment DTO (snake_case) to a domain Appointment model (camelCase).
 *
 * @param dto - Raw API response in snake_case
 * @returns Domain model in camelCase
 */
export function appointmentFromApi(dto: AppointmentApiDto): Appointment {
  return {
    id: dto.id,
    placeId: dto.place_id,
    appointmentAt: dto.appointment_at,
    serviceType: dto.service_type,
    contact: {
      name: dto.contact.name,
      email: dto.contact.email,
      whatsapp: dto.contact.whatsapp,
    },
    vehicle: dto.vehicle
      ? {
          make: dto.vehicle.make,
          model: dto.vehicle.model,
          year: dto.vehicle.year,
          licensePlate: dto.vehicle.license_plate,
        }
      : undefined,
    createdAt: dto.created_at,
  };
}

/**
 * Maps an array of backend appointment DTOs to domain models.
 *
 * @param dtos - Array of raw API responses
 * @returns Array of domain models
 */
export function appointmentListFromApi(dtos: AppointmentApiDto[]): Appointment[] {
  return dtos.map((dto) => appointmentFromApi(dto));
}

/**
 * Maps a domain CreateAppointmentDto to the backend API format (snake_case).
 *
 * @param dto - Domain DTO in camelCase
 * @returns API request body in snake_case
 */
export function appointmentToApi(dto: CreateAppointmentDto): CreateAppointmentApiDto {
  return {
    place_id: dto.placeId,
    appointment_at: dto.appointmentAt,
    service_type: dto.serviceType,
    contact: {
      name: dto.contact.name,
      email: dto.contact.email,
      whatsapp: dto.contact.whatsapp,
    },
    vehicle: dto.vehicle
      ? {
          make: dto.vehicle.make,
          model: dto.vehicle.model,
          year: dto.vehicle.year,
          license_plate: dto.vehicle.licensePlate,
        }
      : undefined,
  };
}
