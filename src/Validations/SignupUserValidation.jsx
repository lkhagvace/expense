import * as yup from "yup";
export const signupUserSchema = yup.object().shape({
  name: yup.string().min(2).max(50).required(),
  email: yup.string().email().min(5).max(50).required(),
  password: yup.string().min(4).max(20).required(),
});
