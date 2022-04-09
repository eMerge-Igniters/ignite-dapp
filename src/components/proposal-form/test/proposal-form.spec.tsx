import { newSpecPage } from '@stencil/core/testing';
import { ProposalForm } from '../proposal-form';

describe('proposal-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProposalForm],
      html: `<proposal-form></proposal-form>`,
    });
    expect(page.root).toEqualHtml(`
      <proposal-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </proposal-form>
    `);
  });
});
