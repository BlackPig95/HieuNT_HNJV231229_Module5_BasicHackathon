import { useContext, useState } from "react";
import TaskList from "./TaskList";
import { GlobalContext } from "../context/Global";

function TaskManagement()
{
    const { taskError, handleAddTask } = useContext(GlobalContext);
    const [ taskValue, setTaskValue ] = useState("");
    const handleChangeTask = (e) =>
    {
        setTaskValue(e.target.value);
    };
    const handleSubmitForm = (e) =>
    {
        e.preventDefault();
        handleAddTask(e.target.children[ 0 ].value);
        setTaskValue("");
    };
    return (
        <>
            <div className="flex justify-center items-center mt-[10%] p-0 box-border">
                <div className="border rounded-md shadow-md py-5 px-20 min-w-[70%]">
                    <h3 className="text-center font-bold text-xl py-6">Danh sách công việc</h3>
                    <form className="flex gap-4" onSubmit={ handleSubmitForm }>
                        <input value={ taskValue } onChange={ handleChangeTask } placeholder="Nhập tên công việc" type="text" className="focus:border-blue-700 hover:shadow-md h-9 border outline-none px-4 rounded flex-1" />
                        <button type="submit" className="h-9 rounded px-4 border bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white">
                            Thêm
                        </button>
                    </form>
                    { taskError && <p className="text-start py-2 text-red-400 text-sm">{ taskError }</p> }
                    <TaskList />
                </div>
            </div>
        </>
    );
}

export default TaskManagement;