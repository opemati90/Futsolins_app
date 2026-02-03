import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Users, Plus, Hash, Smile, X } from 'lucide-react';
import { ChatRoom, ChatMessage } from '../types';
import { getMockChatRooms } from '../constants';

interface ChatroomViewProps {
  isDarkMode?: boolean;
}

export const ChatroomView: React.FC<ChatroomViewProps> = ({ isDarkMode }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>(() => {
    if (typeof window === 'undefined') return getMockChatRooms();
    try {
      const stored = localStorage.getItem('eduprep_chat_rooms');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((room: any) => ({
          ...room,
          createdAt: new Date(room.createdAt),
          messages: room.messages?.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })) || []
        }));
      }
    } catch (e) {
      console.error('Error loading chat rooms:', e);
    }
    return getMockChatRooms();
  });
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(rooms[0] || null);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomSubject, setNewRoomSubject] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('eduprep_chat_rooms', JSON.stringify(rooms));
    }
  }, [rooms]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedRoom?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: 'user-1',
      userName: 'You',
      content: newMessage,
      timestamp: new Date()
    };

    setRooms(prev => prev.map(room =>
      room.id === selectedRoom.id
        ? { ...room, messages: [...room.messages, message] }
        : room
    ));

    setSelectedRoom(prev => prev ? { ...prev, messages: [...prev.messages, message] } : null);
    setNewMessage('');
  };

  const handleCreateRoom = () => {
    const room: ChatRoom = {
      id: `room-${Date.now()}`,
      name: newRoomName,
      subject: newRoomSubject,
      members: ['user-1'],
      messages: [],
      createdAt: new Date()
    };

    setRooms([room, ...rooms]);
    setSelectedRoom(room);
    setNewRoomName('');
    setNewRoomSubject('');
    setShowCreateRoom(false);
  };

  const handleJoinRoom = (room: ChatRoom) => {
    if (!room.members.includes('user-1')) {
      setRooms(prev => prev.map(r =>
        r.id === room.id
          ? { ...r, members: [...r.members, 'user-1'] }
          : r
      ));
    }
    setSelectedRoom(room);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] max-h-[800px]">
      {/* Sidebar - Room List */}
      <div className="w-80 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Chat Rooms</h2>
            <button
              onClick={() => setShowCreateRoom(true)}
              className="p-2 bg-nigeria-600 text-white rounded-lg hover:bg-nigeria-700 transition-all"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => handleJoinRoom(room)}
              className={`w-full text-left p-4 border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${
                selectedRoom?.id === room.id ? 'bg-nigeria-50 dark:bg-nigeria-900/20 border-l-4 border-l-nigeria-600' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-nigeria-100 dark:bg-nigeria-900/30 rounded-lg">
                  <Hash className="h-4 w-4 text-nigeria-600 dark:text-nigeria-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{room.name}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{room.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-slate-400">{room.members.length} members</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-950">
        {selectedRoom ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{selectedRoom.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{selectedRoom.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-slate-400">{selectedRoom.members.length} online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedRoom.messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-slate-400">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                selectedRoom.messages.map((message, idx) => {
                  const isOwn = message.userId === 'user-1';
                  const showAvatar = idx === 0 || selectedRoom.messages[idx - 1].userId !== message.userId;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isOwn && showAvatar && (
                        <div className="w-8 h-8 rounded-full bg-nigeria-100 dark:bg-nigeria-900/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-nigeria-600 dark:text-nigeria-400">
                            {message.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className={`max-w-[70%] ${isOwn ? 'order-2' : ''}`}>
                        {!isOwn && showAvatar && (
                          <p className="text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">{message.userName}</p>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isOwn
                              ? 'bg-nigeria-600 text-white rounded-br-sm'
                              : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-bl-sm border border-gray-200 dark:border-slate-700'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 px-2">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {isOwn && showAvatar && (
                        <div className="w-8 h-8 rounded-full bg-nigeria-600 flex items-center justify-center flex-shrink-0 order-1">
                          <span className="text-xs font-bold text-white">Y</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <Smile className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nigeria-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-nigeria-600 text-white rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-slate-400">Select a chat room to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {showCreateRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Chat Room</h2>
              <button
                onClick={() => setShowCreateRoom(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="e.g., JAMB Study Group"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={newRoomSubject}
                  onChange={(e) => setNewRoomSubject(e.target.value)}
                  placeholder="e.g., Mathematics"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateRoom(false)}
                  className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRoom}
                  disabled={!newRoomName || !newRoomSubject}
                  className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
