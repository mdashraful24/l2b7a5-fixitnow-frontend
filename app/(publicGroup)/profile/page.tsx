import { getMe } from "@/services/getMe"
import MyProfile from "../_components/MyProfile"

const UserProfilePage = async () => {
    const user = await getMe();
    
    if (!user.success || !user.data) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <p className="text-muted-foreground">
                    Profile not found. Please login to view your profile.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <MyProfile user={user.data} />
        </div>
    )
}

export default UserProfilePage
