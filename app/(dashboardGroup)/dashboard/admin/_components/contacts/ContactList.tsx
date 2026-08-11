/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { IContact } from "@/lib/type";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format } from "date-fns";

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

    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Update contacts when initialContacts changes (e.g., on page navigation)
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
        const date = new Date(contact.createdAt);
        const now = new Date();
        const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffHours < 24) {
            return <Badge className="bg-green-100 text-green-700 border-green-200">New</Badge>;
        } else if (diffHours < 72) {
            return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
        } else {
            return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Read</Badge>;
        }
    };

    if (contacts.length === 0 && !isLoading) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-slate-100 p-4 mb-4">
                        <Mail className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">No messages yet</h3>
                    <p className="text-sm text-foreground/80 mt-1">When visitors send messages, they&apos;ll appear here.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">
                        Contacts Management
                    </h1>
                    <p className="text-foreground/80">
                        Create and manage contact messages for your platform.
                    </p>
                </div>

                <div className="relative w-full md:max-w-md">
                    <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        defaultValue={searchTerm || ""}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by name, email, subject or message..."
                        className="pl-9"
                    />
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
                        ) : (
                            contacts.map((contact, index) => (
                                <TableRow key={contact.id}>
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
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                setSelectedContact(contact);
                                                setIsViewDialogOpen(true);
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
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
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-foreground/80">
                                <Calendar className="h-4 w-4" />
                                Received: {format(new Date(selectedContact.createdAt), "PPP 'at' p")}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContactList;
