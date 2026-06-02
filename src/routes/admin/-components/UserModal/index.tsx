import { useEffect, useRef } from "react";
import type {
  TAdminUser,
  TCreateUserInput,
  TUpdateUserAdminInput,
} from "@/hooks/useAdminUsers";
import Icon from "@/components/Icon";
import "./style.scss";

type TUserModalMode = "create" | "edit";

type TUserModalProps = {
  mode: TUserModalMode;
  user?: TAdminUser | null;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onCreate: (data: TCreateUserInput) => void;
  onUpdate: (data: TUpdateUserAdminInput) => void;
};

const ROLE_OPTIONS = ["User", "Instructor", "Reviewer", "Admin"] as const;

const UserModal = ({
  mode,
  user,
  isOpen,
  isPending,
  onClose,
  onCreate,
  onUpdate,
}: TUserModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isEdit = mode === "edit";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (isEdit && user) {
      onUpdate({
        id: user.id,
        email: data.get("email") as string,
        username: data.get("username") as string,
        phoneNumber: data.get("phoneNumber") as string,
        role: data.get("role") as string,
      });
    } else {
      onCreate({
        email: data.get("email") as string,
        username: data.get("username") as string,
        phoneNumber: data.get("phoneNumber") as string,
        password: data.get("password") as string,
        role: data.get("role") as string,
      });
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="user-modal"
      aria-modal="true"
      aria-label={isEdit ? "Edit user" : "Create new user"}
      onClick={handleBackdropClick}
    >
      <div className="user-modal__panel">
        <div className="user-modal__header">
          <h2 className="user-modal__title">
            {isEdit ? "Edit User" : "Create New User"}
          </h2>
          <button
            type="button"
            id="user-modal-close-btn"
            className="user-modal__close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <form
          id="user-modal-form"
          className="user-modal__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="user-modal__field">
            <label className="user-modal__label" htmlFor="modal-username">
              Username <span aria-hidden="true">*</span>
            </label>
            <input
              id="modal-username"
              name="username"
              type="text"
              className="user-modal__input"
              defaultValue={user?.username ?? ""}
              placeholder="e.g. john_doe"
              required
              autoComplete="off"
            />
          </div>

          <div className="user-modal__field">
            <label className="user-modal__label" htmlFor="modal-email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="modal-email"
              name="email"
              type="email"
              className="user-modal__input"
              defaultValue={user?.email ?? ""}
              placeholder="user@example.com"
              required
              autoComplete="off"
            />
          </div>

          <div className="user-modal__field">
            <label className="user-modal__label" htmlFor="modal-phone">
              Phone Number
            </label>
            <input
              id="modal-phone"
              name="phoneNumber"
              type="tel"
              className="user-modal__input"
              defaultValue={user?.phoneNumber ?? ""}
              placeholder="+84 000 000 000"
              autoComplete="off"
            />
          </div>

          {!isEdit && (
            <div className="user-modal__field">
              <label className="user-modal__label" htmlFor="modal-password">
                Password <span aria-hidden="true">*</span>
              </label>
              <input
                id="modal-password"
                name="password"
                type="password"
                className="user-modal__input"
                placeholder="Minimum 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
          )}

          <div className="user-modal__field">
            <label className="user-modal__label" htmlFor="modal-role">
              Role <span aria-hidden="true">*</span>
            </label>
            <select
              id="modal-role"
              name="role"
              className="user-modal__select"
              defaultValue={user?.role ?? "Learner"}
              required
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="user-modal__actions">
            <button
              type="button"
              id="user-modal-cancel-btn"
              className="user-modal__btn user-modal__btn--cancel"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="user-modal-submit-btn"
              className="user-modal__btn user-modal__btn--submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="user-modal__spinner" aria-hidden="true" />
              ) : null}
              {isPending
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UserModal;
