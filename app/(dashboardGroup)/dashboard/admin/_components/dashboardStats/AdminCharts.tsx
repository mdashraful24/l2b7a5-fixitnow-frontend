/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

interface AdminChartsProps {
    monthlyData: Array<{ month: string; bookings: number; revenue: number }>;
    statusDistribution: Array<{ name: string; value: number; color: string }>;
    revenueData: Array<{ month: string; revenue: number }>;
    servicePopularity: Array<{ name: string; bookings: number }>;
}

// Custom label renderer with controlled text size
const renderCustomLabel = ({ name, percent, cx, cy, midAngle, innerRadius, outerRadius }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                fontSize: '12px',
                fontWeight: '600',
                fill: 'hsl(var(--foreground))',
                fontFamily: 'inherit'
            }}
        >
            {`${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
        </text>
    );
};

// Custom tooltip formatter
const formatCurrency = (value: any) => {
    if (typeof value !== 'number') return value;
    return `$${value.toFixed(2)}`;
};

export default function AdminCharts({
    monthlyData,
    statusDistribution,
    revenueData,
    servicePopularity,
}: AdminChartsProps) {
    // Colors for bar charts
    const barColors = ['#3b82f6', '#8b5cf6', '#22c55e', '#eab308', '#ef4444', '#06b6d4', '#f97316'];

    // Check if there's data to display
    const hasMonthlyData = monthlyData.some(item => item.bookings > 0);
    const hasStatusData = statusDistribution.length > 0;
    const hasRevenueData = revenueData.some(item => item.revenue > 0);
    const hasServiceData = servicePopularity.length > 0;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Bar Chart - Monthly Bookings */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Bookings</h3>
                <div className="h-64">
                    {hasMonthlyData ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-foreground/80 font-semibold">
                            No booking data available
                        </div>
                    )}
                </div>
            </div>

            {/* Pie Chart - Status Distribution */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-4">Booking Status Distribution</h3>
                <div className="h-64">
                    {hasStatusData ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomLabel}
                                    outerRadius={125}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {statusDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                {/* <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))'
                                    }}
                                    formatter={(value: any) => [`${value} bookings`, 'Count']}
                                /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-foreground/80 font-semibold">
                            No status data available
                        </div>
                    )}
                </div>
            </div>

            {/* Line Chart - Revenue Trend */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Trend</h3>
                <div className="h-64">
                    {hasRevenueData ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))'
                                    }}
                                    formatter={formatCurrency}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#22c55e"
                                    name="Revenue"
                                    strokeWidth={2}
                                    dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No revenue data available
                        </div>
                    )}
                </div>
            </div>

            {/* Bar Chart - Service Popularity */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-4">Popular Services</h3>
                <div className="h-64">
                    {hasServiceData ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={servicePopularity}
                                layout="vertical"
                                margin={{ left: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={80}
                                    tick={{ fontSize: 10 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))'
                                    }}
                                    formatter={(value: any) => [`${value} bookings`, 'Bookings']}
                                />
                                <Legend />
                                <Bar
                                    dataKey="bookings"
                                    name="Bookings"
                                    fill="#8b5cf6"
                                >
                                    {servicePopularity.map((_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={barColors[index % barColors.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No service data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
