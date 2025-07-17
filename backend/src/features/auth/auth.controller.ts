import express from "express";
import {fetchUserById} from "./auth.services";

export const getUser = async (req: express.Request, res: express.Response) => {
    const user = await fetchUserById(req.user.id);
    if (!user) { return res.status(401); }

    return res.status(200).json(user);
}