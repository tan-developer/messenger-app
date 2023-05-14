"use client";

import { RoutesHookTypes } from "../../hooks/useRoutes";
import clsx from "clsx";
import Link from "next/link";

interface ButtonType extends RoutesHookTypes {}

const DesktopItem: React.FC<ButtonType> = ({
  label,
  active,
  href,
  icon: Icon,
  onClick,
}) => {
  const handleClick = (): void => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link href={href} className={clsx(`
        flex
        gap-x-3
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-500
        hover:text-black
        hover:bg-gray-100
      ` , 
        active && 'bg-gray-100 text-black'
      )}>
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
