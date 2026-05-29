import "./modal.scss";

import type { ReactNode } from "react";
import IconButton from "@/components/IconButton";

type TModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal = ({ open, onClose, title, children }: TModalProps) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <IconButton
            className="modal__close-btn"
            icon="close"
            size="tiny"
            type="secondary"
            ariaLabel="Close"
            onClick={onClose}
          />
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
