import express from "express";
import {generateUserToken, userCredentialSchema} from "./auth.services";

export const loginUser = async (req: express.Request, res: express.Response) => {
    try {
        const parsed = userCredentialSchema.parse(req.body);
        const token = await generateUserToken(parsed);
        if (!token) {
            return res.status(401).json({"message": "Credentials incorrect"});
        }
        return res.status(200).json({"token": token})
    } catch (err) {
        return res.status(400).json({ error: 'Invalid input' });
    }
}