import React, { useState, useEffect } from 'react';
import { Users, UserPlus, CreditCard, CheckCircle, X, Copy, Mail, ArrowRight, Gift, Calendar } from 'lucide-react';
import { StudyGroup, StudyGroupMember } from '../types';
import { STUDY_GROUP_PRICE } from '../constants';

interface StudyGroupViewProps {
  isDarkMode?: boolean;
}

type Step = 'overview' | 'create' | 'invite' | 'payment' | 'success' | 'manage';

export const StudyGroupView: React.FC<StudyGroupViewProps> = ({ isDarkMode }) => {
  const [step, setStep] = useState<Step>('overview');
  const [userGroups, setUserGroups] = useState<StudyGroup[]>(() => {
    const stored = localStorage.getItem('eduprep_study_groups');
    return stored ? JSON.parse(stored) : [];
  });
  const [currentGroup, setCurrentGroup] = useState<StudyGroup | null>(null);
  const [groupName, setGroupName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [friend1Email, setFriend1Email] = useState('');
  const [friend2Email, setFriend2Email] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateGroup = () => {
    const code = generateInviteCode();
    const newGroup: StudyGroup = {
      id: `group-${Date.now()}`,
      name: groupName,
      creatorId: 'user-1',
      inviteCode: code,
      members: [
        {
          userId: 'user-1',
          userName: creatorName,
          email: creatorEmail,
          joinedAt: new Date(),
          status: 'accepted'
        }
      ],
      status: 'pending',
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      createdAt: new Date()
    };
    
    setCurrentGroup(newGroup);
    setInviteCode(code);
    setStep('invite');
  };

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinWithCode = () => {
    const group = userGroups.find(g => g.inviteCode === inviteCode.toUpperCase());
    if (group && group.members.length < 3) {
      const newMember: StudyGroupMember = {
        userId: `user-${Date.now()}`,
        userName: 'Friend',
        email: 'friend@example.com',
        joinedAt: new Date(),
        status: 'accepted'
      };
      
      const updated = userGroups.map(g => 
        g.id === group.id 
          ? { ...g, members: [...g.members, newMember] }
          : g
      );
      
      setUserGroups(updated);
      localStorage.setItem('eduprep_study_groups', JSON.stringify(updated));
      
      if (updated.find(g => g.id === group.id)?.members.length === 3) {
        const activated = updated.map(g => 
          g.id === group.id ? { ...g, status: 'active' as const } : g
        );
        setUserGroups(activated);
        localStorage.setItem('eduprep_study_groups', JSON.stringify(activated));
      }
      
      setStep('overview');
      setInviteCode('');
    }
  };

  const handlePayment = () => {
    // Mock payment
    setTimeout(() => {
      const updated = userGroups.map(g => 
        g.id === currentGroup!.id 
          ? { ...g, status: 'pending' as const }
          : g
      );
      setUserGroups(updated);
      localStorage.setItem('eduprep_study_groups', JSON.stringify(updated));
      setStep('success');
    }, 2000);
  };

  const activeGroup = userGroups.find(g => g.status === 'active');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Overview Step */}
      {step === 'overview' && (
        <div className="animate-in fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-2xl mb-6">
              <Users className="h-8 w-8 text-nigeria-600 dark:text-nigeria-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Study Group Plan</h1>
            <p className="text-gray-600 dark:text-slate-400">Study together with 2 friends and save on premium access</p>
          </div>

          <div className="bg-gradient-to-br from-nigeria-50 to-nigeria-100 dark:from-nigeria-900/20 dark:to-nigeria-900/40 rounded-2xl p-8 border-2 border-nigeria-200 dark:border-nigeria-800 mb-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-slate-900 rounded-full mb-4">
                <Gift className="h-10 w-10 text-nigeria-600 dark:text-nigeria-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">₦{STUDY_GROUP_PRICE.toLocaleString()}</h2>
              <p className="text-gray-600 dark:text-slate-400">For 3 friends (₦{Math.round(STUDY_GROUP_PRICE / 3).toLocaleString()} each)</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-slate-300">All premium features for 3 users</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-slate-300">Shared progress tracking</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-slate-300">Group study sessions</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-slate-300">30-day subscription</span>
              </div>
            </div>

            {activeGroup ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <h3 className="font-bold text-green-900 dark:text-green-200 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Active Study Group
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                  Group: {activeGroup.name} • {activeGroup.members.length}/3 members
                </p>
                <button
                  onClick={() => {
                    setCurrentGroup(activeGroup);
                    setStep('manage');
                  }}
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all"
                >
                  Manage Group
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('create')}
                  className="flex-1 py-4 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all flex items-center justify-center gap-2"
                >
                  Create Group <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setStep('invite')}
                  className="flex-1 py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  Join with Code <UserPlus className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Group Step */}
      {step === 'create' && (
        <div className="animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Study Group</h2>
              <button
                onClick={() => setStep('overview')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Study Squad 2024"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={creatorEmail}
                  onChange={(e) => setCreatorEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Note:</strong> After creating the group, you'll receive an invite code to share with 2 friends. 
                  The group will be activated once all 3 members join.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('overview')}
                  className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroup}
                  disabled={!groupName || !creatorName || !creatorEmail}
                  className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Friends Step */}
      {step === 'invite' && currentGroup && (
        <div className="animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Group Created!</h2>
              <p className="text-gray-600 dark:text-slate-400">Share the invite code with your friends</p>
            </div>

            <div className="bg-nigeria-50 dark:bg-nigeria-900/20 rounded-xl p-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Invite Code
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                  <p className="text-2xl font-bold text-center text-nigeria-600 dark:text-nigeria-400 tracking-widest">
                    {inviteCode}
                  </p>
                </div>
                <button
                  onClick={handleCopyInviteCode}
                  className="px-4 py-3 bg-nigeria-600 text-white rounded-xl hover:bg-nigeria-700 transition-all"
                >
                  {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 text-center">Copied to clipboard!</p>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Friend 1 Email (Optional - for notification)
                </label>
                <input
                  type="email"
                  value={friend1Email}
                  onChange={(e) => setFriend1Email(e.target.value)}
                  placeholder="friend1@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Friend 2 Email (Optional - for notification)
                </label>
                <input
                  type="email"
                  value={friend2Email}
                  onChange={(e) => setFriend2Email(e.target.value)}
                  placeholder="friend2@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-slate-400">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">₦{STUDY_GROUP_PRICE.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('overview')}
                className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
              >
                Skip Payment
              </button>
              <button
                onClick={() => setStep('payment')}
                className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Step */}
      {step === 'payment' && (
        <div className="animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-nigeria-600 dark:text-nigeria-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Complete Payment</h2>
              <p className="text-gray-600 dark:text-slate-400">₦{STUDY_GROUP_PRICE.toLocaleString()} for 3 users</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('invite')}
                className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
              >
                Pay ₦{STUDY_GROUP_PRICE.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Step */}
      {step === 'success' && (
        <div className="animate-in fade-in text-center">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
              Your study group is now active. Share the invite code with your friends!
            </p>
            <button
              onClick={() => {
                setStep('overview');
                if (currentGroup) {
                  const updated = [...userGroups, currentGroup];
                  setUserGroups(updated);
                  localStorage.setItem('eduprep_study_groups', JSON.stringify(updated));
                }
              }}
              className="w-full py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Join with Code */}
      {step === 'invite' && !currentGroup && (
        <div className="animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Join Study Group</h2>
              <button
                onClick={() => setStep('overview')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Enter Invite Code
                </label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-center text-2xl font-bold tracking-widest"
                />
              </div>

              <button
                onClick={handleJoinWithCode}
                disabled={!inviteCode}
                className="w-full py-4 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Group */}
      {step === 'manage' && currentGroup && (
        <div className="animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentGroup.name}</h2>
                <p className="text-gray-600 dark:text-slate-400 mt-1">
                  {currentGroup.members.length}/3 members
                </p>
              </div>
              <button
                onClick={() => setStep('overview')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {currentGroup.members.map((member, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{member.userName}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{member.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    member.status === 'accepted'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {member.status === 'accepted' ? 'Active' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-bold text-blue-900 dark:text-blue-200">Subscription</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Expires: {new Date(currentGroup.subscriptionEndDate).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-nigeria-50 dark:bg-nigeria-900/20 rounded-xl p-4">
              <p className="text-sm font-medium text-nigeria-700 dark:text-nigeria-300 mb-2">Invite Code</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                  <p className="text-xl font-bold text-center text-nigeria-600 dark:text-nigeria-400 tracking-widest">
                    {currentGroup.inviteCode}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentGroup.inviteCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2 bg-nigeria-600 text-white rounded-lg hover:bg-nigeria-700 transition-all"
                >
                  {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
