import express from "express";
import * as timerServices from "./timer.services";
import {z} from "zod";


/**
 * Creates a specific timer
 * @param req
 * @param res
 */
export const createTimer = async (req: express.Request, res: express.Response) => {
    try {
        const parsed = timerServices.createTimerSchema.parse(req.body);
        const timer = await timerServices.createTimer(parsed, req.user.id);
        return res.status(201).json(timer);
    } catch (e) {
        res.status(500).json({"error": e});
    }
}

/**
 * Returns all the timers for the particular user
 * @param req
 * @param res
 */
export const listTimers = async (req: express.Request, res: express.Response) => {
    try {
        const timers = await timerServices.getTimersByUserId(req.user.id);
        return res.status(200).json(timers);
    } catch (e) {
        return res.status(500).json({"error": e});
    }
}


export const getSingleTimer = async (req: express.Request, res: express.Response) => {
    try {
        const timerId = z.coerce.number().parse(req.params['timerId']);
        const timer = await timerServices.getTimerById(timerId, req.user.id);

        if (!timer) { return res.status(404).json({"error": `Could not find timer with id ${timerId}`}); }

        return res.status(200).json(timer);
    } catch (e) {
        return res.status(500).json({"error": e});
    }
}