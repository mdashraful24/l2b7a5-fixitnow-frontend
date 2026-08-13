import { getMyContacts } from "@/app/(publicGroup)/_actions/contact";
import { Suspense } from "react";
import ContactSkeleton from "../../admin/_components/contacts/ContactSkeleton";
import CustomerContactList from "../../customer/_components/contact/CustomerContactList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default async function TechnicianContactsPage() {
    const result = await getMyContacts({
        limit: 10,
        page: 1,
        sortBy: "createdAt",
        sortOrder: "desc"
    });

    return (
        <div className="container mx-auto">
            <div className="flex flex-row items-center md:items-start justify-between">
                <div className="mb-5">
                    <h1 className="text-3xl font-bold text-foreground">My Messages</h1>
                    <p className="text-foreground/80 mt-1">
                        View all your contact messages and replies from our team
                    </p>
                </div>
                <div>
                    <Button asChild className="gap-2">
                        <Link href={"/contact"}>
                            <MessageSquare className="h-4 w-4" />
                            Contact
                        </Link>
                    </Button>
                </div>
            </div>

            <Suspense fallback={<ContactSkeleton />}>
                <CustomerContactList initialData={result} />
            </Suspense>
        </div>
    );
}
