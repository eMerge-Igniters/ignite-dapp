import { newSpecPage } from '@stencil/core/testing';
import { ProposalCard } from '../proposal-card';

describe('proposal-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProposalCard],
      html: `<proposal-card></proposal-card>`,
    });
    expect(page.root).toEqualHtml(`
      <proposal-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </proposal-card>
    `);
  });
});
