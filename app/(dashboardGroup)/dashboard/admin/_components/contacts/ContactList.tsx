/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    SearchIcon,
    Eye,
    Mail,
    User,
    Calendar,
    MessageSquare,
    Reply,
    CheckCircle,
    Clock,
    Search,
} from "lucide-react";
import { IContact } from "@/lib/type";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import ReplyDialog from "./ReplyDialog";
import Link from "next/link";

interface ContactListProps {
    initialContacts: IContact[];
    initialMeta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    searchTerm?: string;
}

const ContactList = ({ initialContacts, initialMeta, searchTerm = "" }: ContactListProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [contacts, setContacts] = useState<IContact[]>(initialContacts);
    const [meta, setMeta] = useState(initialMeta);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Sort contacts: unreplied first, then by date
    const sortedContacts = useMemo(() => {
        return [...contacts].sort((a, b) => {
            // First, sort by reply status (null/empty first = unreplied)
            const aHasReply = a.reply && a.reply.trim() !== "";
            const bHasReply = b.reply && b.reply.trim() !== "";
            
            if (aHasReply && !bHasReply) return 1; // a has reply, b doesn't -> b first
            if (!aHasReply && bHasReply) return -1; // a doesn't have reply, b does -> a first
            
            // If both have same reply status, sort by date
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [contacts, sortOrder]);

    // Update contacts when initialContacts changes
    useEffect(() => {
        setContacts(initialContacts);
        setMeta(initialMeta);
    }, [initialContacts, initialMeta]);

    const handleSearch = (value: string) => {
        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current);
        }

        debouncedReference.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set("search", value);
                params.set("page", "1");
            } else {
                params.delete("search");
                params.set("page", "1");
            }

            router.push(`${pathname}?${params.toString()}`);
        }, 500);
    };

    const getStatusBadge = (contact: IContact) => {
        // Check if reply exists
        if (contact.reply) {
            return (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Replied
                </Badge>
            );
        }

        const date = new Date(contact.createdAt);
        const now = new Date();
        const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffHours < 24) {
            return (
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    <Clock className="h-3 w-3 mr-1" />
                    New
                </Badge>
            );
        } else if (diffHours < 72) {
            return (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                </Badge>
            );
        } else {
            return (
                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                    Read
                </Badge>
            );
        }
    };

    const handleViewContact = (contact: IContact) => {
        setSelectedContact(contact);
        setIsViewDialogOpen(true);
    };

    const handleReplyContact = (contact: IContact) => {
        setSelectedContact(contact);
        setIsReplyDialogOpen(true);
    };

    const handleReplySuccess = () => {
        // Refresh the contacts list
        const currentSearch = searchParams.get("search") || "";
        const currentPage = searchParams.get("page") || "1";

        router.push(`${pathname}?page=${currentPage}&search=${currentSearch}`);
    };

    // Get the current search term from URL
    const currentSearchTerm = searchParams.get("search") || "";

    // Toggle sort order
    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">
                        Contacts Management
                    </h1>
                    <p className="text-foreground/80">
                        Manage and reply to contact messages from your platform.
                    </p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:max-w-md">
                        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            defaultValue={searchTerm || ""}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search by name, email..."
                            className="pl-9"
                        />
                    </div>
                    <Button
                        variant="outline"
                        size={"lg"}
                        onClick={toggleSortOrder}
                        className="shrink-0 group relative cursor-pointer"
                    >
                        <Calendar className="h-4 w-4" />
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {sortOrder === 'newest' ? 'Sort by oldest unreplied messages first' : 'Sort by newest unreplied messages first'}
                        </span>
                    </Button>
                    {/* <Button asChild size={"lg"} className="gap-2">
                        <Link href={"/contact"}>
                            <MessageSquare className="h-4 w-4" />
                            Contact
                        </Link>
                    </Button> */}
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Message Preview</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : sortedContacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-12">
                                    <div className="flex flex-col items-center gap-3">
                                        {currentSearchTerm ? (
                                            <>
                                                <Search className="h-12 w-12 text-muted-foreground" />
                                                <h3 className="text-lg font-semibold text-foreground">No results found</h3>
                                                <p className="text-sm text-foreground/80 max-w-md text-wrap break-all">
                                                    No contacts match your search term &quot;{currentSearchTerm}&quot;.
                                                    Try adjusting your search terms.
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="h-12 w-12 text-muted-foreground" />
                                                <h3 className="text-lg font-semibold text-foreground">No messages yet</h3>
                                                <p className="text-sm text-foreground/80">
                                                    When visitors send messages, they&apos;ll appear here.
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedContacts.map((contact, index) => (
                                <TableRow 
                                    key={contact.id}
                                    className={!contact.reply ? "bg-blue-50/50 dark:bg-blue-950/10" : ""}
                                >
                                    <TableCell className="pl-4">{index + 1}</TableCell>
                                    <TableCell className="font-medium">{contact.name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.subject || "—"}</TableCell>
                                    <TableCell className="max-w-50 truncate">
                                        {contact.message.slice(0, 50)}
                                        {contact.message.length > 50 && "..."}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {format(new Date(contact.createdAt), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(contact)}</TableCell>
                                    <TableCell className="text-right pr-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="default"
                                                onClick={() => handleViewContact(contact)}
                                                className="group relative"
                                            >
                                                <Eye className="h-4 w-4" />
                                                <span className="absolute right-10 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    View Details
                                                </span>
                                            </Button>
                                            {/* {!contact.reply && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                    onClick={() => handleReplyContact(contact)}
                                                    title="Reply"
                                                >
                                                    <Reply className="h-4 w-4" />
                                                </Button>
                                            )} */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* View Contact Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-137.5">
                    <DialogHeader>
                        <DialogTitle>Contact Details</DialogTitle>
                        <div className="text-sm text-foreground/80">
                            Full message from {selectedContact?.name}
                        </div>
                    </DialogHeader>
                    {selectedContact && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                                        <User className="h-4 w-4" />
                                        Name
                                    </div>
                                    <p className="font-medium">{selectedContact.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </div>
                                    <p className="font-medium">{selectedContact.email}</p>
                                </div>
                            </div>
                            {selectedContact.subject && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                                        <MessageSquare className="h-4 w-4" />
                                        Subject
                                    </div>
                                    <p className="font-medium">{selectedContact.subject}</p>
                                </div>
                            )}
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-foreground/80">
                                    <MessageSquare className="h-4 w-4" />
                                    Message
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                                    <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                                </div>
                            </div>

                            {/* Show reply if exists */}
                            {selectedContact.reply && (
                                <div className="space-y-1 border-t pt-4">
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                        <Reply className="h-4 w-4" />
                                        Reply
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                        <p className="whitespace-pre-wrap">{selectedContact.reply}</p>
                                    </div>
                                    {selectedContact.repliedBy && (
                                        <p className="text-xs text-foreground/60">
                                            Replied by: {selectedContact.repliedBy.name} ({selectedContact.repliedBy.email})
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-sm text-foreground/80">
                                <Calendar className="h-4 w-4" />
                                Received: {format(new Date(selectedContact.createdAt), "PPP 'at' p")}
                            </div>

                            {!selectedContact.reply && (
                                <Button
                                    size={"lg"}
                                    className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    onClick={() => {
                                        setIsViewDialogOpen(false);
                                        setIsReplyDialogOpen(true);
                                    }}
                                >
                                    <Reply className="h-4 w-4 mr-2" />
                                    Reply to this message
                                </Button>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Reply Dialog */}
            <ReplyDialog
                open={isReplyDialogOpen}
                onOpenChange={setIsReplyDialogOpen}
                contact={selectedContact}
                onReplySuccess={handleReplySuccess}
            />
        </div>
    );
};

export default ContactList;
