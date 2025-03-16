import { auth } from './auth.fixture';
import { testData } from './data.fixture';

// Add the missing method to testData
export interface VehicleSearchData {
  make?: string;
  model?: string;
  zipCode?: string;
  minPrice?: number;
  maxPrice?: number;
}

// We need to extend the existing testData object
const extendedTestData = {
  ...testData,
  getVehicleSearchData(): VehicleSearchData {
    return {
      make: 'Toyota',
      model: 'Camry',
      zipCode: '23233',
      minPrice: 15000,
      maxPrice: 30000
    };
  }
};

// Export all fixtures
export { auth };
export { extendedTestData as testData };

// Also export as a single object
export const fixtures = {
  auth,
  testData: extendedTestData
};