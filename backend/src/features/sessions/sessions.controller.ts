import express from "express";
import * as sessionServices from "./sessions.services";
import {z, ZodError} from "zod";
import {GetActiveSessionStatus, StartSessionStatus, StopSessionStatus} from "./sessions.services";

export const startSession = async (req: express.Request, res: express.Response) => {
    try {
        const timerId = z.coerce.number().parse(req.params['timerId']);
        const result = await sessionServices.startSession(timerId, req.user.id);

        switch (result.status) {
            case StartSessionStatus.OK:
                return res.status(200).json(result.data)
            case StartSessionStatus.TIMER_NOT_FOUND:
                return res.status(400).json({"error": `Could not find timer with id ${timerId}`});
            case StartSessionStatus.SESSION_ALREADY_STARTED:
                return res.status(400).json({"error": "Session has already started"});
        }
    } catch (e){
        if (e instanceof ZodError) {
            return res.status(400).send();
        }

        return res.status(500).send();
    }
}

export const stopSession = async (req: express.Request, res: express.Response) => {
    try {
        const timerId = z.coerce.number().parse(req.params['timerId']);
        const result = await sessionServices.stopSession(timerId, req.user.id);

        switch (result.status) {
            case StopSessionStatus.OK:
                return res.status(200).json(result.data)
            case StopSessionStatus.TIMER_NOT_FOUND:
                return res.status(400).json({"error": `Could not find timer with id ${timerId}`});
            case StopSessionStatus.SESSION_NOT_STARTED:
                return res.status(400).json({"error": "Session has not been started"});
        }
    } catch (e){
        if (e instanceof ZodError) {
            return res.status(400).send();
        }

        return res.status(500).send();
    }
}

export const getActiveSession = async (req: express.Request, res: express.Response) => {
    try {
        const result = await sessionServices.getActiveSession(req.user.id);

        switch (result.status) {
            case GetActiveSessionStatus.OK:
                return res.status(200).json(result.data)
            case GetActiveSessionStatus.SESSION_NOT_STARTED:
                return res.status(400).json({"error": "Session has not been started"});
        }
    } catch (e){
        if (e instanceof ZodError) {
            return res.status(400).send();
        }

        return res.status(500).send();
    }
}