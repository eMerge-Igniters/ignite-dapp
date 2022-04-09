import { newE2EPage } from '@stencil/core/testing';

describe('app-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-details></app-details>');

    const element = await page.find('app-details');
    expect(element).toHaveClass('hydrated');
  });
});
