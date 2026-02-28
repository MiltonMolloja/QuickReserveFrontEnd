/**
 * Available service types for workshop appointments.
 * Values match the backend ServiceType enum.
 *
 * ESLint naming-convention: enum PascalCase, members UPPER_CASE.
 */
export enum ServiceType {
  MANTENIMIENTO = 'Mantenimiento',
  REPARACION = 'Reparacion',
  DIAGNOSTICO = 'Diagnostico',
  REVISION_TECNICA = 'Revision Tecnica',
}

/**
 * Array of all service type entries for use in dropdowns/selects.
 * Each entry contains the enum key and its display label.
 */
export const SERVICE_TYPE_OPTIONS: readonly { readonly value: ServiceType; readonly label: string }[] =
  [
    { value: ServiceType.MANTENIMIENTO, label: 'Mantenimiento' },
    { value: ServiceType.REPARACION, label: 'Reparacion' },
    { value: ServiceType.DIAGNOSTICO, label: 'Diagnostico' },
    { value: ServiceType.REVISION_TECNICA, label: 'Revision Tecnica' },
  ] as const;
