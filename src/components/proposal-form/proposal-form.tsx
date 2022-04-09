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

  renderTags() {
    return this.tagValues.map(tag => <ukg-chip onClick={ev => this.toggleChip(ev)}>{tag}</ukg-chip>);
  }

  renderSelectOptions(opts) {
    return opts.map(o => <ukg-select-option value={o} label={o} />);
  }

  toggleChip(ev) {
    const chip = ev.target.closest('ukg-chip');
    chip.selected = !chip.selected;
  }

  render() {
    return (
      <Host>
        <div>
          <ukg-input-container>
            <ukg-label text-wrap>Title</ukg-label>
            <ukg-input required></ukg-input>
          </ukg-input-container>

          <ukg-input-container size="maximum">
            <ukg-label text-wrap>Description</ukg-label>
            <ukg-textarea required></ukg-textarea>
          </ukg-input-container>

          <ukg-input-container size="maximum">
            <ukg-label text-wrap>Category</ukg-label>
            <ukg-select header="Label" select-state="secondary">
              {this.renderSelectOptions(this.categories)}
            </ukg-select>
          </ukg-input-container>

          <ukg-input-container size="maximum">
            <ukg-label text-wrap>Voting Month</ukg-label>
            <ukg-select header="Label" select-state="secondary">
              {this.renderSelectOptions(this.months)}
            </ukg-select>
          </ukg-input-container>

          <ukg-chip-group align="left" error="false" error-label="Error" fitted-type="none" label="Tags" aria-label="Tags">
            {this.renderTags()}
          </ukg-chip-group>
        </div>

        <div class="task-drawer-footer">
          <ukg-divider></ukg-divider>

          <ukg-button-group right-align no-margin>
            <ukg-button size="medium" emphasis="high">
              Cancel
            </ukg-button>
            <ukg-button size="medium" emphasis="high">
              Submit
            </ukg-button>
          </ukg-button-group>
        </div>
      </Host>
    );
  }
}
