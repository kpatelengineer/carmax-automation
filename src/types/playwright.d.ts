// src/types/playwright.d.ts
import { Page } from '@playwright/test';

declare module '@playwright/test' {
  interface Page {
    addAttachment(name: string, content: string, type?: string): Promise<void>;
  }
}