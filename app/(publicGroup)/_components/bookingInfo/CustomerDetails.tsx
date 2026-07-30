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
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-base font-semibold">
                Step 3: Customer Details
            </h2>
            <p className="mb-4 text-sm text-gray-700">Provide your service address.</p>
            <div className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold">
                        Service Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
                        placeholder="e.g. 123 Main Street, Dhaka"
                        rows={3}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold">
                        Notes <span className="text-xs text-gray-600">(optional)</span>
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => onNotesChange(e.target.value)}
                        placeholder="Any special instructions for the technician..."
                        rows={2}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                </div>
            </div>
        </div>
    );
}
