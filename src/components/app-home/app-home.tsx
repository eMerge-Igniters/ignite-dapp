import { Component, EventEmitter, Event, h, State } from '@stencil/core';
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

  async componentDidLoad() {
    await this.proposalService.getSigner();

    this.proposalService.onProposalsCreated(
      _ => {},
      e => {
        this.createdProposals = [...this.createdProposals, e];
      },
      _ => {},
    );

    this.proposalService.onPastProposals(e => {
      this.pastProposals = [...e];
    });
  }

  @State() signer;

  @Event() signerConnected: EventEmitter<any>;

  render() {
    const allProposals = [...this.pastProposals, ...this.createdProposals];
    console.log('ALL PROPOSALS', allProposals);
    const filteredProposals = allProposals.filter(proposal => proposal.returnValues.description.includes('{"'));
    const proposalObjs = filteredProposals.map(proposal => {
      return JSON.parse(proposal.returnValues.description);
    });
    console.log(proposalObjs);

    // {"title":"jkbkjb","description":"jkhbkj","category":"Parks and Recreation","votingMonth":"March","tags":"community,education,sports"}

    return (
      <div class="app-home">
        <ukg-grid-container>
          <ukg-grid size="default">
            {filteredProposals.map((_, index) => {
              return (
                <div class="ukg-col-lg-4 ukg-col-md-4 ukg-col-sm-4">
                  <proposal-card
                    heading={proposalObjs[index].title}
                    expirationDate={new Date('04/15/2022')}
                    description={proposalObjs[index].description}
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
