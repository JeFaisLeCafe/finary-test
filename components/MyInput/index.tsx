import { HTMLProps } from "react";
import { InputType } from "./type";

interface InputProps extends HTMLProps<HTMLInputElement> {
  type?: InputType;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  maxLength?: number;
  autofocus?: boolean;
}

const MyInput: React.FC<InputProps> = ({
  type = InputType.text,
  placeholder = "",
  maxLength,
  autofocus = false,
  onChange,
  value
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autofocus}
      className="h-12 w-80 my-6 mx-4 text-gray-finary p-4 rounded-sm focus:outline-finary"
      type={type}></input>
  );
};

export default MyInput;
