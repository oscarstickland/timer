import {PrismaInstance} from "../../db/prisma";
import {TimerSession} from "@prisma/client";

export enum StartSessionStatus {
    OK = 'ok',
    TIMER_NOT_FOUND = 'timer_not_found',
    SESSION_ALREADY_STARTED = 'session_already_started',
}
type StartSessionResult =
    | { status: StartSessionStatus.OK, data: TimerSession }
    | { status: StartSessionStatus.TIMER_NOT_FOUND }
    | { status: StartSessionStatus.SESSION_ALREADY_STARTED }

/**
 * Creates a new session for the specific timer. Will confirm that there is no existing session running for the user.
 *
 * @param timerId timer id to start
 * @param userId the user id that has made the request
 *
 * @returns StartSessionResult
 */
export const startSession = async (timerId: number, userId: number): Promise<StartSessionResult> => {
    const timer = await PrismaInstance.timer.findUnique({
        where: { id: timerId, userId: userId }
    });
    if (!timer) { return { status: StartSessionStatus.TIMER_NOT_FOUND }; }

    // confirm no session is currently running
    const sessions = await PrismaInstance.timerSession.findMany({
        where: {
            endTime: null,
            timer: { userId: userId, }
        },
    });
    if (sessions.length > 0) { return { status: StartSessionStatus.SESSION_ALREADY_STARTED }; }

    // otherwise - create new session (we leave startTime blank as it will default to now)
    const session = await PrismaInstance.timerSession.create({
        data: { timerId: timerId },
    });

    return { status: StartSessionStatus.OK, data: session };
}

export enum StopSessionStatus {
    OK = 'ok',
    TIMER_NOT_FOUND = 'timer_not_found',
    SESSION_NOT_STARTED = 'session_not_started',
}
type StopSessionResult =
    | { status: StopSessionStatus.OK, data: TimerSession }
    | { status: StopSessionStatus.TIMER_NOT_FOUND }
    | { status: StopSessionStatus.SESSION_NOT_STARTED };

/**
 * Stops the session for the specific timer
 *
 * @param timerId timer id to stop
 * @param userId the user id that has made the request
 *
 * @returns StopSessionResult
 */
export const stopSession = async (timerId: number, userId: number): Promise<StopSessionResult> => {
    const timer = await PrismaInstance.timer.findUnique({
        where: { id: timerId, userId: userId, }
    });
    if (!timer) { return { status: StopSessionStatus.TIMER_NOT_FOUND }; }

    // now - find the session
    const sessions = await PrismaInstance.timerSession.findMany({
        where: { timerId: timerId },
    });
    if (sessions.length === 0) { return { status: StopSessionStatus.SESSION_NOT_STARTED }; }

    // TODO - handle the instance where multiple timers are running
    const updatedSession = await PrismaInstance.timerSession.update({
        where: {
            id: sessions[0].id
        },
        data: {
            endTime: new Date()
        },
    });

    return { status: StopSessionStatus.OK, data: updatedSession };
}

export enum GetActiveSessionStatus {
    OK = 'ok',
    SESSION_NOT_STARTED = 'session_not_started',
}
type GetActiveSessionResult =
    | { status: GetActiveSessionStatus.OK, data: TimerSession }
    | { status: GetActiveSessionStatus.SESSION_NOT_STARTED };
export const getActiveSession = async (userId: number): Promise<GetActiveSessionResult> => {
    const sessions = await PrismaInstance.timerSession.findMany({
        where: { timer: { userId: userId }, endTime: null },
    });
    if (sessions.length === 0) return { status: GetActiveSessionStatus.SESSION_NOT_STARTED };

    // TODO - handle instance where two timers are accidentally running
    const session = sessions[0];
    return { status: GetActiveSessionStatus.OK, data: session };
}