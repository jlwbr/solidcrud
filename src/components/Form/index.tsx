import { createTsForm, createUniqueFieldSchema } from "@ts-react/form";
import { z } from "zod";
import TextField from "./TextField";
import SelectField from "./SelectField";

export const EnumField = createUniqueFieldSchema(
    z.string(),
    "enum" // You need to pass a string ID, it can be anything but has to be set explicitly and be unique.
);

// create the mapping
const mapping = [
    [z.string(), TextField],
    [EnumField, SelectField],
    [z.number(), TextField]
] as const; // 👈 `as const` is necessary

// A typesafe React component
const Form = createTsForm(mapping);

export default Form;