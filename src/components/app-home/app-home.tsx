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
  @State() castedVotes = [];
  @State() pastVotes = [];

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

    this.proposalService.onVoteCast(
      _ => {},
      e => {
        const { proposalId, support } = e.returnValues;
        this.castedVotes = [...this.castedVotes, { proposalId, support }];
      },
      _ => {},
    );

    this.proposalService.onPastVoteCreated(events => {
      events.forEach(event => {
        const { proposalId, support } = event.returnValues;
        this.pastVotes = [...this.pastVotes, { proposalId, support }];
      });
    });
  }

  getSupportValue = support => {
    switch (support) {
      case '0':
        return 1;
      case '1':
        return -1;
      case '2':
        return 0;
    }
  };

  render() {
    const allProposals = [...this.pastProposals, ...this.createdProposals];
    console.log('ALL PROPOSALS', allProposals);
    const filteredProposals = allProposals.filter(proposal => proposal.returnValues.description.includes('{"'));
    const proposalObjs = filteredProposals.map(proposal => {
      // {"title":"jkbkjb","description":"jkhbkj","category":"Parks and Recreation","votingMonth":"March","tags":"community,education,sports"}
      return {...JSON.parse(proposal.returnValues.description), proposalId: proposal.returnValues.proposalId};
    });

    const allVotes = [...this.pastVotes, ...this.castedVotes];
    const filteredVotes = allVotes.reduce((acc, vote) => {
      return { ...acc, [vote.proposalId]: acc[vote.proposalId] ? acc[vote.proposalId] + this.getSupportValue(vote.support) : this.getSupportValue(vote.support) };
    }, {});


    console.log('Casted Votes', this.castedVotes);
    console.log('Past Votes', this.pastVotes);

    console.log('Filtered Votes', filteredVotes);

    console.log('PROPOSAL OBJS', proposalObjs)

    return (
      <div class="app-home">
        <div class="container mx-auto px-4 sm:pt-12 pt-6">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
          </div>
        </div>
      </div>
    );
  }
}
