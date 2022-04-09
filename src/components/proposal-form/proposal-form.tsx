import { Component, Host, h, Listen, State } from '@stencil/core';
import ProposalService from '../../services/proposal.services';

@Component({
  tag: 'proposal-form',
  styleUrl: 'proposal-form.css',
  scoped: true,
})
export class ProposalForm {
  tagValues = ['community', 'education', 'parks', 'rec', 'sports', 'events', 'art', 'budget', 'money', 'initiative'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  categories = ['Education', 'Parks and Recreation', 'Budget', 'Restoration', 'Events'];

  titleInput;
  descriptionInput;
  categoryInput;
  votingMonInput;
  tagInput;
  stepperEl;

  proposalService = new ProposalService();

  @State() titleInputDisabled: boolean = true;
  @State() descriptionInputDisabled: boolean = true;
  @State() categoryInputDisabled: boolean = true;

  @Listen('ukgChange')
  handleInput(ev) {
    if (ev.target === this.titleInput) {
      this.titleInputDisabled = ev.target.value ? false : true;
    } else if (ev.target === this.descriptionInput) {
      this.descriptionInputDisabled = ev.target.value ? false : true;
    } else if (ev.target === this.categoryInput) {
      this.categoryInputDisabled = ev.target.value ? false : true;
    }
  }

  @Listen('keydown')
  handleKey(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      this.stepperEl.next();
    }
  }

  renderTags() {
    return this.tagValues.map(tag => (
      <ukg-chip value={tag} onClick={ev => this.toggleChip(ev)}>
        {tag}
      </ukg-chip>
    ));
  }

  renderSelectOptions(opts, months = false) {
    return opts.map((o, index) => <ukg-select-option value={months ? `${index + 1}` : o} label={o} />);
  }

  toggleChip(ev) {
    const chip = ev.target.closest('ukg-chip');
    chip.selected = !chip.selected;
  }

  getSelectedTags() {
    const chips = this.tagInput.querySelectorAll('ukg-chip');
    return [...chips].filter(chip => chip.selected).map(chip => chip.value);
  }

  async submitProposal() {
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const category = this.categoryInput.value;
    const votingMonth = new Date(2022, parseInt(this.votingMonInput.value)).toDateString();
    const tags = this.getSelectedTags().join(',');
    const values = {
      title: title,
      description: description,
      category: category,
      votingMonth: votingMonth,
      tags: tags,
    };

    const signer = await this.proposalService.getSigner();
    this.proposalService.createProposal(signer, JSON.stringify(values));
    // console.log(JSON.stringify(values));
    return JSON.stringify(values);
  }

  render() {
    return (
      <Host>
        <ukg-stepper ref={el => (this.stepperEl = el)}>
          <ukg-step is-active step="1">
            Title
            <form slot="content">
              <ukg-input-container>
                <ukg-input id="title-input" ref={el => (this.titleInput = el)}></ukg-input>
              </ukg-input-container>
              <ukg-button-group right-align>
                <ukg-button emphasis="high" ukg-stepper-next-button disabled={this.titleInputDisabled}>
                  Continue
                </ukg-button>
              </ukg-button-group>
            </form>
          </ukg-step>
          <ukg-step step="2">
            Description
            <form slot="content">
              <ukg-input-container size="maximum">
                <ukg-textarea id="description-input" ref={el => (this.descriptionInput = el)}></ukg-textarea>
              </ukg-input-container>
              <ukg-button-group right-align>
                <ukg-button emphasis="high" ukg-stepper-next-button disabled={this.descriptionInputDisabled}>
                  Continue
                </ukg-button>
              </ukg-button-group>
            </form>
          </ukg-step>
          <ukg-step step="3">
            Category
            <form slot="content">
              <ukg-input-container size="maximum">
                <ukg-select id="category-input" header="Label" select-state="secondary" ref={el => (this.categoryInput = el)}>
                  {this.renderSelectOptions(this.categories)}
                </ukg-select>
              </ukg-input-container>
              <ukg-button-group right-align>
                <ukg-button emphasis="high" ukg-stepper-next-button disabled={this.categoryInputDisabled}>
                  Continue
                </ukg-button>
              </ukg-button-group>
            </form>
          </ukg-step>
          <ukg-step step="4">
            Voting Month
            <form slot="content">
              <ukg-input-container size="maximum">
                <ukg-select id="voting-mon-input" header="Label" select-state="secondary" ref={el => (this.votingMonInput = el)}>
                  {this.renderSelectOptions(this.months, true)}
                </ukg-select>
              </ukg-input-container>
              <ukg-button-group right-align>
                <ukg-button emphasis="high" ukg-stepper-next-button>
                  Continue
                </ukg-button>
              </ukg-button-group>
            </form>
          </ukg-step>
          <ukg-step step="5">
            Tags
            <form slot="content">
              <ukg-chip-group id="tag-input" align="left" error="false" error-label="Error" fitted-type="none" aria-label="Tags" ref={el => (this.tagInput = el)}>
                {this.renderTags()}
              </ukg-chip-group>
              <ukg-button-group right-align>
                <ukg-button emphasis="high" onClick={() => this.submitProposal()}>
                  Submit
                </ukg-button>
              </ukg-button-group>
            </form>
          </ukg-step>
        </ukg-stepper>
      </Host>
    );
  }
}
