import { useContext, useState } from "react";
import { GlobalContext } from "../context/Global";
import DeleteModal from "../base/modal/DeleteModal";
import EditModal from "../base/modal/EditModal";

function TaskList()
{
    const { tasks } = useContext(GlobalContext);
    //Dùng để quản lý xem task nào đang được chọn cho việc delete hay edit
    const [ chosenTask, setChosenTask ] = useState(null);

    const [ deleteModal, setDeleteModal ] = useState(false);
    const handleModalDelete = (state, task) =>
    {
        setDeleteModal(state);
        setChosenTask(task);
    };
    const [ editModal, setEditModal ] = useState(false);
    const handleModalEdit = (state, task) =>
    {
        setEditModal(state);
        setChosenTask(task);
    };

    return (
        <>
            <ul className="flex flex-col gap-3 mt-5 max-h-72 overflow-y-auto">
                { tasks.length === 0 ?
                    <div className="py-4 text-center items-center flex flex-col">
                        <img className="h-48 w-52 shadow-lg " src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg" alt="" />
                    </div>
                    :
                    tasks.map((t) =>
                    {
                        return (
                            <div key={ t.id }>
                                { deleteModal && chosenTask === t && <DeleteModal handleModalDelete={ handleModalDelete } task={ t } /> }
                                { editModal && chosenTask === t && <EditModal handleModalEdit={ handleModalEdit } task={ t } /> }
                                <li key={ t.id } className="flex px-2 rounded justify-between items-center hover:bg-gray-200 cursor-pointer">
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" className="h-4 w-4 cursor-pointer" />
                                        <label>{ t.name }</label>
                                    </div>
                                    <div className="flex gap-4">
                                        <i onClick={ () => handleModalEdit(true, t) } className="fa-solid fa-pen cursor-pointer hover:bg-gray-300 p-2 rounded-full text-orange-500"></i>
                                        <i onClick={ () => handleModalDelete(true, t) } className="fa-solid fa-trash cursor-pointer hover:bg-gray-300 p-2 rounded-full text-red-500"></i>
                                    </div>
                                </li>
                            </div>
                        );
                    })
                }
            </ul>
        </>
    );
}

export default TaskList;