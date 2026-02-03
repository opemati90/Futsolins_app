import React, { useState } from 'react';
import { Globe, FileText, CheckCircle, Plus, X, Upload, Calendar, MapPin, GraduationCap, Award } from 'lucide-react';
import { AdmissionApplication, VisaApplication } from '../types';

interface AdmissionHubViewProps {
  isDarkMode?: boolean;
}

type Tab = 'dashboard' | 'admission' | 'visa';

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Sweden'];
const UNIVERSITIES = {
  'United States': ['Harvard University', 'MIT', 'Stanford University', 'Yale University'],
  'United Kingdom': ['Oxford University', 'Cambridge University', 'Imperial College', 'LSE'],
  'Canada': ['University of Toronto', 'McGill University', 'UBC', 'University of Alberta'],
  'Australia': ['University of Melbourne', 'University of Sydney', 'ANU', 'Monash University'],
  'Germany': ['LMU Munich', 'Heidelberg University', 'TU Munich', 'Humboldt University'],
  'France': ['Sorbonne University', 'École Polytechnique', 'Sciences Po', 'HEC Paris'],
  'Netherlands': ['University of Amsterdam', 'TU Delft', 'Leiden University', 'Utrecht University'],
  'Sweden': ['Lund University', 'Uppsala University', 'Stockholm University', 'KTH Royal Institute']
};

