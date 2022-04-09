import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  scoped: true,
})
export class AppRoot {
  render() {
    return (
      <ukg-app-shell>
        <div>
          <ukg-nav-header heading="Community proposals">
            <div slot="icons">
              <ukg-button icon-only>
                <i slot="icon-only" class="fa-solid fa-large"></i>
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
      </ukg-app-shell>
    );
  }
}
