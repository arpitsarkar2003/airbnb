"use client";

import Image from "next/image";

const Avatar = () => {
    return (
        <div>
            <Image
                src="/images/placeholder.jpg"
                alt="Avatar"
                className="rounded-full"
                height={30}
                width={30}
            />
        </div>
    )
}
export default Avatar