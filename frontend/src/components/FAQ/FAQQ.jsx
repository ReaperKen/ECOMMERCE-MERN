import React from "react";
import { AiOutlineDown, AiOutlineLeft } from "react-icons/ai";

const FAQQ = ({ isOpen, setOpen }) => {
  return (
    <article
      className={`w-full mx-auto flex flex-col shadow p-2 my-2 justify-between `}
    >
      <div className="flex justify-between" onClick={() => setOpen(!isOpen)}>
        <h2 className="font-bold">Lorem ipsum dolor sit amet</h2>

        {isOpen ? (
          <AiOutlineLeft className="text-2xl text-black" />
        ) : (
          <AiOutlineDown className="text-2xl text-black" />
        )}
      </div>
      <div className="flex items-center">
        {isOpen && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            aliquid.
          </p>
        )}
      </div>
    </article>
  );
};

export default FAQQ;
