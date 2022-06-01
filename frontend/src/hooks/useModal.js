import { useState, useEffect } from 'react';

export const useModal = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const OpenModal = ()=> setIsOpen(true)
    const CloseModal = ()=> setIsOpen(false)

    return[isOpen, OpenModal, CloseModal ]
}

