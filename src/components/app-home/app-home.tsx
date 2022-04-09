import { Component, h } from '@stencil/core';
import { fakeData } from '../../utils/fake-data';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  scoped: true,
})
export class AppHome {
  data = fakeData;
  render() {
    return (
      <div class="app-home">
        <ukg-grid-container>
          <ukg-grid size="default">
            {this.data.map(proposal => {
              return (
                <div class="ukg-col-lg-4 ukg-col-md-4 ukg-col-sm-4">
                  <proposal-card
                    heading={proposal.title}
                    expirationDate={proposal.expirationDate}
                    description={proposal.description}
                    totalVotes={proposal.totalVotes}
                    yay={proposal.yay}
                    nay={proposal.nay}
                  ></proposal-card>
                </div>
              );
            })}
          </ukg-grid>
        </ukg-grid-container>
      </div>
    );
  }
}
