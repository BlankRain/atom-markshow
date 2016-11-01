'use babel';

export default class AtomMarkshowView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('atom-markshow');

        // Create message element
        const message = document.createElement('div');
        message.textContent = 'MarkShow 本地预览已激活!';
        message.classList.add('message');
        this.element.appendChild(message);

    }

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
        this.element.remove();
    }

    getElement() {
        return this.element;
    }

}
