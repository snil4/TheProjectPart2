import { NavLink } from "react-router-dom";
import "./Task.css";

interface TaskProps {
	path: string;
    name: string;
}

function Task(props: TaskProps): JSX.Element {
    return (
        <NavLink to={props.path} className="underline hover:text-fuchsia-700">{props.name}</NavLink>
    );
}

export default Task;
