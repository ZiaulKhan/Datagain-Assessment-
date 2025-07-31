import * as yup from "yup";

export const appealSchema = yup.object({
  taxYear: yup
    .number()
    .typeError("Tax Year must be a number")
    .required("Tax Year is required")
    .min(2000, "Year must be >= 2000")
    .max(new Date().getFullYear(), "Year can't be in the future"),

  company: yup
    .string()
    .required("Company is required")
    .max(100, "Company name too long"),

  state: yup
    .string()
    .required("State is required")
    .length(2, "Use state code like 'CA' or 'NY'"),

  assessor: yup
    .string()
    .required("Assessor is required")
    .max(100, "Assessor name too long"),

  account: yup
    .string()
    .required("Account is required")
    .max(100, "Account number too long"),

  appealedDate: yup.string().required("Appealed Date is required"),

  status: yup
    .string()
    .required("Status is required")
    .oneOf(["Sent", "Not Sent"], "Invalid status"),
});
