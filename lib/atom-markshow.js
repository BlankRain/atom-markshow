'use babel';

import AtomMarkshowView from './atom-markshow-view';
import { CompositeDisposable } from 'atom';

export default {

  atomMarkshowView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomMarkshowView = new AtomMarkshowView(state.atomMarkshowViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
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
    console.log('MarkShow was toggled!');
    var d = atom.config.get('atom-nodeppt-oncemore.dir');
    d = d.replace('~', this.getUserHome());

    var pptConfig = {
        port: atom.config.get('atom-nodeppt-oncemore.port') || 9527,
        dir: d
    };
    if (this.modalPanel.isVisible()) {
        ppt.stop();
    } else {
        ppt.start(pptConfig);
    }
    return (
        this.modalPanel.isVisible() ?
        this.modalPanel.hide() :
        this.modalPanel.show()
    );
  }
  ,config: {
        port: {
            type: 'integer',
            default: 9527,
            title: 'listen port',
            description: 'local server listen port'
        },
        dir: {
            type: 'string',
            default: '~/markshowppts',
            title: 'ppt workspace',
            description: 'dir for ppts'
        }
    }
  ,getUserHome() {
      return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }

};
