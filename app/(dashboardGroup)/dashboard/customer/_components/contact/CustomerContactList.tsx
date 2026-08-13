/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Mail,
    CheckCircle,
    Clock,
    Eye,
    RefreshCw,
} from "lucide-react";
import { IContactResponse } from "@/lib/type";
import ContactDetailModal from "./ContactDetailModal";
import { getMyContacts } from "@/app/(publicGroup)/_actions/contact";
import { toast } from "sonner";
import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CustomerContactListProps {
    initialData: IContactResponse;
}

const CustomerContactList = ({ initialData }: CustomerContactListProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [contacts, setContacts] = useState(initialData.data || []);
    const [meta, setMeta] = useState(initialData.meta);
    const [searchLoading, setSearchLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Update URL when search changes
    const updateURL = (term: string, page: number = 1) => {
        const params = new URLSearchParams();
        if (term) {
            params.set("search", term);
        }
        if (page > 1) {
            params.set("page", page.toString());
        }
        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(url, { scroll: false });
    };

    const handleSearch = async () => {
        const trimmedTerm = searchTerm.trim();
        if (!trimmedTerm) return;

        try {
            setSearchLoading(true);
            // Update URL with search term
            updateURL(trimmedTerm, 1);

            const result = await getMyContacts({
                searchTerm: trimmedTerm,
                limit: 10,
                page: 1,
            });
            if (result.success) {
                setContacts(result.data);
                setMeta(result.meta);
                toast.success(`Found ${result.data.length} results for "${trimmedTerm}"`);
            }
        } catch (error) {
            toast.error("Failed to search contacts");
        } finally {
            setSearchLoading(false);
        }
    };

    const handlePageChange = async (page: number) => {
        try {
            setSearchLoading(true);
            // Update URL with page
            updateURL(searchTerm, page);

            const result = await getMyContacts({
                page,
                limit: 10,
                searchTerm: searchTerm || undefined,
            });
            if (result.success) {
                setContacts(result.data);
                setMeta(result.meta);
            }
        } catch (error) {
            toast.error("Failed to load contacts");
        } finally {
            setSearchLoading(false);
        }
    };

    const handleViewContact = (contact: any) => {
        setSelectedContact(contact);
        setModalOpen(true);
    };

    const handleRefresh = async () => {
        try {
            setRefreshLoading(true);
            setSearchTerm("");
            // Clear URL params
            router.push(pathname, { scroll: false });

            const result = await getMyContacts({
                limit: 10,
                page: 1,
                searchTerm: undefined,
            });
            if (result.success) {
                setContacts(result.data);
                setMeta(result.meta);
                // toast.success("Contacts refreshed");
            }
        } catch (error) {
            toast.error("Failed to refresh contacts");
        } finally {
            setRefreshLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        handleRefresh();
    };

    // Handle search on Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            handleSearch();
        }
    };

    // Load search from URL on mount
    useEffect(() => {
        const searchFromURL = searchParams.get("search");
        if (searchFromURL) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearchTerm(searchFromURL);
            // Auto-search if there's a search param
            const performSearch = async () => {
                try {
                    setSearchLoading(true);
                    const result = await getMyContacts({
                        searchTerm: searchFromURL,
                        limit: 10,
                        page: 1,
                    });
                    if (result.success) {
                        setContacts(result.data);
                        setMeta(result.meta);
                    }
                } catch (error) {
                    toast.error("Failed to load search results");
                } finally {
                    setSearchLoading(false);
                }
            };
            performSearch();
        }
    }, []);

    const getStatusBadge = (contact: any) => {
        const hasReply = contact.reply && contact.reply.trim() !== "";
        if (hasReply) {
            return (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Replied
                </Badge>
            );
        }
        return (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                <Clock className="h-3 w-3 mr-1" />
                Pending
            </Badge>
        );
    };

    // Determine if we should show loading state
    const isLoading = searchLoading || refreshLoading;

    return (
        <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-1 gap-2 w-full sm:w-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by subject or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-9"
                            disabled={searchLoading}
                        />
                        {searchTerm && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 pr-3 font-bold"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={!searchTerm.trim() || searchLoading}
                        className={`px-4 py-2 rounded-lg text-white transition-colors min-w-20 ${!searchTerm.trim() || searchLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                            }`}
                    >
                        {searchLoading ? "Searching..." : "Search"}
                    </button>
                </div>
                {/* <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    disabled={refreshLoading}
                >
                    <RefreshCw className={`h-4 w-4 ${refreshLoading ? "animate-spin" : ""}`} />
                </Button> */}
            </div>

            {/* Search Results Info */}
            {/* {searchTerm && !searchLoading && !refreshLoading && (
                <div className="text-sm text-muted-foreground">
                    Showing results for: <span className="font-medium text-foreground">&quot;{searchTerm}&quot;</span>
                    {contacts.length === 0 && " - No results found"}
                </div>
            )} */}

            {/* Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Messages</p>
                    <p className="text-2xl font-bold">{meta?.total || 0}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Replied</p>
                    <p className="text-2xl font-bold">
                        {contacts.filter((c: any) => c.reply && c.reply.trim() !== "").length}
                    </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                        {contacts.filter((c: any) => !c.reply || c.reply.trim() === "").length}
                    </p>
                </div>
            </div> */}

            {/* Contact Table */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-5">#</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead className="hidden md:table-cell">Message</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-right pr-5">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    <div className="flex items-center justify-center gap-2">
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        {searchLoading ? "Searching..." : "Loading..."}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <Mail className="h-12 w-12 text-muted-foreground" />
                                        <p className="text-foreground">
                                            {searchTerm ? "No results found" : "No messages found"}
                                        </p>
                                        <p className="text-sm text-foreground/80">
                                            {searchTerm
                                                ? `No messages match "${searchTerm}"`
                                                : "Send a message through the contact form"}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact: any, index: number) => (
                                <TableRow key={contact.id}>
                                    <TableCell className="pl-5">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="font-medium max-w-37.5 truncate">
                                        {contact.subject || "No subject"}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell max-w-50 truncate">
                                        {contact.message}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(contact)}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right pr-5">
                                        <Button
                                            size="sm"
                                            onClick={() => handleViewContact(contact)}
                                            className="cursor-pointer"
                                        >
                                            <Eye className="h-4 w-4" />
                                            {/* View */}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {meta && meta.totalPages && meta.totalPages > 1 && !isLoading && (
                <Pagination
                    currentPage={meta.page}
                    totalPages={meta.totalPages}
                    totalItems={meta.total}
                    itemsPerPage={meta.limit}
                    itemLabel="messages"
                    // onPageChange={handlePageChange}
                />
            )}

            {/* Contact Detail Modal */}
            <ContactDetailModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                contact={selectedContact}
            />
        </div>
    );
};

export default CustomerContactList;
