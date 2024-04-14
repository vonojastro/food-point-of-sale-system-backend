export interface EmployeeAttendance {
  attendanceId?: string;
  posType: string;
  userId?: string | null;
  employeeId: string;
  date: string; // Change type to string
  startTime: string; // Change type to string
  endTime: string; // Change type to string
  status: string;
  remarks?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Typings for ScheduleDefault model
export interface ScheduleDefault {
  ruleId?: string;
  posType: string;
  userId?: string | null;
  scheduleName: string;
  description: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
