import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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

const ROLE_OPTIONS = ["Learner", "Instructor", "Reviewer", "Admin"] as const;

const UserModal = ({
  mode,
  user,
  isOpen,
  isPending,
  onClose,
  onCreate,
  onUpdate,
}: TUserModalProps) => {
  const { t } = useTranslation();
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
            {isEdit
              ? t("admin.users.modal.edit_title")
              : t("admin.users.modal.create_title")}
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
              {t("admin.users.modal.username")}{" "}
              <span aria-hidden="true">*</span>
            </label>
            <input
              id="modal-username"
              name="username"
              type="text"
              className="user-modal__input"
              defaultValue={user?.username ?? ""}
              placeholder={t("admin.users.modal.username_placeholder")}
              required
              autoComplete="off"
            />
          </div>

          <div className="user-modal__field">
            <label className="user-modal__label" htmlFor="modal-email">
              {t("admin.users.modal.email")} <span aria-hidden="true">*</span>
            </label>
            <input
              id="modal-email"
              name="email"
              type="email"
              className="user-modal__input"
              defaultValue={user?.email ?? ""}
              placeholder={t("admin.users.modal.email_placeholder")}
              required
              autoComplete="off"
            />
          </div>

          <div className="user-modal__field">
            <label className="user-modal__label" htmlFor="modal-phone">
              {t("admin.users.modal.phone")}
            </label>
            <input
              id="modal-phone"
              name="phoneNumber"
              type="tel"
              className="user-modal__input"
              defaultValue={user?.phoneNumber ?? ""}
              placeholder={t("admin.users.modal.phone_placeholder")}
              autoComplete="off"
            />
          </div>

          {!isEdit && (
            <div className="user-modal__field">
              <label className="user-modal__label" htmlFor="modal-password">
                {t("admin.users.modal.password")}{" "}
                <span aria-hidden="true">*</span>
              </label>
              <input
                id="modal-password"
                name="password"
                type="password"
                className="user-modal__input"
                placeholder={t("admin.users.modal.password_placeholder")}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
          )}

          <div className="user-modal__field">
            <label className="user-modal__label" htmlFor="modal-role">
              {t("admin.users.modal.role")} <span aria-hidden="true">*</span>
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
              {t("admin.users.modal.cancel")}
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
                ? t("admin.users.modal.saving")
                : isEdit
                  ? t("admin.users.modal.save")
                  : t("admin.users.modal.create")}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UserModal;
