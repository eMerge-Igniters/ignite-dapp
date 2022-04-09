import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  scoped: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <ukg-nav-header heading="Community">
          <div slot="icons">
            <ukg-button>
              Add Proposal
              <i slot="child-icon" class="fa-solid fa-plus"></i>
            </ukg-button>
          </div>
        </ukg-nav-header>
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
