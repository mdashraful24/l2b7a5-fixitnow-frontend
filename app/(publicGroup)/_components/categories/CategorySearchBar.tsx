"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react";

export default function CategorySearchBar () {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (value: string)=>{
        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current);
        }

        debouncedReference.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set("searchTerm", value);
                params.set("page", "1");
            } else {
                params.delete("searchTerm");
                params.set("page", "1");
            }

            router.replace(`${pathName}?${params.toString()}`);
        }, 500);
    }

    return (
        <div className="relative w-full max-w-sm">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                defaultValue={searchParams.get("searchTerm") ? searchParams.get("searchTerm")?.toString() : ""}
                onChange={(e) => { handleChange(e.target.value) }}
                placeholder="Search categories..."
                className="pl-9"
            />
        </div>
    )
}
