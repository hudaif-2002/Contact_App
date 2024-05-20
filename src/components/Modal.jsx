import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
const Modal = ({onClose,isOpen,children}) => {
  return createPortal(
  <>
  {isOpen &&( 
    <div  className="grid place-content-center h-screen backdrop-blur w-screen absolute top-0 z-40">
    <div className=" m-auto z-50 relative   p-4 min-h-[200px] bg-white min-w-[80%]">
    <div className="flex justify-end">
      <AiOutlineClose  onClick={onClose} className="text-2xl self-end"/>
    </div>
    {children}
    </div>

  
  
    </div>
    )};
  </>,document.getElementById("modal-root"));
};

export default Modal
