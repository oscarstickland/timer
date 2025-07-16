import express from "express";
import * as jwt from "jsonwebtoken";
import {z} from "zod";

const payloadSchema = z.object({
    id: z.number()
})

export const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) return res.sendStatus(401);

    // Verify the JWT Token
    try {
        const token = header.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = payloadSchema.parse(payload);

        next();
    } catch {
        return res.sendStatus(401);
    }

}