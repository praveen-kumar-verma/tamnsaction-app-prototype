
const zod = require("zod");

const userSchema = zod.object({
  userName: zod.string()
    .email({ message: "Username must be a valid email address" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" }),
  firstName: zod.string()
    .min(3, { message: "First name must be at least 3 characters long" })
    .max(50, { message: "First name must be at most 50 characters long" }),
  lastName: zod.string()
    .min(3, { message: "Last name must be at least 3 characters long" })
    .max(50, { message: "Last name must be at most 50 characters long" }),
  password: zod.string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const loginUserSchema = zod.object({
  userName: zod.string()
    .email({ message: "Username must be a valid email address" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" }),
  password: zod.string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
const updateUserSchema = zod.object({
  firstName: zod.string()
  .min(3, { message: "First name must be at least 3 characters long" })
  .max(50, { message: "First name must be at most 50 characters long" })
  .optional(),
  lastName: zod.string()
  .min(3, { message: "Last name must be at least 3 characters long" })
  .max(50, { message: "Last name must be at most 50 characters long" })
  .optional(),
  password: zod.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .optional(),
})

module.exports = {userSchema, loginUserSchema,updateUserSchema};
