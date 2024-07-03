import { createContext, useState } from "react";
import TaskManagement from "../pages/TaskManagement";

export const GlobalContext = createContext();
function Global()
{
    const keyTask = "tasks";
    //Lấy dữ liệu trên localStorage về danh sách các task hiện có
    const [ tasks, setTasks ] = useState(() =>
    {
        return JSON.parse(localStorage.getItem(keyTask)) || [];
    });

    //Quản lý việc hiển thị thông báo lỗi
    const [ taskError, setTaskError ] = useState("");
    /**
     * Hàm xử lý việc thêm task vào danh sách
     * @param {*} task Tên của công việc cần thêm vào danh sách
     */
    const handleAddTask = (task) =>
    {   //Kiểm tra xem trường tên có bị bỏ trống không
        if (handleValidateData(task))
        {   //Nếu không bị bỏ trống => Tạo task mới với id ngẫu nhiên và tên của task lấy từ value của trường input
            const newTask = {
                id: Math.ceil(Math.random() * 100000),
                name: task,
            };
            //Thêm task mới vào danh sách
            const updateTaskList = [ ...tasks, newTask ];
            //Save lên localStorage và re-render
            handleSaveData(keyTask, updateTaskList);
        }
    };
    /**
     * Hàm xử lý việc xóa task
     * @param {*} task Object task cần xóa
     */
    const handleDeleteTask = (task) =>
    {   //Lọc ra các task có id khác với id của task bị xóa
        const deletedTaskList = [ ...tasks.filter(t => t.id !== task.id) ];
        //Lưu lại thay đổi
        handleSaveData(keyTask, deletedTaskList);
    };
    /**
     * Hàm xử lý việc update dữ liệu
     * @param {*} task Object task cần được update
     */
    const handleEditTask = (task) =>
    {
        const editedTaskList = [ ...tasks ];
        const editedTaskIndex = editedTaskList.findIndex(t => t.id === task.id);
        editedTaskList[ editedTaskIndex ].name = task.name;
        handleSaveData(keyTask, editedTaskList);
    };
    /**
     * Hàm kiểm tra dữ liệu đầu vào
     * @param {*} task Tên của task cần thêm mới, chính là value của trường input
     * @returns False nếu trường này bị bỏ trống, true nếu trường này có thông tin
     */
    const handleValidateData = (task) =>
    {
        if (!task)
        {
            setTaskError("Tên công việc không được để trống");
            return false;
        }
        else
        {
            setTaskError("");
            return true;
        }
    };
    /**
     * Hàm lưu dữ liệu về các task vào localStorage và cập nhật lại state để re-render
     * @param {*} key Tên của key cần lưu trên localStorage
     * @param {*} data Dữ liệu tương ứng của key này
     */
    const handleSaveData = (key, data) =>
    {
        setTasks(data);
        localStorage.setItem(key, JSON.stringify(data));
    };
    //Object lưu trữ thông tin về các dữ liệu cần truyền qua page TaskManagement và TaskList
    const dataGlobal = {
        tasks,
        taskError,
        handleAddTask,
        handleDeleteTask,
        handleEditTask,
    };
    return (
        <>
            <GlobalContext.Provider value={ dataGlobal }>
                <TaskManagement />
            </GlobalContext.Provider>
        </>
    );
}

export default Global;