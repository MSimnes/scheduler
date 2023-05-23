import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";



export default function DayListItem(props) {

  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots";
    }
    if (props.spots === 1) {
      return "1 spot";
    }

    return `${props.spots} spots`
  }

  console.log(props);
  const dayClass = classNames("day-list__item", {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}