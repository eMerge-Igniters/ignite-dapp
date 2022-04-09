import { Component, h, State } from '@stencil/core';
import ProposalService from '../../services/proposal.services';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  scoped: true,
})
export class AppHome {
  @State() data;

  proposalService = new ProposalService();

  componentDidLoad() {
    this.proposalService.onProposalsCreated(
      _ => {},
      e => {
        this.data = [...this.data, e];
        console.log(this.data);
      },
      _ => {},
    );
  }

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
