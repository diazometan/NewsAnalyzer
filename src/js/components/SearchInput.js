import {errors} from '../constants/constants';

export default class SearchInput {
    constructor(sendRequest, element) {
        this._element = element;
        this._input = element.querySelector('.search__input');
        this._button = element.querySelector('.search__button')
        this._sendRequest = sendRequest;

        this._submit = this._submit.bind(this);
        this._validate = this._validate.bind(this);
        this.setFormEnabled = this.setFormEnabled.bind(this);
        this.setFormDisabled = this.setFormDisabled.bind(this);
    }

    addEventListener() {
        this._element.addEventListener('submit', this._submit);
        this._element.addEventListener('input', this._validate);
    }

    setLSInputValue(value) {
        this._input.value = value;
        this._enabledButton();
    }

    setFormDisabled() {
        this._disableButton();
        this._toggleInput();
    }

    setFormEnabled() {
        this._enabledButton();
        this._toggleInput();
    }

    _submit(event) {
        event.preventDefault();
        this._sendRequest(this._input.value);
    }

    _validate(event) {
        if (event.target.validity.valueMissing) {
            this._input.placeholder = errors.isRequired;
        }

        console.log(this._element.checkValidity());
        if (this._element.checkValidity()) {
            this._enabledButton();
        } else {
            this._disableButton();
        }
    }

    _disableButton() {
        this._button.setAttribute('disabled', true);
        this._button.classList.remove('search__button_active');
    }

    _enabledButton() {
        this._button.removeAttribute('disabled');
        this._button.classList.add('search__button_active');
    }

    _toggleInput() {
        this._input.toggleAttribute('disabled');
    }
}