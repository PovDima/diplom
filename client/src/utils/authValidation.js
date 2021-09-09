import * as Yup from "yup";

Yup.setLocale({
  string: {
    min: ({ min, path }) => `Мінімальне значення для паролю ${min}`,
    max: ({ max, path }) => `Максимальне значення для паролю ${max}`,
    email: 'Введіть коректну пошту'
  },
})

const loginValidation = Yup.object({
  email: Yup.string().email().max(255).required("Пошта обов'язкова"),
  password: Yup.string().min(5).max(255).required("Пароль обов'язковий"),
});

const passwordValidation = Yup.object({
  password: Yup.string().min(5).max(255).required("Пароль обов'язковий"),
});

const emailValidation = Yup.object({
  email: Yup.string().email().max(255).required("Пошта обов'язкова"),
});

const registrationValidation = Yup.object({
  email: Yup.string().email().max(255).required("Пошта обов'язкова"),
  password: Yup.string().min(5).max(255).required("Пароль обов'язковий"),
});

export {
  registrationValidation,
  passwordValidation,
  emailValidation,
  loginValidation
}
