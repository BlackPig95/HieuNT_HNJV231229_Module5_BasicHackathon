import { useContext, useState } from "react";
import { GlobalContext } from "../../context/Global";

function EditModal({ handleModalEdit, task })
{
    const { handleEditTask } = useContext(GlobalContext);
    const [ editedTask, setEditedtask ] = useState(task);
    const handleChangeTask = (e) =>
    {
        setEditedtask({ ...editedTask, name: e.target.value });
    };
    const handleSubmitForm = (e) =>
    {
        e.preventDefault();
        const inputField = document.getElementById("jobName");
        const edit = { ...editedTask, name: inputField.value };
        setEditedtask(edit);
        handleModalEdit(false);
        handleEditTask(edit);
    };
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-rgba-5">
            <div className="w-[450px] border shadow px-6 py-5 bg-white rounded">
                <div className="py-2 flex items-center justify-between">
                    <span className="font-semibold text-xl">Cập nhật công việc</span>
                    <i onClick={ () => handleModalEdit(false) } className="cursor-pointer px-4 py-3 text-base fa-solid fa-xmark"></i>
                </div>
                <form onSubmit={ handleSubmitForm }>
                    <div className="flex flex-col gap-2">
                        <label className="text-start font-semibold" htmlFor="jobName">Tên công việc</label>
                        <input value={ editedTask.name } onChange={ handleChangeTask } id="jobName" type="text" className="rounded h-9 border px-4 outline-none hover:shadow-md shadow focus:border-[#004999]" />
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                        <button onClick={ () => handleModalEdit(false) } type="button" className="border px-4 h-9 rounded cursor-pointer hover:bg-[#E0E0E0] focus:bg-[#BDBDBD]">
                            Hủy
                        </button>
                        <button type="submit" className="text-white bg-[#007AFF] hover:bg-[#3395FF] focus:bg-[#0062CC] border px-4 h-9 rounded cursor-pointer">
                            Đồng ý
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;