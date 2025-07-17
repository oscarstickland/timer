import {z} from "zod";
import {PrismaInstance} from "../db/prisma";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const credentialsSchema = z.object({
    email: z.string(),
    password: z.string()
});

export enum LoginUserStatus {
    OK = "Ok",
    INCORRECT_DETAILS = "incorrect_details",
}
type LoginUserResult =
    | { status: LoginUserStatus.OK, token: string }
    | { status: LoginUserStatus.INCORRECT_DETAILS }

export const loginUser = async (credentials: z.infer<typeof credentialsSchema>): Promise<LoginUserResult> => {
    const user = await PrismaInstance.user.findUnique({
        where: { email: credentials.email },
    });
    if (!user) return { status: LoginUserStatus.INCORRECT_DETAILS };

    // check if pwd matches
    const passwordMatched = await bcrypt.compare(credentials.password, user.password);
    if (!passwordMatched) return { status: LoginUserStatus.INCORRECT_DETAILS };

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "10d" });
    return { status: LoginUserStatus.OK, token: token };
}