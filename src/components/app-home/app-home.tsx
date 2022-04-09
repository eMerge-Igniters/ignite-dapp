import { Component, h, State } from '@stencil/core';
import ProposalService from '../../services/proposal.services';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  scoped: true,
})
export class AppHome {
  @State() createdProposals = [];
  @State() pastProposals = [];

  proposalService = new ProposalService();

  componentDidLoad() {
    this.proposalService.onProposalsCreated(
      _ => {},
      e => {
        this.createdProposals = [...this.createdProposals, e];
      },
      _ => {},
    );

    this.proposalService.onPastProposals((e) => {
      this.pastProposals = [...e];
    });
  }

  render() {
    const allProposals = [...this.pastProposals, ...this.createdProposals];
    console.log('ALL PROPOSALS', allProposals);
    const filteredProposals = allProposals.filter(proposal => !proposal.returnValues.description.includes('PID'));
    const descriptions = filteredProposals.map((proposal) =>  { 
      return proposal.returnValues.description; 
    } );
    console.log(descriptions);
    return (
      <div class="app-home">
        <ukg-grid-container>
          <ukg-grid size="default">
            {filteredProposals.map((_, index) => {
              return (
                <div class="ukg-col-lg-4 ukg-col-md-4 ukg-col-sm-4">
                  <proposal-card
                    heading={descriptions[index]}
                    expirationDate={new Date('04/15/2022')}
                    description={descriptions[index]}
                    totalVotes={600}
                    yay={500}
                    nay={100}
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