export const AdmissionHubView: React.FC<AdmissionHubViewProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [admissionApplications, setAdmissionApplications] = useState<AdmissionApplication[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('eduprep_admission_applications');
        return stored ? JSON.parse(stored) : [];
      }
    } catch (error) {
      console.error('Error loading admission applications:', error);
    }
    return [];
  });
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('eduprep_visa_applications');
        return stored ? JSON.parse(stored) : [];
      }
    } catch (error) {
      console.error('Error loading visa applications:', error);
    }
    return [];
  });
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [showVisaForm, setShowVisaForm] = useState(false);

  // Admission Form State
  const [admissionForm, setAdmissionForm] = useState({
    targetCountry: '',
    targetUniversity: '',
    program: '',
    documents: [] as string[]
  });

  // Visa Form State
  const [visaForm, setVisaForm] = useState({
    country: '',
    visaType: '',
    documents: [] as string[]
  });

  const handleAdmissionSubmit = () => {
    const newApplication: AdmissionApplication = {
      id: `adm-${Date.now()}`,
      userId: 'user-1',
      targetCountry: admissionForm.targetCountry,
      targetUniversity: admissionForm.targetUniversity,
      program: admissionForm.program,
      status: 'draft',
      documents: admissionForm.documents,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updated = [...admissionApplications, newApplication];
    setAdmissionApplications(updated);
    localStorage.setItem('eduprep_admission_applications', JSON.stringify(updated));
    setShowAdmissionForm(false);
    setAdmissionForm({ targetCountry: '', targetUniversity: '', program: '', documents: [] });
  };

  const handleVisaSubmit = () => {
    const newApplication: VisaApplication = {
      id: `visa-${Date.now()}`,
      userId: 'user-1',
      country: visaForm.country,
      visaType: visaForm.visaType,
      status: 'draft',
      documents: visaForm.documents,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updated = [...visaApplications, newApplication];
    setVisaApplications(updated);
    localStorage.setItem('eduprep_visa_applications', JSON.stringify(updated));
    setShowVisaForm(false);
    setVisaForm({ country: '', visaType: '', documents: [] });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'under-review':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-xl">
            <Globe className="h-8 w-8 text-nigeria-600 dark:text-nigeria-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admission & Visa Hub</h1>
            <p className="text-gray-600 dark:text-slate-400">Process your study abroad applications</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-3 font-bold transition-all border-b-2 ${
            activeTab === 'dashboard'
              ? 'border-nigeria-600 text-nigeria-600 dark:text-nigeria-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('admission')}
          className={`px-6 py-3 font-bold transition-all border-b-2 ${
            activeTab === 'admission'
              ? 'border-nigeria-600 text-nigeria-600 dark:text-nigeria-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          Admission Applications
        </button>
        <button
          onClick={() => setActiveTab('visa')}
          className={`px-6 py-3 font-bold transition-all border-b-2 ${
            activeTab === 'visa'
              ? 'border-nigeria-600 text-nigeria-600 dark:text-nigeria-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          Visa Applications
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {admissionApplications.length}
            </h3>
            <p className="text-gray-600 dark:text-slate-400">Admission Applications</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {visaApplications.length}
            </h3>
            <p className="text-gray-600 dark:text-slate-400">Visa Applications</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {admissionApplications.filter(a => a.status === 'accepted').length}
            </h3>
            <p className="text-gray-600 dark:text-slate-400">Accepted Offers</p>
          </div>
        </div>
      )}

      {/* Admission Applications Tab */}
      {activeTab === 'admission' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admission Applications</h2>
            <button
              onClick={() => setShowAdmissionForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
            >
              <Plus className="h-5 w-5" />
              New Application
            </button>
          </div>

          {admissionApplications.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-gray-200 dark:border-slate-800 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-slate-400 mb-4">No admission applications yet</p>
              <button
                onClick={() => setShowAdmissionForm(true)}
                className="px-6 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
              >
                Create Application
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {admissionApplications.map(app => (
                <div key={app.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{app.targetUniversity}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {app.targetCountry}
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          {app.program}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-500">
                    <Calendar className="h-4 w-4" />
                    Created: {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Visa Applications Tab */}
      {activeTab === 'visa' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Visa Applications</h2>
            <button
              onClick={() => setShowVisaForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
            >
              <Plus className="h-5 w-5" />
              New Application
            </button>
          </div>

          {visaApplications.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-gray-200 dark:border-slate-800 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-slate-400 mb-4">No visa applications yet</p>
              <button
                onClick={() => setShowVisaForm(true)}
                className="px-6 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
              >
                Create Application
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {visaApplications.map(app => (
                <div key={app.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{app.country} - {app.visaType}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {app.country}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-500">
                    <Calendar className="h-4 w-4" />
                    Created: {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admission Form Modal */}
      {showAdmissionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-gray-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Admission Application</h2>
              <button
                onClick={() => setShowAdmissionForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Target Country
                </label>
                <select
                  value={admissionForm.targetCountry}
                  onChange={(e) => setAdmissionForm({...admissionForm, targetCountry: e.target.value, targetUniversity: ''})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {admissionForm.targetCountry && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Target University
                  </label>
                  <select
                    value={admissionForm.targetUniversity}
                    onChange={(e) => setAdmissionForm({...admissionForm, targetUniversity: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select University</option>
                    {UNIVERSITIES[admissionForm.targetCountry as keyof typeof UNIVERSITIES]?.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Program of Study
                </label>
                <input
                  type="text"
                  value={admissionForm.program}
                  onChange={(e) => setAdmissionForm({...admissionForm, program: e.target.value})}
                  placeholder="e.g., Computer Science, Medicine, Law"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Documents (Mock - file names only)
                </label>
                <div className="space-y-2">
                  {admissionForm.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-slate-300">{doc}</span>
                      <button
                        onClick={() => setAdmissionForm({...admissionForm, documents: admissionForm.documents.filter((_, i) => i !== idx)})}
                        className="ml-auto text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const docName = prompt('Enter document name:');
                      if (docName) {
                        setAdmissionForm({...admissionForm, documents: [...admissionForm.documents, docName]});
                      }
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg text-gray-600 dark:text-slate-400 hover:border-nigeria-400 hover:text-nigeria-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Add Document
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAdmissionForm(false)}
                  className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdmissionSubmit}
                  disabled={!admissionForm.targetCountry || !admissionForm.targetUniversity || !admissionForm.program}
                  className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visa Form Modal */}
      {showVisaForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Visa Application</h2>
              <button
                onClick={() => setShowVisaForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Country
                </label>
                <select
                  value={visaForm.country}
                  onChange={(e) => setVisaForm({...visaForm, country: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Visa Type
                </label>
                <select
                  value={visaForm.visaType}
                  onChange={(e) => setVisaForm({...visaForm, visaType: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Visa Type</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="Work Visa">Work Visa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Required Documents
                </label>
                <div className="space-y-2">
                  {visaForm.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-slate-300">{doc}</span>
                      <button
                        onClick={() => setVisaForm({...visaForm, documents: visaForm.documents.filter((_, i) => i !== idx)})}
                        className="ml-auto text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const docName = prompt('Enter document name:');
                      if (docName) {
                        setVisaForm({...visaForm, documents: [...visaForm.documents, docName]});
                      }
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg text-gray-600 dark:text-slate-400 hover:border-nigeria-400 hover:text-nigeria-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Add Document
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowVisaForm(false)}
                  className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVisaSubmit}
                  disabled={!visaForm.country || !visaForm.visaType}
                  className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
