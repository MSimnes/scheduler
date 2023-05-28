export function getAppointmentsForDay (state, day) {
  const result = [];
  // retrieve the corresponding days object from the state object for the given day
  const filteredDays = state.days.filter((item) => item.name === day);
  if (filteredDays.length === 0) {
    return result;
  }
  // access the appointments array and 
  // use the values as keys to retrieve the corresponding appointment objects
  if (filteredDays.length > 0) {
    for (let item of filteredDays[0].appointments) {
      result.push(state.appointments[item])
    }
  }

  return result;
}
