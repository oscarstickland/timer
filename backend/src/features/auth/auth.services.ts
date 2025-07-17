import bcrypt from 'bcrypt';
import {z} from "zod";
import {PrismaInstance} from "../../db/prisma";

const UserSelectFields = {
    firstName: true,
    lastName: true,
    email: true
}

export const newUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
});


/**
 * Create a user based on the provided credentials
 * @param user
 */
export const createUser = async (user: z.infer<typeof newUserSchema>) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    return PrismaInstance.user.create({
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
        }
    });
}

/**
 * Fetch the user by user id
 * @param id
 * @returns null if the user doesn't exist
 */
export const fetchUserById = async (id: number) => {
    return PrismaInstance.user.findUnique({
        where: { id: id },
        select: UserSelectFields,
    });
}