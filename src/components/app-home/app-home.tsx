import { Component, forceUpdate, h, State, Host } from '@stencil/core';
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
  el;

  lastVoted;
  proposalService = new ProposalService();

  async componentDidLoad() {
    await this.proposalService.getSigner();

    this.proposalService.onProposalsCreated(
      _ => {},
      e => {
        this.clearProposalForm();
        if (this.createdProposals.find(proposal => proposal.returnValues.proposalId === e.returnValues.proposalId)) {
          return;
        }
        this.createdProposals = [...this.createdProposals, e];
      },
      _ => {},
    );

    this.proposalService.onPastProposals(e => {
      const proposals = [...e];
      proposals.forEach(proposal => {
        this.proposalService.hasVoted(proposal.returnValues.proposalId).then(res => {
          proposal.returnValues.voted = res;
          forceUpdate(this.el);
        });
      });
      this.pastProposals = [...proposals];
    });

    this.proposalService.onVoteCast(
      _ => {
      },
      e => {
        if (this.castedVotes.find((castedVote) => e.proposalId === castedVote.proposalId)) {
          return;
        }

        const { proposalId, support } = e.returnValues;
        this.castedVotes = [...this.castedVotes, { proposalId, support }];
        const card: any = document.getElementById(`a${proposalId}`);
        if (card) {
          (card as any).hasVoted = true;
        }
        card.dismissSnackbar();
      },
      _ => {},
    );

    this.proposalService.onPastVoteCreated(events => {
      events.forEach(event => {
        const { proposalId, support } = event.returnValues;
        this.pastVotes = [...this.pastVotes, { proposalId, support }];
        console.log('past votes', this.pastVotes);
      });
    });
  }

  clearProposalForm() {
    const taskDrawer = document.querySelector('ukg-task-drawer');
    (taskDrawer.querySelector('#title-input') as any).value = null;
    (taskDrawer.querySelector('#description-input') as any).value = null;
    (taskDrawer.querySelector('#category-input') as any).value = null;
    (taskDrawer.querySelector('#voting-mon-input') as any).value = null;
    const tags = taskDrawer.querySelector('#tag-input')?.querySelectorAll('ukg-chip');
    tags.forEach((tag: any) => (tag.selected = false));
    (taskDrawer.querySelector('ukg-stepper') as any).clear();
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

  castVote(value, proposalId) {
    this.proposalService.vote(proposalId, value);
  }

  hasVoted(proposalId) {
    return this.proposalService.hasVoted(proposalId);
  }

  render() {
    console.log('ALL VOTES', this.castedVotes);
    const allProposals = [...this.pastProposals, ...this.createdProposals];
    console.log(allProposals);
    console.log('ALL PROPOSALS', allProposals);
    let filteredProposals = allProposals.filter(proposal => proposal.returnValues.description.includes('{"') && !proposal.returnValues.description.includes('test'));

    console.log('FILTERED PROPOSALS', filteredProposals);
    const proposalObjs = filteredProposals.map(proposal => {
      // {"title":"jkbkjb","description":"jkhbkj","category":"Parks and Recreation","votingMonth":"March","tags":"community,education,sports"}
      return { ...JSON.parse(proposal.returnValues.description), proposalId: proposal.returnValues.proposalId, voted: proposal.returnValues.voted };
    });

    console.log('OBJS', proposalObjs);

    const allVotes = [...this.pastVotes, ...this.castedVotes];
    console.log('ALL VOTES', allVotes);
    const filteredVotes = allVotes.reduce((acc, vote) => {
      const supportValue = this.getSupportValue(vote.support, acc[vote.proposalId]);
      return {
        ...acc,
        [vote.proposalId]:
          vote.proposalId in acc ? { ...acc[vote.proposalId], total: acc[vote.proposalId].total + 1, ...supportValue } : { yes: 0, no: 0, abstain: 0, total: 1, ...supportValue },
      };
    }, {});

    console.log('FILTERED VOTES', filteredVotes);

    return (
      <Host
        class="app-home"
        ref={el => {
          this.el = el;
        }}
      >
        <div class="container mx-auto px-4 sm:pt-12 pt-6">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {proposalObjs.map((proposal, index) => {
              return (
                <div class="ukg-col-lg-4 ukg-col-md-4 ukg-col-sm-4">
                  <proposal-card
                    onCastVote={e => {
                      console.log(document.querySelector(`#a${proposalObjs[index]?.proposalId}`) as any);
                      this.lastVoted = document.querySelector(`#a${proposalObjs[index]?.proposalId}`) as any;
                      this.lastVoted.setLoading()
                      this.castVote(e.detail, proposalObjs[index].proposalId);
                      proposalObjs[index].voted = true;
                    }}
                    id={'a' + proposalObjs[index]?.proposalId}
                    heading={proposalObjs[index]?.title}
                    expirationDate={new Date('04/15/2022')}
                    description={proposalObjs[index]?.description}
                    totalVotes={filteredVotes[proposal.proposalId]?.total}
                    yay={filteredVotes[proposal.proposalId]?.yes}
                    nay={filteredVotes[proposal.proposalId]?.no}
                    hasVoted={proposalObjs[index]?.voted}
                  ></proposal-card>
                </div>
              );
            })}
          </div>
        </div>
      </Host>
    );
  }
}
