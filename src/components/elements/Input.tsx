type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = ({ type, name, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      onChange={onChange}
      type={type}
      name={name}
      id={name}
      value={value}
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required
    />
  );
};

export default Input;
