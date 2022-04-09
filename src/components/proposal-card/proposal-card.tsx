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
          <ukg-nav-header
            onUkgNavCloseButtonSelected={() => {
              this.detailsModal.dismiss();
            }}
            is-overlay
            show-close-button
            heading={`${this.heading} - Updates`}
          ></ukg-nav-header>
          <section
            style={{
              margin: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center'
            }}
          >
            <img src="data:image/jpeg;base64,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"></img>
            <p>
              “Center Park, having once been the location of the Scandinavia Elementary School, was developed as a family picnic area and playground after the school building was
              demolished,” club president Wayne Luck said. “Many people in the Scandinavia area attended school at this location and they have many fond memories of the early
              years. We want to honor those memories and create new ones for generations to come.”{' '}
            </p>
            <p>
              Located in the center of Scandinavia, it is within walking distance for all village residents. It is also a short walk from the park to a hiking trail around Silver
              Lake to Jorgens Park Preserve.{' '}
            </p>{' '}
            <p>
              “To top it off, it’s just a few blocks from the Tomorrow River Trail, a 29-mile rail trail from Plover to Manawa,” Luck said. “Being about midway along the trail, the
              Scandinavia downtown businesses and Center Park are the perfect resting spots for weary bicyclers or hikers.”
            </p>{' '}
            <p>The club’s goal is to make Center Park a place that can be enjoyed by people of all ages, not just young children, according to Luck.</p>
          </section>
        </ukg-modal>
      </Host>
    );
  }
}
