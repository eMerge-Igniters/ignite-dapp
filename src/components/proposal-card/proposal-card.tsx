import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'proposal-card',
  styleUrl: 'proposal-card.scss',
})
export class ProposalCard {
  modal;
  detailsModal;

  @Prop() heading = '';
  @Prop() expirationDate: Date = null;
  @Prop() description = '';
  @Prop() totalVotes = 0;
  @Prop() yay = 0;
  @Prop() nay = 0;

  getDaysTillExpiration() {
    const timeTill = this.expirationDate.getTime() - new Date().getTime();

    return Math.floor(timeTill / (1000 * 60 * 60 * 24));
  }

  render() {
    return (
      <Host class="proposal-card">
        <ukg-card
          onClick={ev => {
            this.detailsModal.present(ev);
          }}
          fit-content
        >
          <ukg-card-header card-title={this.heading} subtitle={this.getDaysTillExpiration() + ' days left'}></ukg-card-header>
          <ukg-card-content>
            <div class="description">{this.description}</div>

            <div class="votes">
              <div>Total votes: {this.totalVotes}</div>
              <div class="progress-bar">
                <ukg-progress-minimal value={this.yay / this.totalVotes}></ukg-progress-minimal> <span>{this.yay}</span>
              </div>
            </div>
          </ukg-card-content>
          <ukg-card-footer
            onClick={ev => {
              ev.stopPropagation();
            }}
          >
            <div slot="right">
              <ukg-button-group>
                <ukg-button emphasis="mid">Share</ukg-button>
                <ukg-button
                  onClick={ev => {
                    ev.stopPropagation();
                    this.modal.present(ev);
                  }}
                >
                  Vote
                </ukg-button>
              </ukg-button-group>
            </div>
          </ukg-card-footer>
        </ukg-card>

        <ukg-modal ref={el => (this.modal = el)}>
          <ukg-radio-group full-width>
            <ukg-radio-button full-width value="for">
              For
            </ukg-radio-button>
            <ukg-radio-button full-width value="against">
              Against
            </ukg-radio-button>
            <ukg-radio-button full-width value="abstain">
              Abstain
            </ukg-radio-button>
          </ukg-radio-group>
          <ukg-dialog-footer divider>
            <ukg-button
              onClick={() => {
                // submit proposal vote
                this.modal.dismiss();
              }}
              slot="button1"
            >
              Submit
            </ukg-button>
          </ukg-dialog-footer>
        </ukg-modal>

        <ukg-modal is-full-screen ref={el => (this.detailsModal = el)}>
          <ukg-nav-header showMenuButton={false}
            onUkgNavCloseButtonSelected={() => {
              this.detailsModal.dismiss();
            }}
            is-overlay
            show-close-button
            heading={`${this.heading} - Updates`}
          ></ukg-nav-header>
         <app-details heading={this.heading}></app-details>
        </ukg-modal>
      </Host>
    );
  }
}
