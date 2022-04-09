import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  scoped: true,
})
export class AppRoot {
  heading = 'Ignite Community Hub';

  async triggerTaskDrawer() {
    const drawer = (await document.querySelector('ukg-task-drawer')) as any;
    await drawer.triggerDrawer();
  }

  render() {
    return (
      <ukg-app-shell>
        <ukg-task-drawer-container style={{ height: '100vh' }}>
          <ukg-task-drawer heading="Create Proposal">
            <proposal-form></proposal-form>
          </ukg-task-drawer>
          <div slot="task-main-content">
            <ukg-nav-header showMenuButton={false} disable-gradient heading={this.heading}>
              <div slot="icons">
                <wallet-button connected></wallet-button>
                <ukg-button emphasis="mid" onClick={() => this.triggerTaskDrawer()}>
                  Add Proposal
                  <i slot="child-icon" class="fa-solid fa-plus"></i>
                </ukg-button>
              </div>
            </ukg-nav-header>
            <div class="header-extension">
              <h2>Heading</h2>
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
        </ukg-task-drawer-container>
      </ukg-app-shell>
    );
  }
}
