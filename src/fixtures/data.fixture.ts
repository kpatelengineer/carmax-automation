import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Define types for test data
export type VehicleSearchData = {
  make?: string;
  model?: string;
  zipCode?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
};

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export type TestDataFixture = {
  getVehicleSearchData: () => VehicleSearchData;
  getUserData: () => UserData;
  getRandomVehicle: () => Promise<string>;
};

// Create the test data fixture
export const testData = base.extend<{ testData: TestDataFixture }>({
  testData: async ({}, use) => {
    // Load test data from JSON files
    const loadTestData = <T>(fileName: string): T => {
      const filePath = path.join(__dirname, '../../test-data', fileName);
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data) as T;
      } catch (error) {
        console.error(`Error loading test data from ${filePath}:`, error);
        return {} as T;
      }
    };

    // Define default test data for when files don't exist
    const defaultVehicleSearchData: VehicleSearchData = {
      make: 'Toyota',
      model: 'Camry',
      zipCode: '23233', // Richmond, VA (Carmax HQ area)
      minPrice: 15000,
      maxPrice: 30000,
      minYear: 2018,
      maxYear: 2023,
      maxMileage: 50000
    };

    const defaultUserData: UserData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '8045551234',
      address: '12800 Tuckahoe Creek Pkwy',
      city: 'Richmond',
      state: 'VA',
      zipCode: '23238'
    };

    // Get vehicle search data
    const getVehicleSearchData = (): VehicleSearchData => {
      try {
        return loadTestData<VehicleSearchData>('vehicle-search.json');
      } catch {
        return defaultVehicleSearchData;
      }
    };

    // Get user data
    const getUserData = (): UserData => {
      try {
        return loadTestData<UserData>('user.json');
      } catch {
        return defaultUserData;
      }
    };

    // Get a random vehicle stock number for testing
    const getRandomVehicle = async (): Promise<string> => {
      // In a real implementation, this might fetch from an API
      // For demonstration, we'll return a hardcoded value
      return '12345678';
    };

    await use({
      getVehicleSearchData,
      getUserData,
      getRandomVehicle
    });
  }
});