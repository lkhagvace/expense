import * as yup from "yup";
export const signinUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .max(50)
    .required("Requred!"),
  password: yup.string().min(4).max(20).required(),
});
