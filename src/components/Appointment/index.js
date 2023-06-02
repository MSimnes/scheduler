import React from 'react';
import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVE = "SAVE";



export default function Appointment(props) {
  

  // creates an interview object
  //passes the interview object to props.bookInterview
  //transitions to the SHOW mode
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview)
    transition(SHOW);
  }
  console.log("props.interview:", props.interview)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <>
    <Header time={props.time} />
    
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
    {mode === EDIT && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={() => console.log("onSave triggered")} />}
    {mode === SAVE && <h1>Saving</h1>}


    <article className="appointment"></article>
    </>
  )
}
