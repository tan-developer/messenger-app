"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Avatar from "@/app/components/Avatar";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  data: User;
}

const UserBox: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);

    axios
      .post(`/api/conversations/`, {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .catch(() => toast.error("Lỗi mẹ nó r"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
          w-full
          relative
          flex
          items-center
          space-x-3
          bg-white
          p-3
          hover:bg-neutral-100
          transition
          cursor-pointer
        "

      onClick={handleClick}
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
          flex
          justify-between
          items-center
          mb-1
        "
          >
            <p
              className="
            text-sm
            font-medium
            text-gray-900

          "
            >
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
