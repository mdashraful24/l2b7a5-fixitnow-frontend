import { getMe } from "@/services/getMe";
import ContactClient from "../_components/contact/ContactClient";

export default async function ContactPage() {
    const user = await getMe();

    const userData = user?.data ? {
        name: user.data.name || "",
        email: user.data.email || "",
        role: user.data.role || "",
    } : null;

    return <ContactClient userData={userData} />;
}
