import {PrismaInstance} from "../../db/prisma";
import {z} from "zod";

const TimerSelectFields = {
    id: true,
    name: true,
    sessions: true
}

export const createTimerSchema = z.object({
    name: z.string()
});

/**
 * Creates a timer in the database
 * @param data data required to create the timer
 * @param userId the user (id) creating the timer
 */
export const createTimer = (data: z.infer<typeof createTimerSchema>, userId: number) => {
    return PrismaInstance.timer.create({
        data: {
            userId: userId,
            name: data.name,
        },
        select: TimerSelectFields
    })
}

export const getTimersByUserId = (userId: number) => {
    return PrismaInstance.timer.findMany({
        where: { userId: userId },
        select: TimerSelectFields,
    });
}

export const getTimerById = (timerId: number, userId: number) => {
    return PrismaInstance.timer.findUnique({
        where: {
            id: timerId,
            userId: userId,
        },
        select: TimerSelectFields
    });
}