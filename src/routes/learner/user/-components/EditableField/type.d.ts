export type TEditableFieldProps = {
  label: string;
  value: string;
  fieldName: string;
  onSave: (field: string, val: string) => void;
  isLoading: boolean;
};
