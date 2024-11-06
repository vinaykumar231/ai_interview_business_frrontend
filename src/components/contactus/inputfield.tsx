import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  isTextArea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', isTextArea = false }) => {
  const inputId = `${label.toLowerCase().replace(' ', '-')}-input`;

  return (
    <>
      <label htmlFor={inputId} className="mt-1 tracking-wide text-center">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={inputId}
          className="flex shrink-0 self-stretch rounded-md bg-zinc-300 bg-opacity-60 h-[116px] w-[394px] mt-1"
          aria-label={label}
        />
      ) : (
        <input
          type={type}
          id={inputId}
          className="flex shrink-0 self-stretch rounded-md bg-zinc-300 bg-opacity-60 h-[41px] mt-1"
          aria-label={label}
        />
      )}
    </>
  );
};

export default InputField;