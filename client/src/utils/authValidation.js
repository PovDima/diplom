import * as Yup from "yup";

const loginValidation = Yup.object({
  email: Yup.string().email().min(5).max(50).required("Required"),
  password: Yup.string().min(5).max(255).required("Required"),
});

const passwordValidation = Yup.object({
  password: Yup.string().min(5).max(255).required("Required"),
});

const emailValidation = Yup.object({
  email: Yup.string().email().min(5).max(255).required("Required"),
});

const registrationValidation = Yup.object({
  email: Yup.string().email().min(5).max(255).required("Required"),
  password: Yup.string().min(5).max(255).required("Required"),
});

export {
  registrationValidation,
  passwordValidation,
  emailValidation,
  loginValidation
}
