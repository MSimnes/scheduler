import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // creates an interview object
  //passes the interview object to props.bookInterview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }
  // passes the appointment id to props.cancelInterview
  // transitions to the EMPTY mode
  function cancel(event) {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time} />

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            student={props.interview.student}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            onClose={() => back()}
            message={"Could not save appointment"}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            onClose={() => back()}
            message={"Could not delete appointment"}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            onCancel={() => back()}
            onConfirm={cancel}
            message={"Delete the appointment?"}
          />
        )}
        {mode === DELETE && <Status message={"Deleting"} />}
        {mode === SAVING && <Status message={"Saving"} />}
      </article>
    </>
  );
}
