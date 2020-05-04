import {errors} from '../constants/constants';

export default class SearchInput {
    constructor(callback, element) {
        this._element = element;
        this._callback = callback;

        this._submit = this._submit.bind(this);
    }

    addEventListener() {
        this._element.addEventListener('submit', this._submit);
    }

    setStorageInputValue(value) {
        this._element.querySelector('.search__input').value = value;
    }

    _submit(event) {
        event.preventDefault();

        //TODO: Validation
        this._callback(this._element.querySelector('.search__input').value);
        /* if (this._checkValidtion(event)) {
            this._callback(this._element.querySelector('.search__input').value);
        } */
    }

    _validate(event) {
        const form = event.target.closest('.search__form');

        if (form.elements.input.textLength === 0) {
            form.elements.input.setCustomValidity(errors.isRequired);
            //form.elements.button.setAttribute('disabled', true);
        }
        else {
            form.elements.input.setCustomValidity('');
            //form.elements.button.removeAttribute('disabled');
        }

        return form.checkValidity();
    }
}