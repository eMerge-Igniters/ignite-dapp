import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'proposal-card',
  styleUrl: 'proposal-card.scss',
  scoped: true,
})
export class ProposalCard {
  render() {
    return (
      <Host>
        <ukg-card>
          <ukg-card-header card-title="Heading"> </ukg-card-header>
          <ukg-card-content>Content</ukg-card-content>
          <ukg-card-footer>
            <div slot="left">footer left</div> <div slot="right"> footer right</div>
          </ukg-card-footer>
        </ukg-card>
      </Host>
    );
  }
}
