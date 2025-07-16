import bcrypt from 'bcrypt';
import {z} from "zod";
import * as jwt from "jsonwebtoken";
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

export const userCredentialSchema = z.object({
    email: z.string(),
    password: z.string(),
})

/**
 * Fetch the user based on the provided credentials.
 * Will compare the provided password with the hashed db password
 * @param credentials email & password
 *
 * @returns jwt token (or null)
 */
export const generateUserToken = async (credentials: z.infer<typeof userCredentialSchema>) => {
    const user = await PrismaInstance.user.findUnique({
        where: { email: credentials.email },
    });
    if (!user) return null;

    // check if pwd matches
    const passwordMatched = await bcrypt.compare(credentials.password, user.password);
    if (!passwordMatched) return null;

    // if it does - then generate JWT token
    const secret = (process.env.JWT_SECRET as string);
    return jwt.sign({ id: user.id }, secret, { expiresIn: "10d" });
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