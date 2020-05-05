import {errors} from '../constants/constants';

export default class SearchInput {
    constructor(sendRequest, element) {
        this._element = element;
        this._input = element.querySelector('.search__input');
        this._button = element.querySelector('.search__button')
        this._sendRequest = sendRequest;

        this._submit = this._submit.bind(this);
        this._validate = this._validate.bind(this);
    }

    addEventListener() {
        this._element.addEventListener('submit', this._submit);
        this._element.addEventListener('input', this._validate);
    }

    setLSInputValue(value) {
        this._input.value = value;
        this._button.removeAttribute('disabled');
        this._button.classList.add('search__button_active');
    }

    _submit(event) {
        event.preventDefault();
        this._sendRequest(this._input.value);
    }

    _validate(event) {
        if (event.target.validity.valueMissing) {
            this._input.placeholder = errors.isRequired;
        }

        if (this._element.checkValidity()) {
            this._button.removeAttribute('disabled');
            this._button.classList.add('search__button_active');
        } else {
            this._button.setAttribute('disabled', true);
            this._button.classList.remove('search__button_active');
        }
    }
}