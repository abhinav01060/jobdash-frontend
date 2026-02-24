import React, { useState } from 'react';
import { createApplication } from '../services/api';
import { Building2, Briefcase, Globe, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ApplicationForm = ({ onApplicationAdded }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        source: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await createApplication(formData);
            setFormData({ companyName: '', role: '', source: '' });
            onApplicationAdded();
        } catch (err) {
            let errorMessage = 'Failed to submit application. Please try again.';
            if (err.response && err.response.data) {
                if (typeof err.response.data === 'string') {
                    errorMessage = err.response.data;
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else if (err.response.data.errors) {
                    errorMessage = Array.isArray(err.response.data.errors)
                        ? err.response.data.errors.join(', ')
                        : JSON.stringify(err.response.data.errors);
                }
            }
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-6 transition-colors hover:bg-[#0c0c0c]">
            <h2 className="text-lg font-medium text-neutral-200 mb-6 flex items-center">
                Add New Application
            </h2>

            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-6 p-3 bg-red-950/20 border border-red-900 text-red-400 font-medium rounded-xl flex items-center text-sm"
                >
                    <AlertCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2" htmlFor="companyName">
                        Company Name
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Building2 className="h-4 w-4 text-blue-500/70 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            required
                            value={formData.companyName}
                            onChange={handleChange}
                            className="pl-10 block w-full rounded-xl border border-neutral-800 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 sm:text-sm py-2.5 bg-neutral-900/50 text-neutral-200 transition-all placeholder:text-neutral-600"
                            placeholder="e.g. Google"
                        />
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2" htmlFor="role">
                        Role
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Briefcase className="h-4 w-4 text-purple-500/70 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            required
                            value={formData.role}
                            onChange={handleChange}
                            className="pl-10 block w-full rounded-xl border border-neutral-800 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 sm:text-sm py-2.5 bg-neutral-900/50 text-neutral-200 transition-all placeholder:text-neutral-600"
                            placeholder="e.g. Software Engineer"
                        />
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2" htmlFor="source">
                        Source
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Globe className="h-4 w-4 text-emerald-500/70 group-focus-within:text-emerald-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            id="source"
                            name="source"
                            required
                            value={formData.source}
                            onChange={handleChange}
                            className="pl-10 block w-full rounded-xl border border-neutral-800 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 sm:text-sm py-2.5 bg-neutral-900/50 text-neutral-200 transition-all placeholder:text-neutral-600"
                            placeholder="e.g. LinkedIn"
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto mt-4 md:mt-0 flex items-center justify-center py-2.5 px-6 border border-neutral-700 rounded-xl shadow-sm text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:ring-offset-black"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                            Submitting...
                        </>
                    ) : (
                        'Add App'
                    )}
                </motion.button>
            </form>
        </div>
    );
};

export default ApplicationForm;
