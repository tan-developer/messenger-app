"use client";

import Link from "next/link";
import clsx from "clsx";

import { RoutesHookTypes } from "../../hooks/useRoutes";

const MobileItem: React.FC<RoutesHookTypes> = ({
  active,
  href,
  icon: Icon,
  label,
  onClick,
}) => {
  const handleClick = (): void => {
    if (onClick) onClick();
  };

  return (
    <Link className={clsx(`
      flex
      gap-x-3
      text-lg
      leading-6
      font-semibold
      w-full
      justify-center
      p-4
      text-gray-500
      hover:text-black
      hover:bg-gray-100
    `)} href={href} onClick={handleClick}>
      <Icon className="h-6 w-6"/>
    </Link>
  );
};

export default MobileItem;
