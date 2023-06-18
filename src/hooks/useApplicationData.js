import { useState, useEffect } from "react";
import axios from "axios";

// state is centralized in this file

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prevState) => ({ ...prevState, day }));

  const spotsRemaining = (appointments) => {
    const currentDay = state.days.find((day) => state.day === day.name);
    let daySpots = 0;
    currentDay.appointments.forEach((appointmentId) => {
      if (!appointments[appointmentId].interview) {
        daySpots += 1;
      }
    });
    const updateDay = { ...currentDay, spots: daySpots };
    return state.days.map((day) => (state.day === day.name ? updateDay : day));
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => ({
          ...prev,
          appointments,
          days: spotsRemaining(appointments),
        }));
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => ({ ...prev, appointments }));
        const days = state.days.map((day) => {
          if (day.name === state.day) {
            day.spots += 1;
          }
          return day;
        });
        setState((prev) => ({ ...prev, days }));
      });
  }
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => console.log("error:", error));
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
