import { useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addTodo } from '../../Reducer/testSlice';
import { deleteTodo } from '../../Reducer/testSlice';

const Task = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const addNewTask = () => {
        const task = inputRef.current.value.trim();
        if (task !== "") {
            dispatch(addTodo(task));
            inputRef.current.value = "";
        }
    };

    const tasks = useSelector((state) => state.tasks.tasks);

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    return (
        <>
            <div className="task-component">
                <div className="add-task">
                    <input
                        type="text"
                        placeholder="Add task here..."
                        ref={inputRef}
                        className="taskInput"
                    />
                    <button onClick={addNewTask}>Add task</button>
                </div>
            </div>

            <div className='border-2 p-2 mt-2'>
                <div className="tasklist">
                    <div className="display-tasks">
                        <h3>Your tasks:</h3>
                        <ul className="tasks">
                            {tasks?.map((task) => (
                                <li className="task" key={task.id}>
                                    {task?.text}
                                    <button
                                        className="delete-btn bg-red-300"
                                        onClick={() => handleDelete(task?.id)}
                                    >
                                        delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Task;
