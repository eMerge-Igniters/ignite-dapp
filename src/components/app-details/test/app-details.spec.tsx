import { newSpecPage } from '@stencil/core/testing';
import { AppDetails } from '../app-details';

describe('app-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppDetails],
      html: `<app-details></app-details>`,
    });
    expect(page.root).toEqualHtml(`
      <app-details>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-details>
    `);
  });
});
