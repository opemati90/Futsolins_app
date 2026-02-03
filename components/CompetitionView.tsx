import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Users, Award, CreditCard, CheckCircle, X, ChevronRight, Star, TrendingUp, Clock } from 'lucide-react';
import { Competition, CompetitionEntry } from '../types';
import { MOCK_COMPETITIONS, JAMB_SUBJECTS } from '../constants';

interface CompetitionViewProps {
  isDarkMode?: boolean;
}

export const CompetitionView: React.FC<CompetitionViewProps> = ({ isDarkMode }) => {
  const [competitions, setCompetitions] = useState<Competition[]>(MOCK_COMPETITIONS);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'confirm' | 'success'>('details');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['English Language']);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [userEntries, setUserEntries] = useState<CompetitionEntry[]>(() => {
    const stored = localStorage.getItem('eduprep_competition_entries');
    return stored ? JSON.parse(stored) : [];
  });

  const activeCompetitions = competitions.filter(c => c.status === 'active');
  const upcomingCompetitions = competitions.filter(c => c.status === 'upcoming');
  const pastCompetitions = competitions.filter(c => c.status === 'ended');

  const handleSubjectToggle = (subject: string) => {
    if (subject === 'English Language') return; // English is always selected
    
    setSelectedSubjects(prev => {
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      } else if (prev.length < 4) {
        return [...prev, subject];
      }
      return prev;
    });
  };

  const handleEnterCompetition = (competition: Competition) => {
    setSelectedCompetition(competition);
    setSelectedSubjects(['English Language']);
    setShowPaymentModal(true);
    setPaymentStep('details');
  };

  const handlePaymentSubmit = () => {
    // Mock payment processing
    setTimeout(() => {
      setPaymentStep('success');
      
      // Create entry
      const newEntry: CompetitionEntry = {
        competitionId: selectedCompetition!.id,
        userId: 'user-1', // Mock user ID
        subjects: selectedSubjects,
        paymentStatus: 'completed'
      };
      
      const updated = [...userEntries, newEntry];
      setUserEntries(updated);
      localStorage.setItem('eduprep_competition_entries', JSON.stringify(updated));
      
      // Update competition participants
      setCompetitions(prev => prev.map(c => 
        c.id === selectedCompetition!.id 
          ? { ...c, participants: c.participants + 1 }
          : c
      ));
    }, 2000);
  };

  const getUserEntry = (competitionId: string) => {
    return userEntries.find(e => e.competitionId === competitionId);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-xl">
            <Trophy className="h-8 w-8 text-nigeria-600 dark:text-nigeria-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Competitions</h1>
            <p className="text-gray-600 dark:text-slate-400">Compete for cash prizes and test your knowledge</p>
          </div>
        </div>
      </div>

      {/* Active Competitions */}
      {activeCompetitions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Active Competitions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activeCompetitions.map(competition => {
              const entry = getUserEntry(competition.id);
              return (
                <div key={competition.id} className="bg-gradient-to-br from-nigeria-50 to-nigeria-100 dark:from-nigeria-900/20 dark:to-nigeria-900/40 rounded-2xl p-6 border-2 border-nigeria-200 dark:border-nigeria-800 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{competition.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {competition.participants} participants
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                      Active
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Prize Pool</p>
                        <p className="text-2xl font-bold text-nigeria-600 dark:text-nigeria-400">₦{competition.prizePool.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Entry Fee</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">₦{competition.entryFee.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-2">
                      {competition.subjects.map(subject => (
                        <span key={subject} className="px-2 py-1 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-lg text-xs font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {entry ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-bold">You're registered!</span>
                      </div>
                      {entry.score !== undefined && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                          Your Score: {entry.score} | Rank: #{entry.rank}
                        </p>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnterCompetition(competition)}
                      className="w-full py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all flex items-center justify-center gap-2"
                    >
                      Enter Competition <ChevronRight className="h-5 w-5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Competitions */}
      {upcomingCompetitions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Upcoming Competitions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingCompetitions.map(competition => (
              <div key={competition.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{competition.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Starts {formatDate(competition.startDate)}
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold">
                    Upcoming
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Prize Pool</p>
                      <p className="text-2xl font-bold text-nigeria-600 dark:text-nigeria-400">₦{competition.prizePool.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Entry Fee</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">₦{competition.entryFee.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <button
                  disabled
                  className="w-full py-3 bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400 font-bold rounded-xl cursor-not-allowed"
                >
                  Registration Opens Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedCompetition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-slate-800 relative">
            {paymentStep === 'details' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Enter Competition</h2>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Select Your Subjects (English is compulsory)</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {JAMB_SUBJECTS.map(subject => {
                      const isSelected = selectedSubjects.includes(subject);
                      const isEnglish = subject === 'English Language';
                      return (
                        <button
                          key={subject}
                          onClick={() => !isEnglish && handleSubjectToggle(subject)}
                          disabled={isEnglish}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-nigeria-600 bg-nigeria-50 dark:bg-nigeria-900/20 text-nigeria-700 dark:text-nigeria-400'
                              : 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-nigeria-400'
                          } ${isEnglish ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {subject}
                          {isEnglish && <span className="text-xs block text-gray-500">(Required)</span>}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                    Selected: {selectedSubjects.length}/4 subjects
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Payment Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={paymentDetails.cardName}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-slate-400">Entry Fee</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">₦{selectedCompetition.entryFee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setPaymentStep('confirm')}
                    disabled={selectedSubjects.length !== 4}
                    className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {paymentStep === 'confirm' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Confirm Payment</h2>
                  <p className="text-gray-600 dark:text-slate-400">You are about to pay ₦{selectedCompetition.entryFee.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Selected Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubjects.map(subject => (
                      <span key={subject} className="px-2 py-1 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setPaymentStep('details')}
                    className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
                  >
                    Pay Now
                  </button>
                </div>
              </>
            )}

            {paymentStep === 'success' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
                <p className="text-gray-600 dark:text-slate-400 mb-6">You have successfully entered the competition</p>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentStep('details');
                  }}
                  className="w-full py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
