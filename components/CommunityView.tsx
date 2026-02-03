import React, { useState } from 'react';
import { MessageSquare, MessageCircle } from 'lucide-react';
import { ForumView } from './ForumView';
import { ChatroomView } from './ChatroomView';

interface CommunityViewProps {
  isDarkMode?: boolean;
}

type Tab = 'forum' | 'chat';

export const CommunityView: React.FC<CommunityViewProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('forum');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Community</h1>
        <p className="text-gray-600 dark:text-slate-400">Connect with fellow students, share tips, and study together</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('forum')}
          className={`px-6 py-3 font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'forum'
              ? 'border-nigeria-600 text-nigeria-600 dark:text-nigeria-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          Forum
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-6 py-3 font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'chat'
              ? 'border-nigeria-600 text-nigeria-600 dark:text-nigeria-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          <MessageCircle className="h-5 w-5" />
          Chatrooms
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'forum' && <ForumView isDarkMode={isDarkMode} />}
        {activeTab === 'chat' && <ChatroomView isDarkMode={isDarkMode} />}
      </div>
    </div>
  );
};
