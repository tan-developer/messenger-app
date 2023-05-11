import { IconType } from "react-icons";
import clsx from "clsx";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  disable?: boolean;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  disable,
}) => {
  return (
    <button
      disabled={disable}
      type="button"
      onClick={onClick}
      className={clsx(`
        inline-flex
        w-full
        justify-center
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:bg-gray-50
        focus:outline-offset-0`,
        disable && "text-gray-300"
        )}
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
