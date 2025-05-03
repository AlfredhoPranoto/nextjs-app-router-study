import Input from "../elements/Input";
import Label from "../elements/Label";

type FormInputProps = {
  children: React.ReactNode;
  htmlFor: string;
  name: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const FormInput = ({
  children,
  htmlFor,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div>
      <Label htmlFor={htmlFor}>{children}</Label>
      <Input
        onChange={onChange}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
