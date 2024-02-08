import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const signupUserSchema = yup.object().shape({
  name: yup.string().min(2).max(50).required(),
  email: yup.string().email().min(5).max(50).required("Email required!"),
  password: yup
    .string()
    .min(4)
    .matches(passwordRules, { message: "Need a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
});
