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

  getSupportValue = (support, proposal) => {
    // We can optimize this function xD

    if (!proposal) {
      switch (support) {
        case '0':
          return { yes: 1 };
        case '1':
          return { no: 1 };
        case '2':
          return { abstain: 1 };
      }
    }

    switch (support) {
      case '0':
        return { yes: proposal.yes + 1 };
      case '1':
        return { no: proposal.no + 1 };
      case '2':
        return { abstain: proposal.abstain + 1 };
    }
  };

  render() {
    const allProposals = [...this.pastProposals, ...this.createdProposals];
    console.log('ALL PROPOSALS', allProposals);
    const filteredProposals = allProposals.filter(proposal => proposal.returnValues.description.includes('{"'));
    const proposalObjs = filteredProposals.map(proposal => {
      // {"title":"jkbkjb","description":"jkhbkj","category":"Parks and Recreation","votingMonth":"March","tags":"community,education,sports"}
      return { ...JSON.parse(proposal.returnValues.description), proposalId: proposal.returnValues.proposalId };
    });

    const allVotes = [...this.pastVotes, ...this.castedVotes];
    const filteredVotes = allVotes.reduce((acc, vote) => {
      const supportValue = this.getSupportValue(vote.support, acc[vote.proposalId]);
      return {
        ...acc,
        [vote.proposalId]: acc[vote.proposalId]
          ? { ...acc[vote.proposalId], total: acc[vote.proposalId].total + 1, ...supportValue }
          : { yes: 0, no: 0, abstain: 0, total: 1, ...supportValue },
      };
    }, {});

    return (
      <div class="app-home">
        <div class="container mx-auto px-4 sm:pt-12 pt-6">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filteredProposals.map((proposal, index) => {
              return (
                <div class="ukg-col-lg-4 ukg-col-md-4 ukg-col-sm-4">
                  <proposal-card
                    heading={proposalObjs[index].title}
                    expirationDate={new Date('04/15/2022')}
                    description={proposalObjs[index].description}
                    totalVotes={filteredVotes[proposal.proposalId].total}
                    yay={filteredVotes[proposal.proposalId].yes}
                    nay={filteredVotes[proposal.proposalId].no}
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
