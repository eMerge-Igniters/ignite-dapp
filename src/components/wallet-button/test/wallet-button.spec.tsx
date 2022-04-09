import { newSpecPage } from '@stencil/core/testing';
import { WalletButton } from '../wallet-button';

describe('wallet-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WalletButton],
      html: `<wallet-button></wallet-button>`,
    });
    expect(page.root).toEqualHtml(`
      <wallet-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wallet-button>
    `);
  });
});
