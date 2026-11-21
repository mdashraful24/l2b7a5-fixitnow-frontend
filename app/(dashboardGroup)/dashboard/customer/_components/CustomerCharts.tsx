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

interface CustomerChartsProps {
    monthlyData: Array<{ month: string; bookings: number; spent: number }>;
    statusDistribution: Array<{ name: string; value: number; color: string }>;
    weeklyTrend: Array<{ day: string; bookings: number }>;
    servicePopularity: Array<{ name: string; bookings: number }>;
}

const renderCustomLabel = (props: any) => {
    const { name, percent, cx, cy, midAngle, innerRadius, outerRadius } = props;

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
                fontSize: '10px',
                fontWeight: '600',
                fill: 'var(--foreground)',
                fontFamily: 'inherit'
            }}
        >
            {`${name} ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function CustomerCharts({
    monthlyData,
    statusDistribution,
    weeklyTrend,
    servicePopularity,
}: CustomerChartsProps) {
    const barColors = [
        'var(--chart-1)',
        'var(--chart-2)',
        'var(--chart-3)',
        'var(--chart-4)',
        'var(--chart-5)',
    ];

    const hasMonthlyData = monthlyData.some(item => item.bookings > 0);
    const hasStatusData = statusDistribution.length > 0;
    const hasWeeklyData = weeklyTrend.some(item => item.bookings > 0);
    const hasServiceData = servicePopularity.length > 0;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Bar Chart - Monthly Bookings */}
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
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
                                        backgroundColor: 'var(--background)',
                                        border: '1px solid var(--border)'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="bookings" fill="var(--chart-1)" name="Bookings" />
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
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
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
                                    fill="var(--chart-2)"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {statusDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
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
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
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
                                        backgroundColor: 'var(--background)',
                                        border: '1px solid var(--border)'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="bookings"
                                    stroke="var(--chart-2)"
                                    name="Bookings"
                                    strokeWidth={2}
                                    dot={{ stroke: 'var(--chart-2)', strokeWidth: 2, r: 4 }}
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

            {/* Bar Chart - Service Popularity */}
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-4">Your Most Booked Services</h3>
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
                                        backgroundColor: 'var(--background)',
                                        border: '1px solid var(--border)'
                                    }}
                                    formatter={(value: any) => [`${value} bookings`, 'Bookings']}
                                />
                                <Legend />
                                <Bar dataKey="bookings" name="Bookings" fill="var(--chart-2)">
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
