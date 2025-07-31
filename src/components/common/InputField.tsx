/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface IInputFieldProps {
  label?: string | false;
  required?: boolean;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  form: UseFormReturn<any, any>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  isPassword?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  alignVertical?: boolean;
  className?: string;
}

const InputField: FC<IInputFieldProps> = ({
  label,
  required,
  name,
  defaultValue = "",
  disabled = false,
  form,
  inputProps = {},
  isPassword = false,
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  alignVertical = false,
  className = "",
}: IInputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = (errors?.[name]?.message ?? "") as string;

  return (
    <div
      className={`form-item ${alignVertical ? "flex-col" : ""} ${className}`}
    >
      {label && (
        <label
          htmlFor={String(name)}
          className={`form-label ${labelClassName}`}
        >
          {label} {required && "*"}
        </label>
      )}

      <div className="password-wrapper">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type={isPassword && !showPassword ? "password" : "text"}
              disabled={disabled}
              id={String(name)}
              className={`w-full rounded-[0.6rem]  ${inputClassName}`}
              {...inputProps}
            />
          )}
        />
        {isPassword && (
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </span>
        )}
      </div>

      {errorMessage && (
        <p className={`text-red-600 text-[0.8rem] ${errorClassName}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
