// src/types/global.d.ts
interface Window {
    allure?: {
      addParameter: (name: string, value: string) => void;
      // Add other Allure methods you might use
    };
  }