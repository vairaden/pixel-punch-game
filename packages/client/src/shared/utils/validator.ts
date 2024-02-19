import { RegisterOptions } from 'react-hook-form';

export const loginValidator: RegisterOptions = {
  required: 'Поле обязательно для заполнения!',
  pattern: {
    value: /^(?=[a-zA-Z0-9_-]{3,20}$)(?!\d+$)[a-zA-Z0-9_-]+$/,
    message: 'от 3 до 20 символов, латиница, может содержать цифры!',
  },
  minLength: {
    value: 3,
    message: 'Минимум 3 символа!',
  },
  maxLength: {
    value: 20,
    message: 'Максимум 20 символов!',
  },
};

export const passwordValidator: RegisterOptions = {
  required: 'Поле обязательно для заполнения!',
  pattern: {
    value: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    message:
      'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра!',
  },
  minLength: {
    value: 8,
    message: 'Минимум 8 символов!',
  },
  maxLength: {
    value: 40,
    message: 'Максимум 40 символов!',
  },
};

export const emailValidator: RegisterOptions = {
  required: 'Поле обязательно для заполнения!',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    message:
      'может содержать цифры и спецсимволы вроде _ и -, обязательно должна быть @!',
  },
};

export const namelValidator: RegisterOptions = {
  required: 'Поле обязательно для заполнения!',
  pattern: {
    value: /^(?:[A-ZА-Я][a-zа-я])[а-яА-Яa-zA-Z][а-яa-z-]*$/,
    message:
      'первая буква должна быть заглавной, может содержать латиницу или кириллицу!',
  },
  minLength: {
    value: 3,
    message: 'Минимум 3 символа!',
  },
};
export const phoneValidator: RegisterOptions = {
  required: 'Поле обязательно для заполнения!',
  pattern: {
    value: /^\+?\d{11,12}$/,
    message: 'от 10 до 15 символов, состоит из цифр, может начинаться с плюса!',
  },
  minLength: {
    value: 10,
    message: 'Минимум 10 символов!',
  },
  maxLength: {
    value: 15,
    message: 'Максимум 15 символов!',
  },
};
