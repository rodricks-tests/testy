'use client';
import { useState, useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

type NotificationType = 'AUCTIONSTART' | 'AUCTIONEND' | 'AUCTIONCANCELLED' | 'PLACEBID' | 'WINBID' | 'NEWBID' | 'SYSTEM' | 'USER';

interface NotificationDisplay {
  id: string;
  type: NotificationType;
  userId: string;
  timestamp: number;
  isSeen: boolean;
  link: string;
  message: string | null;
  title: string;
  time: string;
  userInitials: string;
  userColor: string;
  details?: string;
  category?: string;
  comment?: string;
}

export default function NotificationPage() {
 
  const { 
    notifications: contextNotifications, 
    unreadCount, 
    isLoading,
    markAllAsSeen: contextMarkAllAsSeen, 
    markAsSeen: contextMarkAsSeen,
    fetchNotifications,
    loadMoreNotifications 
  } = useNotifications();

  const [displayNotifications, setDisplayNotifications] = useState<NotificationDisplay[]>([]);
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<NotificationType[]>([]);

  const notificationTypeGroups = {
    'Auction': ['AUCTIONSTART', 'AUCTIONEND', 'AUCTIONCANCELLED'] as NotificationType[],
    'Bid': ['PLACEBID', 'WINBID', 'NEWBID'] as NotificationType[],
    'Other': ['SYSTEM', 'USER'] as NotificationType[]
  };

  const formatTimestamp = (timestamp: number | string | undefined): string => {
    
    if (!timestamp) {
      return 'Just now';
    }
    
  
    let timeValue = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
    
    
    if (isNaN(timeValue) || timeValue <= 0) {
      return 'Just now';
    }

    if (timeValue < 1000000000000) {
      timeValue = timeValue * 1000;
    }
    
    
    const now = Date.now();
    const minValidTime = new Date('2020-01-01').getTime(); 
    const maxValidTime = now + (24 * 60 * 60 * 1000); 
    
    if (timeValue < minValidTime || timeValue > maxValidTime) {
      return 'Recently';
    }
    
    const diff = now - timeValue;
    
   
    if (diff < 0) {
      return 'Just now';
    }
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 30) {
      return 'Just now';
    } else if (seconds < 60) {
      return `${seconds} sec ago`;
    } else if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 30) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

 
  const markAsSeen = async (id: string) => {
    
    const notification = displayNotifications.find(n => n.id === id);
    if (notification?.isSeen) return; // Don't process if already seen
    
    
    setDisplayNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? {...notification, isSeen: true} : notification
      )
    );
    
    // call the context function
    try {
      await contextMarkAsSeen(id);
    } catch (error) {
      // Revert local state if API call fails
      setDisplayNotifications(prev => 
        prev.map(notification => 
          notification.id === id ? {...notification, isSeen: false} : notification
        )
      );
    }
  };

  // mark all as seen function
  const handleMarkAllAsSeen = async () => {
    await contextMarkAllAsSeen();
    // Update display notifications to reflect the change immediately
    setDisplayNotifications(prev => 
      prev.map(notification => ({...notification, isSeen: true}))
    );
  };

  const toggleCategoryFilter = (category: keyof typeof notificationTypeGroups) => {
    const categoryTypes = notificationTypeGroups[category];
    
    const allSelected = categoryTypes.every(type => selectedTypes.includes(type));
    
    if (allSelected) {
      setSelectedTypes(prev => prev.filter(type => !categoryTypes.includes(type)));
    } else {
      setSelectedTypes(prev => [...prev, ...categoryTypes.filter(type => !prev.includes(type))]);
    }
  };

  const isCategorySelected = (category: keyof typeof notificationTypeGroups) => {
    return notificationTypeGroups[category].every(type => selectedTypes.includes(type));
  };

  const filteredNotifications = showOnlyUnread 
    ? displayNotifications.filter(notification => !notification.isSeen && (selectedTypes.length === 0 || selectedTypes.includes(notification.type)))
    : displayNotifications.filter(notification => selectedTypes.length === 0 || selectedTypes.includes(notification.type));

 
  useEffect(() => {
    const transformNotifications = (notifications: any[]): NotificationDisplay[] => {
      return notifications.map(notification => {
        const getUserDisplayInfo = (type: NotificationType, userId: string) => {
          if (type === 'USER') {
            // You can enhance this with real user data from your API
            const userNames = {
              'user123': { name: 'Crystal Wu', initials: 'CW', color: 'from-blue-600 to-blue-700' },
              'user456': { name: 'Fran Perez', initials: 'FP', color: 'from-teal-600 to-teal-700' }
            };
            return userNames[userId as keyof typeof userNames] || { name: 'Unknown User', initials: 'U', color: 'from-slate-600 to-slate-700' };
          }
          return { name: 'System', initials: 'S', color: getSystemColorForType(type) };
        };

        const getSystemColorForType = (type: NotificationType): string => {
          switch(type) {
            case 'AUCTIONSTART': return 'from-violet-600 to-violet-700';
            case 'AUCTIONEND': return 'from-indigo-600 to-indigo-700';
            case 'AUCTIONCANCELLED': return 'from-red-600 to-red-700';
            case 'PLACEBID': return 'from-teal-600 to-teal-700';
            case 'WINBID': return 'from-emerald-600 to-emerald-700';
            case 'NEWBID': return 'from-amber-600 to-amber-700';
            case 'SYSTEM': return 'from-slate-600 to-slate-700';
            default: return 'from-gray-600 to-gray-700';
          }
        };

        const getDetailsForType = (type: NotificationType, message: string | null): string | undefined => {
          switch(type) {
            case 'AUCTIONSTART': return 'Bidding is now open';
            case 'WINBID': return 'Congratulations on your win!';
            case 'NEWBID': return 'Someone placed a new bid';
            case 'AUCTIONEND': return 'Auction has concluded';
            case 'AUCTIONCANCELLED': return 'Auction was cancelled';
            case 'PLACEBID': return 'New bid activity';
            case 'SYSTEM': return 'System notification';
            default: return undefined;
          }
        };

        const getCategoryForType = (type: NotificationType, link: string): string => {
          if (link?.includes('/auction/')) {
            const auctionId = link.split('/auction/')[1];
            return `Auction #${auctionId}`;
          }
          if (link?.includes('/bid/')) {
            const bidId = link.split('/bid/')[1];
            return `Bid #${bidId}`;
          }
          if (type === 'SYSTEM') return 'System Notice';
          return 'General';
        };

        const userInfo = getUserDisplayInfo(notification.type, notification.userId || 'system');

        return {
          id: notification.id,
          type: notification.type,
          userId: notification.userId || 'system',
          timestamp: notification.timestamp || notification.createdAt || Date.now(),
          isSeen: Boolean(notification.isSeen), // Ensure boolean value
          link: notification.link || '',
          message: notification.message,
          title: userInfo.name,
          time: formatTimestamp(notification.timestamp || notification.createdAt || Date.now()),
          userInitials: userInfo.initials,
          userColor: userInfo.color,
          details: getDetailsForType(notification.type, notification.message),
          category: getCategoryForType(notification.type, notification.link || ''),
          comment: notification.type === 'USER' ? 'User interaction' : undefined
        };
      });
    };

   
    if (contextNotifications.length >= 0) {
      const transformed = transformNotifications(contextNotifications);
      setDisplayNotifications(transformed);
    }
  }, [contextNotifications]);

  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getNotificationIcon = (type: NotificationType) => {
    switch(type) {
      case 'AUCTIONSTART':
        return '🚀';
      case 'AUCTIONEND':
        return '🏁';
      case 'AUCTIONCANCELLED':
        return '⛔';
      case 'PLACEBID':
        return '💎';
      case 'WINBID':
        return '🏆';
      case 'NEWBID':
        return '🔔';
      case 'SYSTEM':
        return '⚙️';
      case 'USER':
        return '👤';
      default:
        return '📋';
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex space-x-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-gray-600 mt-2">Stay updated with your auction activity</p>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {unreadCount} unseen
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  Filter Notifications
                </h3>
                
                {/* Auction Category */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="auction"
                      checked={isCategorySelected('Auction')}
                      onChange={() => toggleCategoryFilter('Auction')}
                      className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all"
                      title="Filter auction notifications"
                    />
                    <label htmlFor="auction" className="ml-3 text-base font-semibold text-gray-900 cursor-pointer select-none">
                      Auction Events
                    </label>
                  </div>
                  <div className="text-sm text-gray-600 ml-8 leading-relaxed">
                    Track auction starts, endings, and cancellations
                  </div>
                </div>
                
                {/* Bid Category */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="bid"
                      checked={isCategorySelected('Bid')}
                      onChange={() => toggleCategoryFilter('Bid')}
                      className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500 focus:ring-2 cursor-pointer transition-all"
                      title="Filter bid notifications"
                    />
                    <label htmlFor="bid" className="ml-3 text-base font-semibold text-gray-900 cursor-pointer select-none">
                      Bid Activity
                    </label>
                  </div>
                  <div className="text-sm text-gray-600 ml-8 leading-relaxed">
                    Monitor bids, wins, and new bidding activity
                  </div>
                </div>
                
                {/* Other Types */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    Other Types
                  </h4>
                  <div className="space-y-3 ml-2">
                    {notificationTypeGroups['Other'].map((type) => (
                      <div key={type} className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onChange={() => {
                            if (selectedTypes.includes(type)) {
                              setSelectedTypes(prev => prev.filter(t => t !== type));
                            } else {
                              setSelectedTypes(prev => [...prev, type]);
                            }
                          }}
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                          title={`Filter ${type.toLowerCase()} notifications`}
                        />
                        <label htmlFor={type} className="ml-3 text-sm text-gray-700 cursor-pointer select-none capitalize">
                          {type.toLowerCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-bold text-gray-900">Activity Feed</h3>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 text-sm font-medium">Show unseen only</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          id="unseen-toggle"
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={showOnlyUnread}
                          onChange={() => setShowOnlyUnread(!showOnlyUnread)}
                          aria-label="Toggle to show only unseen notifications"
                        />
                        <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-500 after:shadow-sm"></div>
                      </label>
                    </div>
                    <button 
                      onClick={handleMarkAllAsSeen}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl border border-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                      aria-label="Mark all notifications as seen"
                    >
                      Mark all as seen
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Notifications List */}
              <div className="divide-y divide-gray-100">
                {/* Today Section */}
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                      <h4 className="text-lg font-bold text-gray-800">TODAY</h4>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-4"></div>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredNotifications
                      .filter(notification => {
                        const time = notification.time.toLowerCase();
                        return time.includes('just now') || 
                               time.includes('sec ago') || 
                               time.includes('min ago') || 
                               time.includes('hour ago');
                      })
                      .map((notification, index) => (
                      <div 
                        key={`today-${notification.id}`}
                        className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
                          notification.isSeen 
                            ? 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-300'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!notification.isSeen) {
                            markAsSeen(notification.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        style={{ animationDelay: `${index * 100}ms` }}
                        aria-label={`Notification from ${notification.title}: ${notification.message}. ${notification.isSeen ? 'Seen' : 'Unseen'}. Click to mark as seen.`}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!notification.isSeen) {
                              markAsSeen(notification.id);
                            }
                          }
                        }}
                      >
                        {!notification.isSeen && (
                          <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        )}
                        
                        <div className="flex items-start space-x-4">
                          <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-r ${notification.userColor} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200`}>
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-700 transition-colors">
                                {notification.title}
                              </h5>
                              <span className="text-gray-500 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                                {notification.time}
                              </span>
                            </div>
                            
                            <p className="text-gray-700 text-base mb-3 leading-relaxed">
                              {notification.message}
                            </p>
                            
                            {notification.details && (
                              <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-3 rounded-lg mb-3 border border-gray-200">
                                <p className="text-gray-900 font-semibold text-sm">{notification.details}</p>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              {notification.category && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300">
                                  {notification.category}
                                </span>
                              )}
                            </div>
                            
                            {notification.comment && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                <p className="text-gray-700 italic text-sm">"{notification.comment}"</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Yesterday Section */}
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
                      <h4 className="text-lg font-bold text-gray-700">YESTERDAY</h4>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-4"></div>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredNotifications
                      .filter(notification => {
                        const time = notification.time.toLowerCase();
                        return !(time.includes('just now') || 
                               time.includes('sec ago') || 
                               time.includes('min ago') || 
                               time.includes('hour ago'));
                      })
                      .map((notification, index) => (
                      <div 
                        key={`yesterday-${notification.id}`}
                        className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
                          notification.isSeen 
                            ? 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-300'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!notification.isSeen) {
                            markAsSeen(notification.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        style={{ animationDelay: `${index * 100}ms` }}
                        aria-label={`Notification from ${notification.title}: ${notification.message}. ${notification.isSeen ? 'Seen' : 'Unseen'}. Click to mark as seen.`}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!notification.isSeen) {
                              markAsSeen(notification.id);
                            }
                          }
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-r ${notification.userColor} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200`}>
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-700 transition-colors">
                                {notification.title}
                              </h5>
                              <span className="text-gray-500 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                                {notification.time}
                              </span>
                            </div>
                            
                            <p className="text-gray-700 text-base mb-3 leading-relaxed">
                              {notification.message}
                            </p>
                            
                            {notification.details && (
                              <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-3 rounded-lg mb-3 border border-gray-200">
                                <p className="text-gray-900 font-semibold text-sm">{notification.details}</p>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              {notification.category && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300">
                                  {notification.category}
                                </span>
                              )}
                            </div>
                            
                            {notification.comment && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                <p className="text-gray-700 italic text-sm">"{notification.comment}"</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Load More Section */}
                {contextNotifications.length > 0 && (
                  <div className="p-6 text-center">
                    <button
                      onClick={loadMoreNotifications}
                      className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-gray-500/25 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                      aria-label="Load more notifications"
                    >
                      Load More Notifications
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}