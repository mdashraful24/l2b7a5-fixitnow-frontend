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

interface ClientChartsProps {
    monthlyData: Array<{ month: string; bookings: number; earnings: number }>;
    statusDistribution: Array<{ name: string; value: number; color: string }>;
    weeklyTrend: Array<{ day: string; bookings: number }>;
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

export default function ClientCharts({
    monthlyData,
    statusDistribution,
    weeklyTrend
}: ClientChartsProps) {
    // Check if there's data to show
    const hasMonthlyData = monthlyData.some(item => item.bookings > 0);
    const hasStatusData = statusDistribution.length > 0;
    const hasWeeklyData = weeklyTrend.some(item => item.bookings > 0);

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
                        <div className="flex h-full items-center justify-center text-muted-foreground">
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
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No status data available
                        </div>
                    )}
                </div>
            </div>

            {/* Line Chart - Weekly Trend */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
                <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Booking Trend</h3>
                <div className="h-64">
                    {hasWeeklyData ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="bookings"
                                    stroke="#8b5cf6"
                                    name="Bookings"
                                    strokeWidth={2}
                                    dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No weekly data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
