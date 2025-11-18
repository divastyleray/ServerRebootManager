export interface RebootSchedule {
  date: string;
  time: string;
  timezone?: string;
}

export interface RebootScheduleRequest {
  serverId: string;
  scheduledAt: string;
}
