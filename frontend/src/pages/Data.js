
import React from 'react';
import './Data.css';

const Data = () => {
    // Mock data for datasets
    const datasets = [
        {
            id: 'd-001',
            name: 'options_q4_2024.csv',
            rows: 847,
            columns: 6,
            size: '24 KB',
            date: 'Today',
            status: 'In Use',
        },
        {
            id: 'd-002',
            name: 'credit_portfolio_2024.json',
            rows: 210,
            columns: 8,
            size: '18 KB',
            date: '3 days ago',
            status: 'Profiled',
        },
        {
            id: 'd-003',
            name: 'insurance_policies_q3.csv',
            rows: 1240,
            columns: 5,
            size: '67 KB',
            date: '1 week ago',
            status: 'Profiled',
        },
    ];

    const getStatusBadge = (status) => {
        if (status === 'In Use') return 'badge-in-progress';
        if (status === 'Profiled') return 'badge-complete';
        return '';
    };

    return (
        <div className="data-container">
            <div className="dashboard-header">
                <div className="dh-title">Data Management</div>
                <div className="dh-sub">Uploaded datasets and their profile reports</div>
            </div>
            <div className="data-page">
                <div className="section-head">
                    <div className="section-title">Datasets ({datasets.length})</div>
                    <button className="section-action">+ Upload New</button>
                </div>
                {datasets.map(d => (
                    <div className="dataset-item" key={d.id}>
                        <div className="ds-icon">📊</div>
                        <div className="ds-info">
                            <div className="ds-name">{d.name}</div>
                            <div className="ds-meta-row">
                                <span className="ds-meta">{d.rows} rows · {d.columns} columns · {d.size}</span>
                                <span className="ds-meta">Uploaded {d.date}</span>
                                <span className={`badge ${getStatusBadge(d.status)}`}>{d.status}</span>
                            </div>
                        </div>
                        <div className="ds-actions">
                            <button className="ds-action">Profile</button>
                            <button className="ds-action">Download</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Data;
