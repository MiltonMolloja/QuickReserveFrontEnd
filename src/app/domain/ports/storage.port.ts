/**
 * Abstract port for storage operations.
 * Defines the contract for persisting data (theme preference, language, etc.).
 *
 * Following Hexagonal Architecture: Domain defines the port,
 * Infrastructure provides the adapter (e.g., localStorage implementation).
 *
 * Registered in DI as: `{ provide: StoragePort, useClass: LocalStorageAdapter }`
 */
export abstract class StoragePort {
  abstract get(key: string): unknown;
  abstract set(key: string, value: unknown): void;
  abstract remove(key: string): void;
}
