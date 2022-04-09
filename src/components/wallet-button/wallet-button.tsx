import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'wallet-button',
  styleUrl: 'wallet-button.scss',
  scoped: true,
})
export class WalletButton {
  @Prop() connected = false;

  @Event() disconnect: EventEmitter<any>;
  @Event() connect: EventEmitter<any>;

  render() {
    return (
      <Host>
        {this.connected ? (
          <ukg-button
            key="connected"
            emphasis="mid"
            disabled
            onClick={() => {
              this.disconnect.emit();
            }}
          >
            Connected
            <i slot="child-icon" class="fa-solid fa-arrow-right-from-bracket"></i>
          </ukg-button>
        ) : (
          <ukg-button
            key="connect"
            onClick={() => {
              this.connect.emit();
            }}
          >
            Connect
            <i slot="child-icon" class="fa-solid fa-arrow-right-to-bracket"></i>
          </ukg-button>
        )}
      </Host>
    );
  }
}
