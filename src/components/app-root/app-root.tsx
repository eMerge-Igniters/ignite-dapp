import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  scoped: true,
})
export class AppRoot {
  heading="Ignite Community Hub"
  
  render() {
    return (
      <div>
        <ukg-nav-header showMenuButton={false} disable-gradient heading={this.heading}>
          <div slot="icons">
            <wallet-button connected></wallet-button>
          </div>
        </ukg-nav-header>
        <div class="header-extension">
          <h3>Heading</h3>
          <p>A Blockchain powered voting system that let's residents of a community make a real, transparent impact</p>
        </div>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
