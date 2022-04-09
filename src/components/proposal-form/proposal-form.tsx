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

  stepperEl;
  finalStep;
  titleInput;
  descriptionInput;
  categoryInput;
  votingMonInput;
  tagInput;

  proposalService = new ProposalService();

  @State() titleInputDisabled: boolean = true;
  @State() descriptionInputDisabled: boolean = true;
  @State() categoryInputDisabled: boolean = true;

  @Listen('ukgInput')
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

  renderTags() {
    return this.tagValues.map(tag => (
      <ukg-chip value={tag} onClick={ev => this.toggleChip(ev)}>
        {tag}
      </ukg-chip>
    ));
  }

  renderSelectOptions(opts) {
    return opts.map(o => <ukg-select-option value={o} label={o} />);
  }

  toggleChip(ev) {
    const chip = ev.target.closest('ukg-chip');
    chip.selected = !chip.selected;
  }

  async clearProposalForm() {
    this.titleInput.value = null;
    this.descriptionInput.value = null;
    this.categoryInput.value = null;
    this.votingMonInput.value = null;
    const chips = this.tagInput.querySelectorAll('ukg-chip');
    chips.forEach(chip => (chip.selected = false));
    this.stepperEl.clear();
  }

  getSelectedTags() {
    const chips = this.tagInput.querySelectorAll('ukg-chip');
    return [...chips].filter(chip => chip.selected).map(chip => chip.value);
  }

  async getValues() {
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const category = this.categoryInput.value;
    const votingMonth = this.votingMonInput.value;
    const tags = this.getSelectedTags().join(',');
    const values = {
      title: title,
      description: description,
      category: category,
      votingMonth: votingMonth,
      tags: tags,
    };

    const signer = await this.proposalService.getSigner();
    this.proposalService.createProposal(signer,JSON.stringify(values));
    console.log(JSON.stringify(values));
  }

  render() {
    return (
      <Host>
        <ukg-stepper ref={el => (this.stepperEl = el)}>
          <ukg-step is-active step="1">
            Title
            <form slot="content">
              <ukg-input-container>
                <ukg-input ref={el => (this.titleInput = el)}></ukg-input>
              </ukg-input-container>
              <ukg-button emphasis="mid" ukg-stepper-next-button disabled={this.titleInputDisabled}>
                Continue
              </ukg-button>
            </form>
          </ukg-step>
          <ukg-step step="2">
            Description
            <form slot="content">
              <ukg-input-container size="maximum">
                <ukg-textarea ref={el => (this.descriptionInput = el)}></ukg-textarea>
              </ukg-input-container>
              <ukg-button emphasis="mid" ukg-stepper-next-button disabled={this.descriptionInputDisabled}>
                Continue
              </ukg-button>
            </form>
          </ukg-step>
          <ukg-step step="3">
            Category
            <form slot="content">
              <ukg-input-container size="maximum">
                <ukg-select header="Label" select-state="secondary" ref={el => (this.categoryInput = el)}>
                  {this.renderSelectOptions(this.categories)}
                </ukg-select>
              </ukg-input-container>
              <ukg-button emphasis="mid" ukg-stepper-next-button disabled={this.categoryInputDisabled}>
                Continue
              </ukg-button>
            </form>
          </ukg-step>
          <ukg-step step="4">
            Voting Month
            <form slot="content">
              <ukg-input-container size="maximum">
                <ukg-select header="Label" select-state="secondary" ref={el => (this.votingMonInput = el)}>
                  {this.renderSelectOptions(this.months)}
                </ukg-select>
              </ukg-input-container>
              <ukg-button emphasis="mid" ukg-stepper-next-button>
                Continue
              </ukg-button>
            </form>
          </ukg-step>
          <ukg-step step="5" ref={el => (this.finalStep = el)}>
            Tags
            <form slot="content">
              <ukg-chip-group align="left" error="false" error-label="Error" fitted-type="none" aria-label="Tags" ref={el => (this.tagInput = el)}>
                {this.renderTags()}
              </ukg-chip-group>
              <ukg-button emphasis="mid" onClick={() => this.getValues()}>
                Submit
              </ukg-button>
            </form>
          </ukg-step>
        </ukg-stepper>
        <ukg-button-group right-align>
          <ukg-button emphasis="mid" onClick={() => this.clearProposalForm()}>
            Clear
          </ukg-button>
        </ukg-button-group>
      </Host>
    );
  }
}
