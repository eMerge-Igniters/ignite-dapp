import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  scoped: true,
})
export class AppRoot {
  heading = 'Community Hub';
  taskDrawerEl;
  mediaQuery = window.matchMedia('(min-width: 555px');
  @State() isMobile = false;

  async triggerTaskDrawer() {
    await this.taskDrawerEl?.triggerDrawer();
  }

  onWindowResize(mq) {
    this.isMobile = !mq.matches;
  }

  componentWillLoad() {
    this.onWindowResize(this.mediaQuery);
    this.mediaQuery.onchange = mq => this.onWindowResize(mq);
  }

  render() {
    return (
      <ukg-app-shell>
        <ukg-task-drawer-container style={{ height: '100vh' }}>
          <ukg-task-drawer
            ref={el => (this.taskDrawerEl = el)}
            heading="New Proposal"
            has-reset-button
            reset-button-text="Cancel"
            onUkgTaskDrawerResetButtonClicked={() => this.triggerTaskDrawer()}
          >
            <proposal-form></proposal-form>
          </ukg-task-drawer>
          <div slot="task-main-content">
            <ukg-nav-header showMenuButton={false} disable-gradient>
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                }}
                slot="left"
              >
                <img
                  style={{
                    width: '128px',
                    display: 'inline-block',
                  }}
                  src="assets/icon/logo.svg"
                ></img>
                <h3
                  style={{
                    display: 'inline-block',
                    color: 'white',
                    marginLeft: '1rem',
                    marginTop: '0',
                    marginBottom: '0',
                  }}
                >
                  {this.heading}
                </h3>
              </div>

              <div slot="icons">
                {!this.isMobile ? (
                  <ukg-button-group>
                    <ukg-button emphasis="mid" onClick={() => this.triggerTaskDrawer()}>
                      Add Proposal
                      <i slot="child-icon" class="fa-solid fa-plus"></i>
                    </ukg-button>
                    <wallet-button connected></wallet-button>
                  </ukg-button-group>
                ) : null}
              </div>
            </ukg-nav-header>
            <div class="header-extension" style={{
              paddingBottom: this.isMobile ? '40px':null
            }}>
              {this.isMobile ? (
                <ukg-button-group style={{paddingBottom: '16px'}}>
                  <ukg-button emphasis="mid" onClick={() => this.triggerTaskDrawer()}>
                    Add Proposal
                    <i slot="child-icon" style={{ color: 'white', marginLeft: '4px'}} class="fa-solid fa-plus"></i>
                  </ukg-button>
                  <wallet-button connected></wallet-button>
                </ukg-button-group>
              ) : null}
              <h2 style={{
                marginTop: this.isMobile ? '0': null
              }}>Welcome, Miami-Dade!</h2>
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
