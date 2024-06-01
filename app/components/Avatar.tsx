"use client";

import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined
}

const Avatar = ({src}: AvatarProps) => {
    return (
        <div>
            <Image
                src={src ||"/images/placeholder.jpg"}
                alt="Avatar"
                className="rounded-full"
                height={30}
                width={30}
            />
        </div>
    )
}
export default Avatar