import type { Workshop } from '../../domain/models/workshop.model';

/**
 * Backend DTO for workshop responses.
 * Workshop fields are already matching (no snake_case conversion needed),
 * but we keep the mapper for consistency and future-proofing.
 */
export interface WorkshopApiDto {
  readonly id: number;
  readonly name: string;
  readonly address: string;
  readonly email: string;
  readonly phone: string;
}

/**
 * Maps a backend workshop DTO to a domain Workshop model.
 *
 * @param dto - Raw API response
 * @returns Domain model
 */
export function workshopFromApi(dto: WorkshopApiDto): Workshop {
  return {
    id: dto.id,
    name: dto.name,
    address: dto.address,
    email: dto.email,
    phone: dto.phone,
  };
}

/**
 * Maps an array of backend workshop DTOs to domain models.
 *
 * @param dtos - Array of raw API responses
 * @returns Array of domain models
 */
export function workshopListFromApi(dtos: WorkshopApiDto[]): Workshop[] {
  return dtos.map((dto) => workshopFromApi(dto));
}
