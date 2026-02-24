import React, { useState, useEffect } from 'react';
import { getApplications } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationsTable from '../components/ApplicationsTable';
import { LayoutDashboard, Loader2, AlertCircle, TrendingUp, CheckCircle, MessagesSquare, ListFilter } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        fetchApplications();
    }, [refreshTrigger]);

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getApplications();
            setApplications(data);
        } catch (err) {
            setError('Failed to fetch applications. Ensure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplicationAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const totalApps = applications.length;
    const interviews = applications.filter(app => app.status === 'INTERVIEW').length;
    const offers = applications.filter(app => app.status === 'OFFER').length;

    const filteredApplications = statusFilter === 'ALL'
        ? applications
        : applications.filter(app => app.status === statusFilter);

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-black pb-12 font-sans selection:bg-neutral-800 selection:text-white">
            <header className="bg-black/80 backdrop-blur-md border-b border-neutral-900 sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center"
                        >
                            <LayoutDashboard className="h-6 w-6 text-indigo-400 mr-3" />
                            <h1 className="text-xl font-medium text-neutral-100 tracking-tight">Job Dash</h1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center space-x-2 text-sm text-neutral-500 font-medium"
                        >
                            <div className={`w-2 h-2 rounded-full ${!error ? 'bg-emerald-500' : 'bg-red-500'} ${!error ? 'animate-pulse' : ''}`}></div>
                            <span>{error ? 'Disconnected' : 'Connected'}</span>
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8"
                >
                    <motion.div variants={fadeInUp} className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl flex items-center p-5 transition-colors hover:bg-[#111]">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 mr-4 ring-1 ring-inset ring-blue-500/20">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-500">Total</p>
                            <p className="text-2xl font-semibold text-neutral-100">{isLoading && totalApps === 0 ? '-' : totalApps}</p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl flex items-center p-5 transition-colors hover:bg-[#111]">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 mr-4 ring-1 ring-inset ring-amber-500/20">
                            <MessagesSquare className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-500">Interviews</p>
                            <p className="text-2xl font-semibold text-neutral-100">{isLoading && totalApps === 0 ? '-' : interviews}</p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl flex items-center p-5 transition-colors hover:bg-[#111]">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mr-4 ring-1 ring-inset ring-emerald-500/20">
                            <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-500">Offers</p>
                            <p className="text-2xl font-semibold text-neutral-100">{isLoading && totalApps === 0 ? '-' : offers}</p>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <ApplicationForm onApplicationAdded={handleApplicationAdded} />
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 bg-red-950/30 border border-red-900 p-4 rounded-xl"
                    >
                        <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                            <p className="text-sm text-red-200 font-medium">{error}</p>
                            <button
                                onClick={fetchApplications}
                                className="ml-auto text-sm text-red-400 font-medium hover:text-red-300 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-6 flex justify-between items-center bg-[#0a0a0a] p-3 border border-neutral-900 rounded-2xl"
                >
                    <div className="flex items-center text-sm font-medium text-neutral-400 ml-2">
                        <ListFilter className="w-4 h-4 mr-2" />
                        <span>Filter</span>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-sm border-neutral-800 outline-none border focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 rounded-lg py-1.5 px-3 bg-neutral-900 text-neutral-200 transition-colors"
                    >
                        <option value="ALL" className="bg-[#0f0f0f] text-neutral-200">All Statuses</option>
                        <option value="APPLIED" className="bg-[#0f0f0f] text-blue-400">Applied</option>
                        <option value="INTERVIEW" className="bg-[#0f0f0f] text-amber-400">Interview</option>
                        <option value="OFFER" className="bg-[#0f0f0f] text-emerald-400">Offer</option>
                        <option value="REJECTED" className="bg-[#0f0f0f] text-red-400">Rejected</option>
                    </select>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="relative min-h-[300px]"
                >
                    {isLoading && applications.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-2xl bg-black">
                            <Loader2 className="w-8 h-8 text-neutral-600 animate-spin mb-4" />
                            <p className="text-sm font-medium text-neutral-500">Loading...</p>
                        </div>
                    ) : (
                        <ApplicationsTable
                            applications={filteredApplications}
                            setApplications={setApplications}
                            setRefreshTrigger={setRefreshTrigger}
                        />
                    )}
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
