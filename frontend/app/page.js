'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All Categories', 'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];
  const statuses = ['All Status', 'Open', 'In Progress', 'Closed'];

  const statusColors = {
    'Open':        'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Closed':      'bg-slate-100 text-slate-500 border border-slate-200',
  };

  const categoryColors = {
    'Plumbing':   'bg-blue-50 text-blue-700',
    'Electrical': 'bg-orange-50 text-orange-700',
    'Painting':   'bg-purple-50 text-purple-700',
    'Joinery':    'bg-teal-50 text-teal-700',
    'Other':      'bg-gray-100 text-gray-600',
  };

  const categoryIcons = {
    'Plumbing':   '🔧',
    'Electrical': '⚡',
    'Painting':   '🎨',
    'Joinery':    '🪵',
    'Other':      '🔩',
  };

  useEffect(() => {
    fetchJobs();
  }, [category, status]);

  async function fetchJobs() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All Categories') params.append('category', category);
      if (status && status !== 'All Status') params.append('status', status);
      const query = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`${API}/api/jobs${query}`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const q = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold">G</div>
            <div>
              <span className="text-lg font-bold text-slate-800">GlobalTNA</span>
              <p className="text-xs text-slate-400 leading-none">Service Request Board</p>
            </div>
          </div>
          <Link href="/new"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2">
            + Post New Job
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Service Requests</h1>
          <p className="text-slate-500 mt-1 text-sm">Browse and manage service requests from homeowners across the UK</p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value === 'All Categories' ? '' : e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value === 'All Status' ? '' : e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 cursor-pointer"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-slate-500 mb-4 font-medium">
          Showing <span className="text-blue-600 font-semibold">{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? 's' : ''}
        </p>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-4xl mb-3 animate-pulse">⚙️</p>
            <p className="font-medium">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="font-semibold text-slate-600 text-lg">No jobs found</p>
            <p className="text-sm mt-1">Try changing your filters or post a new request</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <div key={job._id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex flex-col justify-between group">

                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{categoryIcons[job.category] || '🔩'}</span>
                      <h2 className="text-base font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition">
                        {job.title}
                      </h2>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                  <span>📍 {job.location || 'N/A'}</span>
                  <span className="text-slate-200">|</span>
                  <span>📅 {new Date(job.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[job.category] || 'bg-gray-100 text-gray-600'}`}>
                    {job.category}
                  </span>
                  <Link href={`/jobs/${job._id}`}
                    className="text-sm text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 transition">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-slate-400">
          GlobalTNA Service Request Board © 2026
        </div>
      </div>

    </main>
  );
}