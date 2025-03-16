import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for Carmax home page
 */
export class HomePage extends BasePage {
  // Selectors for specific elements
  private readonly searchInput = '#header-search';
  private readonly zipCodeInput = '#zipCode';
  private readonly searchButton = 'button[data-qa="search-button"]';
  private readonly makeDropdown = '#make';
  private readonly modelDropdown = '#model';
  private readonly priceRangeMin = '#price-min';
  private readonly priceRangeMax = '#price-max';
  
  constructor(page: Page) {
    super(page);
  }
  
  /**
   * Navigate to Carmax home page
   */
  async goto(): Promise<void> {
    await this.navigate('/');
  }
  
}
