import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'proposal-card',
  styleUrl: 'proposal-card.scss',
  scoped: true,
})
export class ProposalCard {

  @Prop() title = ''
  @Prop() expirationDate: Date = null;
  @Prop() description = ''
  @Prop() totalVotes = 0
  @Prop() yay = 0
  @Prop() nay = 0

  render() {
    return (
      <Host>
        <ukg-card fit-content>
          <ukg-card-header card-title={this.title}> </ukg-card-header>
          <ukg-card-content>{this.description}</ukg-card-content>
          <ukg-card-footer>
             <div slot="right">
               <ukg-button>Vote</ukg-button>
             </div>
          </ukg-card-footer>
        </ukg-card>
      </Host>
    );
  }
}
