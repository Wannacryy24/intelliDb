import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, LabelList, Cell } from 'recharts';
import './DbActivityBarChart.css';
import { Typography, Paper, Box } from '@mui/material';

const COLORS = [
    '#42a5f5', '#66bb6a', '#ffa726', '#ef5350',
    '#ab47bc', '#26a69a', '#ff7043', '#5c6bc0',
    '#8d6e63', '#26c6da'
];

const formatValue = (val) => {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1)}k`;
    return val;
};

const DbActivityBarChart = ({ db_activity }) => {
    if (!db_activity) return null;

    const tuples = db_activity.tuple_stats || {};
    const io = db_activity.io_stats || {};
    const txns = db_activity.transactions || {};

    const rawStats = [
        { label: 'Commits', value: txns.commits },
        { label: 'Rollbacks', value: txns.rollbacks },
        { label: 'Blocks Read', value: io.blocks_read },
        { label: 'Blocks Hit', value: io.blocks_hit },
        { label: 'Hit Ratio (%)', value: parseFloat(io.hit_ratio) || 0 },
        { label: 'Tuples Returned', value: tuples.returned },
        { label: 'Tuples Fetched', value: tuples.fetched },
        { label: 'Tuples Inserted', value: tuples.inserted },
        { label: 'Tuples Updated', value: tuples.updated },
        { label: 'Tuples Deleted', value: tuples.deleted },
    ];

    const stats = rawStats.map((item) => ({
        ...item,
        displayValue: item.value,
        value: item.value ? Math.log10(item.value + 1) : 0,
    }));

    const maxLogValue = Math.max(...stats.map((d) => d.value));

    return (
        <div className="db-activity-container">
            <div className="db-activity-title">Database Activity Overview</div>
            <ResponsiveContainer width="100%" height={440}>
                <BarChart
                    data={stats}
                    layout="vertical"
                    margin={{ top: 20, right: 120, left: 120, bottom: 20 }}
                    barCategoryGap="20%"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        type="number"
                        hide
                        domain={[0, Math.ceil(maxLogValue)]}
                    />
                    <YAxis dataKey="label" type="category" />
                    <RechartsTooltip
                        formatter={(val, name, props) =>
                            [`${props.payload.displayValue}`, props.payload.label]}
                        contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: 10 }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                        <LabelList
                            dataKey="displayValue"
                            position="right"
                            formatter={(val) => formatValue(val)}
                            style={{ fill: '#333', fontSize: 12 }}
                        />
                        {stats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="db-activity-footer">
                * Bars are log-scaled for better visual comparison. Raw values shown at end.
            </div>
        </div>
    );
};

export default DbActivityBarChart;
