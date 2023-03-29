import { NavLink } from "react-router-dom";
import "./Task.css";

interface TaskProps {
	path: string;
    name: string;
    addTask?: string;
}

function Task(props: TaskProps): JSX.Element {

    return (
            <NavLink to={props.path} className="underline hover:text-fuchsia-700">{props.name}
            <br/>{props.addTask && <NavLink to={props.path + "/add"} className="AddTask underline hover:text-fuchsia-700">{"- " + props.addTask}</NavLink>}</NavLink>
    );
}

export default Task;
