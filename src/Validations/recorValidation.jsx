import * as yup from "yup";
export const recordSchema = yup.object().shape({
  amount: yup.number().required("Must fill"),
  description: yup.string().min(2).max(50).required("Required"),
});
