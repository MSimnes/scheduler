import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

function Form(props) { 
  const [student, setStudent] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("")

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }
  const cancel = () => {
    reset()
    setError("")
    props.onCancel()
  }

  //handle not entering a student name or not selecting an interviewer
  const save = () => {
    if(student === "") {
      setError("Student name cannot be blank")
    } else if(interviewer === null) {
      setError("Please select an interviewer")
      } else {
        setError("")        
    props.onSave(student, interviewer)
      }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event)=> setStudent(event.target.value)}
            onSubmit={(event)=> event.preventDefault()}
            data-testid="student-name-input"
          />
          {error && <h5>{error}</h5>}
        </form>
        <InterviewerList
        onChange={setInterviewer}
        value={interviewer}
        interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => save()}>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
