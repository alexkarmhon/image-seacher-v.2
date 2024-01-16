export default class LoadMoreButton {
  constructor({ selector, hidden = false }) {
    // this.refs = this.getRefs(selector);
    this.button = document.querySelector(selector);
    this.label = this.button.querySelector('.label');
    this.spinner = this.button.querySelector('.spinner');
    hidden&&this.hide()
  }

  // getRefs(selector) {
  //   const refs = {};
  //   refs.button = document.querySelector(selector);
  //   refs.label = refs.button.querySelector('.label');
  //   refs.spinner = refs.button.querySelector('.spinner');
  //   return refs;
  // }

  enable() { 
    this.button.disabled = false;
    this.label.textContent = 'Show more';
    this.spinner.classList.add('is-hidden');
  }
  
  disable() { 
    this.button.disabled = true;
    this.label.textContent = 'Loading...';
    this.spinner.classList.remove('is-hidden');
  }
  
  show() { 
    this.button.classList.remove('is-hidden');
  }
  
  hide() { 
    this.button.classList.add('is-hidden')
  }
}