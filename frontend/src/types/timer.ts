export type Timer = {
    id: number;
    name: string;
}

export type ActiveSession = {
    id: number,
    timerId: number
    startTime: Date,
    endTime: Date | null,
}
