const { z } = require("zod");

const userSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of 3 charecters" })
    .max(255, { message: "Name must not be more than 255 charecters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be of 3 charecters" })
    .max(255, { message: "Email must not be more than 255 charecters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, { message: "Password must be of 3 charecters" })
    .max(255, { message: "Password must not be more than 255 charecters" })
});


module.exports = userSchema;