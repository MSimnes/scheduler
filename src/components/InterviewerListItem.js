import classNames from 'classnames';
import React from 'react';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    'interviewers__item--selected': props.selected,
  })
  const interviewerImageClass = classNames("interviewers__item-image", {
    'interviewers__item-image--selected': props.selected,
  })

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className={interviewerImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && <>{props.name}</>}
    </li>
  )
}
