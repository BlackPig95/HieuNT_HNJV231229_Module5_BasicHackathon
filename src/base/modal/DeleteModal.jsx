import { useContext } from "react";
import { GlobalContext } from "../../context/Global";

function DeleteModal({ handleModalDelete, task })
{
    const { handleDeleteTask } = useContext(GlobalContext);
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-rgba-5">
            <div className="w-[490px] border shadow px-6 py-5 bg-white rounded">
                <div className="py-2 flex items-center justify-between">
                    <span className="font-semibold text-xl">Xác nhận</span>
                    <i onClick={ () => handleModalDelete(false) } className="cursor-pointer px-4 py-3 hover:bg-[#E0E0E0] rounded-full text-base fa-solid fa-xmark"></i>
                </div>
                <div className="flex items-center py-2 gap-3">
                    <i className="text-[#F06666] fa-solid fa-circle-exclamation text-2xl"></i>
                    <div>Bạn có xác nhận xóa công việc &lt;<b>{ task && task.name }</b> &gt; không?</div>
                </div><hr className="" />
                <div className="flex justify-end gap-2 mt-3">
                    <button onClick={ () => handleModalDelete(false) } className="border px-4 h-9 rounded cursor-pointer hover:bg-[#E0E0E0] focus:bg-[#BDBDBD]">Hủy</button>
                    <button onClick={ () => handleDeleteTask(task) } className="text-white bg-[#007AFF] hover:bg-[#3395FF] focus:bg-[#0062CC] border px-4 h-9 rounded cursor-pointer">
                        Đồng ý
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;