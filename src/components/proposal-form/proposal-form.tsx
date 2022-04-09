import { Component, Host, h } from '@stencil/core';

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
    this.stepperEl.clear();
  }

  getSelectedChips() {
    const chips = this.tagInput.querySelectorAll('ukg-chip');
    return [...chips].filter(chip => chip.selected).map(chip => chip.value);
  }

  getValues() {
    console.log(this.titleInput.value);
    console.log(this.descriptionInput.value);
    console.log(this.categoryInput.value);
    console.log(this.votingMonInput.value);
    console.log(this.getSelectedChips());
  }

  render() {
    return (
      <Host>
        <ukg-stepper ref={el => (this.stepperEl = el)}>
          <ukg-step is-active step="1">
            Proposal Title
            <form slot="content">
              <ukg-input-container>
                <ukg-input required ref={el => (this.titleInput = el)}></ukg-input>
              </ukg-input-container>
              <ukg-button emphasis="mid" ukg-stepper-next-button>
                Continue
              </ukg-button>
            </form>
          </ukg-step>
          <ukg-step step="2">
            Description
            <form slot="content">
              <ukg-input-container size="maximum">
                <ukg-textarea required ref={el => (this.descriptionInput = el)}></ukg-textarea>
              </ukg-input-container>
              <ukg-button emphasis="mid" ukg-stepper-next-button>
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
              <ukg-button emphasis="mid" ukg-stepper-next-button>
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
              <ukg-button-group right-align>
                <ukg-button emphasis="mid" onClick={() => this.getValues()}>
                  Submit
                </ukg-button>
              </ukg-button-group>
            </form>
          </ukg-step>
        </ukg-stepper>
        <ukg-button-group right-align>
          <ukg-button emphasis="mid" onClick={() => this.stepperEl.clear()}>
            Clear
          </ukg-button>
        </ukg-button-group>
      </Host>
    );
  }
}
