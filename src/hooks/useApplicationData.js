import React, { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prevState => ({ ...prevState, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({ ...state, appointments });
    //make the request to the correct endpoint with id and interview object
    //upon response update the state with setState and the new appointments object
    //spread the previous state and add the new appointments object
    //transition to the SHOW mode
    return (
      axios.put(`/api/appointments/${id}`, { interview })
        .then((response) => {
          console.log("response:", response)
          setState(prev => ({ ...prev, appointments }))
        })
    )

  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, { interview })
        .then((response) => {
          console.log("response:", response)
          setState(prev => ({ ...prev, appointments }))
        })
    
  }
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
      .catch((error) => console.log("error:", error))
  }, [])
  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;