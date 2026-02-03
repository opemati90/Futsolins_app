import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Users, Award, CreditCard, CheckCircle, X, ChevronRight, Star, TrendingUp, Clock, Zap, Medal, Target, ArrowLeft, ArrowRight } from 'lucide-react';
import { Competition, CompetitionEntry } from '../types';
import { MOCK_COMPETITIONS, JAMB_SUBJECTS } from '../constants';

interface CompetitionViewProps {
  isDarkMode?: boolean;
}

type CompetitionTab = 'active' | 'upcoming' | 'past' | 'my-competitions';
type PaymentStep = 'overview' | 'subjects' | 'payment' | 'confirm' | 'success';

export const CompetitionView: React.FC<CompetitionViewProps> = ({ isDarkMode }) => {
  const [competitions, setCompetitions] = useState<Competition[]>(() => {
    try {
      return MOCK_COMPETITIONS;
    } catch (error) {
      console.error('Error loading competitions:', error);
      return [];
    }
  });
  const [activeTab, setActiveTab] = useState<CompetitionTab>('active');
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('overview');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['English Language']);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [userEntries, setUserEntries] = useState<CompetitionEntry[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('eduprep_competition_entries');
        return stored ? JSON.parse(stored) : [];
      }
    } catch (error) {
      console.error('Error loading competition entries:', error);
    }
    return [];
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('eduprep_competition_entries', JSON.stringify(userEntries));
      }
    } catch (error) {
      console.error('Error saving competition entries:', error);
    }
  }, [userEntries]);

  const activeCompetitions = competitions.filter(c => c.status === 'active');
  const upcomingCompetitions = competitions.filter(c => c.status === 'upcoming');
  const pastCompetitions = competitions.filter(c => c.status === 'ended');
  const myCompetitions = competitions.filter(c => 
    userEntries.some(e => e.competitionId === c.id)
  );

  const handleSubjectToggle = (subject: string) => {
    if (subject === 'English Language') return;
    
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
    setPaymentStep('overview');
  };

  const handlePaymentSubmit = () => {
    setTimeout(() => {
      setPaymentStep('success');
      
      const newEntry: CompetitionEntry = {
        competitionId: selectedCompetition!.id,
        userId: 'user-1',
        subjects: selectedSubjects,
        paymentStatus: 'completed'
      };
      
      const updated = [...userEntries, newEntry];
      setUserEntries(updated);
      
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

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const renderCompetitionCard = (competition: Competition, isCompact = false) => {
    const entry = getUserEntry(competition.id);
    const daysRemaining = competition.status === 'active' ? getDaysRemaining(competition.endDate) : null;
    const isRegistered = !!entry;

    return (
      <div 
        key={competition.id} 
        className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
          competition.status === 'active' 
            ? 'border-nigeria-200 dark:border-nigeria-800 shadow-lg' 
            : 'border-gray-200 dark:border-slate-800 shadow-sm'
        }`}
      >
        {/* Card Header */}
        <div className={`p-4 sm:p-6 ${competition.status === 'active' ? 'bg-gradient-to-r from-nigeria-50 to-nigeria-100 dark:from-nigeria-900/20 dark:to-nigeria-900/40' : 'bg-gray-50 dark:bg-slate-800/50'}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {competition.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="whitespace-nowrap">{formatDate(competition.startDate)}</span>
                  {competition.status === 'active' && (
                    <>
                      <span className="text-gray-400">-</span>
                      <span className="whitespace-nowrap">{formatDate(competition.endDate)}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{competition.participants.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
              competition.status === 'active' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : competition.status === 'upcoming'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
            }`}>
              {competition.status === 'active' ? 'Active' : competition.status === 'upcoming' ? 'Upcoming' : 'Ended'}
            </div>
          </div>

          {daysRemaining !== null && daysRemaining > 0 && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-nigeria-700 dark:text-nigeria-400 font-medium">
              <Clock className="h-4 w-4" />
              <span>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6">
          {/* Prize Pool & Entry Fee */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-nigeria-50 to-nigeria-100 dark:from-nigeria-900/20 dark:to-nigeria-900/40 rounded-xl p-3 sm:p-4">
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Prize Pool</p>
              <p className="text-xl sm:text-2xl font-bold text-nigeria-600 dark:text-nigeria-400">
                ₦{competition.prizePool.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3 sm:p-4">
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Entry Fee</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                ₦{competition.entryFee.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Subjects */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">Subjects</p>
            <div className="flex flex-wrap gap-2">
              {competition.subjects.slice(0, 4).map(subject => (
                <span 
                  key={subject} 
                  className="px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                >
                  {subject}
                </span>
              ))}
              {competition.subjects.length > 4 && (
                <span className="px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-500 rounded-lg text-xs font-medium">
                  +{competition.subjects.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          {isRegistered ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-1">
                <CheckCircle className="h-5 w-5" />
                <span className="font-bold text-sm sm:text-base">You're Registered!</span>
              </div>
              {entry?.score !== undefined && entry?.rank !== undefined ? (
                <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-green-600 dark:text-green-400">
                  <span>Score: {entry.score}</span>
                  <span>Rank: #{entry.rank}</span>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1">
                  Competition in progress
                </p>
              )}
            </div>
          ) : competition.status === 'active' ? (
            <button
              onClick={() => handleEnterCompetition(competition)}
              className="w-full py-3 sm:py-3.5 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px]"
            >
              Enter Competition
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          ) : competition.status === 'upcoming' ? (
            <button
              disabled
              className="w-full py-3 sm:py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 font-bold rounded-xl cursor-not-allowed text-sm sm:text-base min-h-[44px]"
            >
              Registration Opens Soon
            </button>
          ) : (
            <button
              disabled
              className="w-full py-3 sm:py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 font-bold rounded-xl cursor-not-allowed text-sm sm:text-base min-h-[44px]"
            >
              Competition Ended
            </button>
          )}
        </div>
      </div>
    );
  };

  const getCurrentCompetitions = () => {
    switch (activeTab) {
      case 'active':
        return activeCompetitions;
      case 'upcoming':
        return upcomingCompetitions;
      case 'past':
        return pastCompetitions;
      case 'my-competitions':
        return myCompetitions;
      default:
        return [];
    }
  };

  const getTabIcon = (tab: CompetitionTab) => {
    switch (tab) {
      case 'active':
        return <Zap className="h-4 w-4" />;
      case 'upcoming':
        return <Clock className="h-4 w-4" />;
      case 'past':
        return <Award className="h-4 w-4" />;
      case 'my-competitions':
        return <Target className="h-4 w-4" />;
    }
  };

  const getTabLabel = (tab: CompetitionTab) => {
    switch (tab) {
      case 'active':
        return 'Active';
      case 'upcoming':
        return 'Upcoming';
      case 'past':
        return 'Past';
      case 'my-competitions':
        return 'My Competitions';
    }
  };

  const getTabCount = (tab: CompetitionTab) => {
    switch (tab) {
      case 'active':
        return activeCompetitions.length;
      case 'upcoming':
        return upcomingCompetitions.length;
      case 'past':
        return pastCompetitions.length;
      case 'my-competitions':
        return myCompetitions.length;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-[80vh]">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 sm:p-3 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-xl">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-nigeria-600 dark:text-nigeria-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Competitions</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">Compete for cash prizes and test your knowledge</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 sm:mb-8">
        <div className="flex overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 pb-2">
          <div className="flex gap-2 min-w-max">
            {(['active', 'upcoming', 'past', 'my-competitions'] as CompetitionTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all whitespace-nowrap min-h-[44px] ${
                  activeTab === tab
                    ? 'bg-nigeria-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {getTabIcon(tab)}
                <span>{getTabLabel(tab)}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === tab
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400'
                }`}>
                  {getTabCount(tab)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Competitions Grid */}
      <div>
        {getCurrentCompetitions().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {getCurrentCompetitions().map(competition => renderCompetitionCard(competition))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
              No {getTabLabel(activeTab).toLowerCase()} competitions
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">
              {activeTab === 'my-competitions' 
                ? "You haven't registered for any competitions yet."
                : `There are no ${getTabLabel(activeTab).toLowerCase()} competitions at the moment.`}
            </p>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedCompetition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className={`bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 relative w-full max-w-md sm:max-w-lg ${
            paymentStep === 'overview' || paymentStep === 'subjects' ? 'max-h-[90vh] overflow-y-auto' : ''
          }`}>
            {/* Progress Indicator */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 sm:px-6 py-4 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {paymentStep === 'overview' && 'Enter Competition'}
                  {paymentStep === 'subjects' && 'Select Subjects'}
                  {paymentStep === 'payment' && 'Payment Details'}
                  {paymentStep === 'confirm' && 'Confirm Payment'}
                  {paymentStep === 'success' && 'Success!'}
                </h2>
                {paymentStep !== 'success' && (
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setPaymentStep('overview');
                      setPaymentDetails({ cardNumber: '', expiryDate: '', cvv: '', cardName: '' });
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                )}
              </div>
              {paymentStep !== 'success' && (
                <div className="flex items-center gap-2">
                  {['overview', 'subjects', 'payment', 'confirm'].map((step, index) => {
                    const stepIndex = ['overview', 'subjects', 'payment', 'confirm'].indexOf(paymentStep);
                    const isActive = step === paymentStep;
                    const isCompleted = index < stepIndex;
                    return (
                      <React.Fragment key={step}>
                        <div className={`flex-1 h-1.5 rounded-full transition-all ${
                          isActive || isCompleted
                            ? 'bg-nigeria-600'
                            : 'bg-gray-200 dark:bg-slate-700'
                        }`} />
                        {index < 3 && (
                          <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                            isCompleted
                              ? 'bg-nigeria-600'
                              : 'bg-gray-200 dark:bg-slate-700'
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6 sm:p-8">
              {/* Step 1: Overview */}
              {paymentStep === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-nigeria-50 to-nigeria-100 dark:from-nigeria-900/20 dark:to-nigeria-900/40 rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {selectedCompetition.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Prize Pool</p>
                        <p className="text-xl sm:text-2xl font-bold text-nigeria-600 dark:text-nigeria-400">
                          ₦{selectedCompetition.prizePool.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Entry Fee</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                          ₦{selectedCompetition.entryFee.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                      <Users className="h-4 w-4" />
                      <span>{selectedCompetition.participants.toLocaleString()} participants</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">What to expect:</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Select 4 subjects (English is compulsory)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Pay entry fee of ₦{selectedCompetition.entryFee.toLocaleString()}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Compete and win cash prizes</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setPaymentStep('subjects')}
                    className="w-full py-3.5 sm:py-4 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all flex items-center justify-center gap-2 text-base min-h-[48px]"
                  >
                    Continue
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Step 2: Subject Selection */}
              {paymentStep === 'subjects' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        Select Your Subjects
                      </h3>
                      <div className="px-3 py-1 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-full">
                        <span className="text-sm font-bold text-nigeria-700 dark:text-nigeria-400">
                          {selectedSubjects.length}/4
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                      English Language is compulsory. Select 3 additional subjects.
                    </p>
                    <div className="space-y-2">
                      {JAMB_SUBJECTS.map(subject => {
                        const isSelected = selectedSubjects.includes(subject);
                        const isEnglish = subject === 'English Language';
                        return (
                          <button
                            key={subject}
                            onClick={() => !isEnglish && handleSubjectToggle(subject)}
                            disabled={isEnglish}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all min-h-[52px] ${
                              isSelected
                                ? 'border-nigeria-600 bg-nigeria-50 dark:bg-nigeria-900/20 text-nigeria-700 dark:text-nigeria-400'
                                : 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-nigeria-400'
                            } ${isEnglish ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm sm:text-base">{subject}</span>
                              {isEnglish && (
                                <span className="text-xs text-gray-500 dark:text-slate-500">Required</span>
                              )}
                              {isSelected && !isEnglish && (
                                <CheckCircle className="h-5 w-5 text-nigeria-600 dark:text-nigeria-400" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPaymentStep('overview')}
                      className="flex-1 py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-all min-h-[48px]"
                    >
                      <ArrowLeft className="h-5 w-5 inline mr-2" />
                      Back
                    </button>
                    <button
                      onClick={() => setPaymentStep('payment')}
                      disabled={selectedSubjects.length !== 4}
                      className="flex-1 py-3.5 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                    >
                      Continue
                      <ArrowRight className="h-5 w-5 inline ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Details */}
              {paymentStep === 'payment' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Payment Details
                    </h3>
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
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-base min-h-[48px] focus:outline-none focus:ring-2 focus:ring-nigeria-500"
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
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-base min-h-[48px] focus:outline-none focus:ring-2 focus:ring-nigeria-500"
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
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-base min-h-[48px] focus:outline-none focus:ring-2 focus:ring-nigeria-500"
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
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-base min-h-[48px] focus:outline-none focus:ring-2 focus:ring-nigeria-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-slate-400 font-medium">Entry Fee</span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ₦{selectedCompetition.entryFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPaymentStep('subjects')}
                      className="flex-1 py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-all min-h-[48px]"
                    >
                      <ArrowLeft className="h-5 w-5 inline mr-2" />
                      Back
                    </button>
                    <button
                      onClick={() => setPaymentStep('confirm')}
                      disabled={!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.cardName}
                      className="flex-1 py-3.5 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                    >
                      Continue
                      <ArrowRight className="h-5 w-5 inline ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {paymentStep === 'confirm' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Confirm Payment
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      You are about to pay ₦{selectedCompetition.entryFee.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-2">Selected Subjects:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubjects.map(subject => (
                          <span 
                            key={subject} 
                            className="px-3 py-1.5 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg text-sm font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-slate-400">Entry Fee</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ₦{selectedCompetition.entryFee.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPaymentStep('payment')}
                      className="flex-1 py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-all min-h-[48px]"
                    >
                      <ArrowLeft className="h-5 w-5 inline mr-2" />
                      Back
                    </button>
                    <button
                      onClick={handlePaymentSubmit}
                      className="flex-1 py-3.5 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all min-h-[48px]"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Success */}
              {paymentStep === 'success' && (
                <div className="text-center py-4">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Payment Successful!
                  </h2>
                  <p className="text-gray-600 dark:text-slate-400 mb-8">
                    You have successfully entered the competition. Good luck!
                  </p>
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setPaymentStep('overview');
                      setPaymentDetails({ cardNumber: '', expiryDate: '', cvv: '', cardName: '' });
                      setActiveTab('my-competitions');
                    }}
                    className="w-full py-3.5 sm:py-4 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all min-h-[48px]"
                  >
                    View My Competitions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
