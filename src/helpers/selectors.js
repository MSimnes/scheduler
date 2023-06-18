export function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredDays = state.days.filter((item) => item.name === day);
  if (filteredDays.length === 0) {
    return result;
  }

  if (filteredDays.length > 0) {
    for (let item of filteredDays[0].appointments) {
      result.push(state.appointments[item]);
    }
  }

  return result;
}

export function getInterviewersForDay(state, day) {
  const result = [];

  const filteredDays = state.days.filter((item) => item.name === day);
  if (filteredDays.length === 0) {
    return result;
  }

  if (filteredDays.length > 0) {
    for (let item of filteredDays[0].interviewers) {
      result.push(state.interviewers[item]);
    }
  }

  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return result;
}
