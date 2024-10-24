import type { FieldApi } from '@tanstack/react-form';

export const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="text-red-600 text-sm mt-1">{field.state.meta.errors.join(", ")}</p>
      ) : null}
      {field.state.meta.isValidating ? (
        <p className="text-blue-600 text-sm mt-1">Validating...</p>
      ) : null}
    </>
  );
};
