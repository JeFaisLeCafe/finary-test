interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyButton: React.FC<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`h-12 min-w-24 flex justify-center px-6 py-3 bg-yellow-finary rounded-sm hover:opacity-90 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-100`}>
      {children}
    </button>
  );
};

export default MyButton;
