-- CreateTable
CREATE TABLE "TimerSession" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "timerId" INTEGER NOT NULL,

    CONSTRAINT "TimerSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimerSession" ADD CONSTRAINT "TimerSession_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
