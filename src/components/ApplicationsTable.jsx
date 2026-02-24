import React, { useState } from 'react';
import { updateApplicationStatus, deleteApplication } from '../services/api';
import { Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_COLORS = {
    APPLIED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    INTERVIEW: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    OFFER: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const ApplicationsTable = ({ applications, setApplications, setRefreshTrigger }) => {
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState(null);

    const handleStatusChange = async (id, newStatus) => {
        const previousApps = [...applications];
        setApplications(apps =>
            apps.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        );

        try {
            await updateApplicationStatus(id, newStatus);
        } catch (err) {
            setApplications(previousApps);
            setError(`Failed to update status: ${err.message || 'Unknown error'}`);
            setTimeout(() => setError(null), 5000);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application?')) {
            return;
        }

        setDeletingId(id);
        try {
            await deleteApplication(id);
            setApplications(apps => apps.filter(app => app.id !== id));
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            setError(`Failed to delete application: ${err.message || 'Unknown error'}`);
            setTimeout(() => setError(null), 5000);
        } finally {
            setDeletingId(null);
        }
    };

    if (!applications || applications.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-12 text-center text-neutral-500 flex flex-col items-center justify-center transition-colors hover:bg-[#0c0c0c]"
            >
                <div className="bg-neutral-900/50 p-4 rounded-full mb-5 ring-1 ring-inset ring-neutral-800">
                    <RefreshCw className="w-6 h-6 text-neutral-400" />
                </div>
                <p className="text-sm font-medium text-neutral-400">No applications found.</p>
                <p className="text-xs mt-2 text-neutral-600">Add your first job application above.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 overflow-hidden shadow-2xl shadow-black/50">
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 bg-red-950/30 text-red-400 flex items-center text-sm border-b border-red-900/50 font-medium"
                    >
                        <AlertCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800/50">
                    <thead className="bg-[#0f0f0f]">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                Source
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/50 bg-[#0a0a0a]">
                        <AnimatePresence>
                            {applications.map((app) => (
                                <motion.tr
                                    key={app.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
                                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                                    className="transition-colors group"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 font-mono">
                                        #{app.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-200">
                                        {app.companyName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                                        {app.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                        {app.source}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="relative inline-block w-full sm:w-auto">
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                className={`appearance-none text-xs font-medium rounded-lg pl-3 pr-8 py-1.5 border outline-none cursor-pointer focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 transition-all ${STATUS_COLORS[app.status] || 'bg-neutral-800 text-neutral-300 border-neutral-700'} hover:opacity-80 w-full`}
                                            >
                                                <option value="APPLIED" className="bg-[#0f0f0f] text-blue-400">Applied</option>
                                                <option value="INTERVIEW" className="bg-[#0f0f0f] text-amber-400">Interview</option>
                                                <option value="OFFER" className="bg-[#0f0f0f] text-emerald-400">Offer</option>
                                                <option value="REJECTED" className="bg-[#0f0f0f] text-red-400">Rejected</option>
                                            </select>
                                            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 opacity-70 ${app.status === 'APPLIED' ? 'text-blue-400' :
                                                    app.status === 'INTERVIEW' ? 'text-amber-400' :
                                                        app.status === 'OFFER' ? 'text-emerald-400' :
                                                            app.status === 'REJECTED' ? 'text-red-400' :
                                                                'text-neutral-400'
                                                }`}>
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleDelete(app.id)}
                                            disabled={deletingId === app.id}
                                            className="text-neutral-600 hover:text-red-400 disabled:opacity-50 transition-colors rounded-xl p-2 hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-500"
                                            title="Delete Application"
                                        >
                                            {deletingId === app.id ? (
                                                <div className="w-5 h-5 flex items-center justify-center">
                                                    <span className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></span>
                                                </div>
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsTable;
