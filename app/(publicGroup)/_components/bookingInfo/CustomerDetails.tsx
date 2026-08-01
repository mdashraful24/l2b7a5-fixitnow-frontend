"use client";

interface CustomerDetailsProps {
    address: string;
    notes: string;
    onAddressChange: (value: string) => void;
    onNotesChange: (value: string) => void;
}

export function CustomerDetails({
    address,
    notes,
    onAddressChange,
    onNotesChange
}: CustomerDetailsProps) {
    return (
        <div className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 shadow-sm">
            <h2 className="mb-1 text-base font-semibold text-foreground">
                Step 3: Customer Details
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">Provide your service address.</p>
            <div className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-foreground">
                        Service Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
                        placeholder="e.g. 123 Main Street, Dhaka"
                        rows={3}
                        required
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-colors"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-foreground">
                        Notes <span className="text-xs text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => onNotesChange(e.target.value)}
                        placeholder="Any special instructions for the technician..."
                        rows={2}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
