'use babel';

import AtomMarkshowView from './atom-markshow-view';
import { CompositeDisposable } from 'atom';

export default {

  atomMarkshowView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomMarkshowView = new AtomMarkshowView(state.atomMarkshowViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomMarkshowView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-markshow:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomMarkshowView.destroy();
  },

  serialize() {
    return {
      atomMarkshowViewState: this.atomMarkshowView.serialize()
    };
  },

  toggle() {
    console.log('AtomMarkshow was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
