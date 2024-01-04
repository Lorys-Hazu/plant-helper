/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useState, ReactNode, ReactElement } from 'react';

interface ModalContextType {
  showModal: ReactElement | null;
  addModal: (component: React.ComponentType<any>, props: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState<ReactElement | null>(null);

  const addModal = (Component: React.ComponentType<any>, props: any) => {
    setShowModal(React.createElement(Component, { ...(props as object) }));
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, addModal, closeModal }}>
      {children}
      {showModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
