import React from 'react'; 
import moment from 'moment';
import { FaChessPawn, FaChessBishop, FaChessKing } from 'react-icons/fa';

// props are needed to toggle display, setDate, etc.
export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate, setTaskDay }) => {
  return ( // using the same structure of if this is true, then continue and render the rest (show)
    showTaskDate && (
      <div className="task-date" data-testid="task-date-overlay">

        {/* this is an unordered list of today, tomorrow, next_7 toggles */}
        <ul className="task-date_list"> 

          {/* today */}
          <li
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format("MM/DD/YYYY"))
              setTaskDay(moment().format('dddd'));
            }}
            data-testid="task-date-overlay"
          >
            <span> <FaChessPawn/> </span>
            <span> Today </span>
          </li>

          {/* tomorrow */}
          <li
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format("MM/DD/YYYY"))
              setTaskDay(moment().add(1, 'day').format('dddd'));
            }}
            data-testid="task-date-tomorrow"
          >
            <span> <FaChessBishop/> </span>
            <span> Tomorrow </span>
          </li>

          {/* next 7 days */}
          <li
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format("MM/DD/YYYY"))
              setTaskDay(moment().add(7, 'days').format('dddd'));
            }}
            data-testid="task-date-next-week"
          >
            <span> <FaChessKing/> </span>
            <span>  Next Week </span>
          </li>

        </ul>
      </div>
    )
  )
}