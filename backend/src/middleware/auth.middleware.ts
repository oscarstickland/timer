import express from "express";
import * as jwt from "jsonwebtoken";
import {z} from "zod";

const payloadSchema = z.object({
    id: z.number()
})

export const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Check if the token is in the cookies
    const token = req.cookies['token'];
    if (!token) { return res.status(401).json({ error: 'No token' }); }

    // Verify the JWT Token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = payloadSchema.parse(payload);

        next();
    } catch {
        return res.sendStatus(401);
    }

}