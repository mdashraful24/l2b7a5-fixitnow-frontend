import { getMe } from "@/services/getMe"
import MyProfile from "../_components/profileInfo/MyProfile";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MyProfileSkeleton from "../_components/profileInfo/MyProfileSkeleton";

const UserProfilePage = async () => {
    const user = await getMe();

    if (!user.success || !user.data) {
        notFound();
    }

    return (
        <div className="lg:container mx-auto max-w-7xl space-y-6 px-4 py-10">
            <Suspense fallback={<MyProfileSkeleton />}>
                <MyProfile user={user.data} />
            </Suspense>
        </div>
    )
}

export default UserProfilePage
