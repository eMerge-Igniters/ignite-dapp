import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  scoped: true,
})
export class AppHome {
  // async triggerTaskDrawer() {
  //   const drawer = (await document.querySelector('ukg-task-drawer')) as any;
  //   await drawer.triggerDrawer();
  // }

  render() {
    return (
      <div class="app-home">
        {/* <ukg-button emphasis="mid" onClick={() => this.triggerTaskDrawer()}>
          Add Proposal
          <i slot="child-icon" class="fa-solid fa-plus"></i>
        </ukg-button> */}
        <ukg-grid-container>
          <ukg-grid size="default">
            <div class="ukg-col-lg-3 ukg-col-md-4 ukg-col-sm-4">
              <proposal-card></proposal-card>
            </div>
          </ukg-grid>
        </ukg-grid-container>
        {/* <ukg-task-drawer-container style={{ 'min-height': '100vh' }}>
          <ukg-task-drawer heading="Create Proposal">
            <proposal-form></proposal-form>
          </ukg-task-drawer>
        </ukg-task-drawer-container> */}
      </div>
    );
  }
}
