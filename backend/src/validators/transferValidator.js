const zod = require("zod")

const transferSchema = zod.object({
    to: zod.string().nonempty(), // Ensures that the string is not empty
    amount: zod.union([zod.number(), zod.string().regex(/^\d+$/)]).transform((val) => Number(val)),
});

module.exports = {transferSchema}