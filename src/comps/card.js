import React from "react";
import "./card.css";
import { FiMoreHorizontal } from "react-icons/fi";

const TaskCard = ({ id, description, type, img=0, status, priority, prio=0 }) => {
    const addImg = () => {
        switch (status) {
            case "Todo":
                return <img src="/img/To-do.svg" alt="To Do" className="icon-imgs"/>;
            case "Backlog":
                return <img src="/img/Backlog.svg" alt="Backlog" className="icon-imgs"/>;
            case "In progress":
                return <img src="/img/in-progress.svg" alt="In Progress" className="icon-imgs"/>;
            case "Done":
                return <img src="/img/Done.svg" alt="Done" />;
            case "Cancelled":
                return <img src="/img/Cancelled.svg" alt="Cancelled" className="icon-imgs"/>;
            default:
                return null;
        }
    };

    const priorityImg = () => {
      switch (priority) {
          case 3:
              return <img src="./img/Img - High Priority.svg" alt="To Do" className="icon-imgs"/>;
          case 1:
              return <img src="./img/Img - Low Priority.svg" alt="Backlog" className="icon-imgs"/>;
          case 2:
              return <img src="./img/Img - Medium Priority.svg" alt="In Progress" className="icon-imgs"/>;
          case 0:
              return <img src="./img/No-priority.svg" alt="Done" />;
          case 4:
              return <img src="./img/SVG - Urgent Priority colour.svg" alt="Cancelled" className="icon-imgs"/>;
          default:
              return null;
      }
  };

    return (
        <div className="task-card" key={id}>
            <p className="task-id">{id}</p>
            <div className="progress-icons">
                { img ? addImg() : null}
                <p className="task-description">{description}</p>
            </div>
            <div className="task-bottom">
            { prio ? priorityImg() : null}
                <p className="task-type">{type}</p>
            </div>
        </div>
    );
};

export default TaskCard;
