import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  scoped: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <ukg-grid-container>
          <ukg-grid size="default">
            <div class="ukg-col-lg-3 ukg-col-md-4 ukg-col-sm-4">
              <proposal-card></proposal-card>
            </div>
          </ukg-grid>
        </ukg-grid-container>
      </div>
    );
  }
}
