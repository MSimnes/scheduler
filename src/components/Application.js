import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prevState => ({ ...prevState, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  // create schedule object
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    //updates the state without mutating the original
    //updates the local state with the new appointment object
    //makes an axios request to update the database

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
      
      axios.put(`/api/appointments/${id}`, { interview })
        .then((response) => {
          console.log("response:", response)
          setState(prev => ({ ...prev, appointments }))
        })

    }




    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        interviewers={interviewers}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        console.log("all:", all[2].data)
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
      .catch((error) => console.log("error:", error))
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
