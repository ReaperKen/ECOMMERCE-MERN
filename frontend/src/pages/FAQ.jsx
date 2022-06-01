import React, { useState } from "react";
import FAQQ from "../components/FAQ/FAQQ";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  return (
    <div className="bg-slate-50 min-h-screen h-auto w-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">FAQ</h1>
      <section className="flex flex-col w-11/12 h-auto mx-auto shadow p-4 bg-white m-6 mt-12 space-y-8">
        <FAQQ setOpen={setIsOpen} isOpen={isOpen} />
        <FAQQ setOpen={setIsOpen2} isOpen={isOpen2} />
        <FAQQ setOpen={setIsOpen3} isOpen={isOpen3} />
      </section>
    </div>
  );
};

export default FAQ;
