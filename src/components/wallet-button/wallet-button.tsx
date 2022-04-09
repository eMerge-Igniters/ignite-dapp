import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'wallet-button',
  styleUrl: 'wallet-button.scss',
  scoped: true,
})
export class WalletButton {
  @Prop() connected = false;

  render() {
    return (
      <Host>
        {this.connected ? (
          <ukg-button emphasis="mid">
            Disconnect
            <i slot="child-icon" class="fa-solid fa-arrow-right-from-bracket"></i>
          </ukg-button>
        ) : (
          <ukg-button>
            Login
            <i slot="child-icon" class="fa-solid fa-arrow-right-to-bracket"></i>
          </ukg-button>
        )}
      </Host>
    );
  }
}
