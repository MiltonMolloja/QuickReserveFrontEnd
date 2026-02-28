import { Injectable } from '@angular/core';

import { StoragePort } from '../../domain/ports/storage.port';

/**
 * LocalStorage adapter for persistent storage.
 * Implements StoragePort using the browser's localStorage API.
 *
 * Used for persisting theme preference, language selection, etc.
 *
 * Registered in DI as: `{ provide: StoragePort, useClass: LocalStorageAdapter }`
 */
@Injectable()
export class LocalStorageAdapter extends StoragePort {
  get(key: string): unknown {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    try {
      return JSON.parse(item) as unknown;
    } catch {
      return item;
    }
  }

  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
