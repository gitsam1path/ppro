import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MessageCircle, 
  Search, 
  Plus, 
  Send, 
  Phone, 
  Video,
  MoreVertical,
  Users,
  Clock,
  CheckCheck,
  ArrowLeft
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'location';
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  online: boolean;
  type: 'individual' | 'group';
  participants?: string[];
}

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState<'conversations' | 'chat'>('conversations');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Jean Koffi',
      lastMessage: 'Merci pour le trajet, à bientôt !',
      timestamp: '14:30',
      unreadCount: 0,
      avatar: 'JK',
      online: true,
      type: 'individual'
    },
    {
      id: '2',
      name: 'Marie Ngozi',
      lastMessage: 'Je serai là dans 5 minutes',
      timestamp: '13:45',
      unreadCount: 2,
      avatar: 'MN',
      online: true,
      type: 'individual'
    },
    {
      id: '3',
      name: 'Groupe Yaoundé-Douala',
      lastMessage: 'Paul: Quelqu\'un pour demain matin ?',
      timestamp: '12:20',
      unreadCount: 5,
      avatar: 'YD',
      online: false,
      type: 'group',
      participants: ['Paul Biya', 'Alice Mbarga', 'David Nkomo']
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Marie Ngozi',
      content: 'Salut ! Tu es disponible pour un trajet demain ?',
      timestamp: '13:40',
      read: true,
      type: 'text'
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'Moi',
      content: 'Oui, à quelle heure ?',
      timestamp: '13:42',
      read: true,
      type: 'text'
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Marie Ngozi',
      content: 'Vers 8h du matin, direction Douala',
      timestamp: '13:43',
      read: true,
      type: 'text'
    },
    {
      id: '4',
      senderId: '2',
      senderName: 'Marie Ngozi',
      content: 'Je serai là dans 5 minutes',
      timestamp: '13:45',
      read: false,
      type: 'text'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Logique d'envoi de message
      setNewMessage('');
    }
  };

  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => {
        setSelectedConversation(item.id);
        setActiveTab('chat');
      }}>
      <View style={styles.conversationLeft}>
        <View style={[styles.avatar, item.online && styles.onlineAvatar]}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
          {item.online && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.conversationInfo}>
          <View style={styles.conversationHeader}>
            <Text style={styles.conversationName}>{item.name}</Text>
            <Text style={styles.conversationTime}>{item.timestamp}</Text>
          </View>
          <View style={styles.conversationFooter}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage}
            </Text>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {item.type === 'group' && (
        <Users size={16} color="#6B7280" />
      )}
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageItem,
      item.senderId === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.senderId === 'me' ? styles.myMessageBubble : styles.otherMessageBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.senderId === 'me' ? styles.myMessageText : styles.otherMessageText
        ]}>
          {item.content}
        </Text>
        <View style={styles.messageFooter}>
          <Text style={[
            styles.messageTime,
            item.senderId === 'me' ? styles.myMessageTime : styles.otherMessageTime
          ]}>
            {item.timestamp}
          </Text>
          {item.senderId === 'me' && (
            <CheckCheck size={14} color={item.read ? "#059669" : "#9CA3AF"} />
          )}
        </View>
      </View>
    </View>
  );

  if (activeTab === 'chat' && selectedConversation) {
    const conversation = conversations.find(c => c.id === selectedConversation);
    
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        
        <LinearGradient
          colors={['#1E3A8A', '#3B82F6']}
          style={styles.chatHeader}>
          <View style={styles.chatHeaderContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => {
                setActiveTab('conversations');
                setSelectedConversation(null);
              }}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            
            <View style={styles.chatHeaderInfo}>
              <View style={[styles.smallAvatar, conversation?.online && styles.onlineAvatar]}>
                <Text style={styles.smallAvatarText}>{conversation?.avatar}</Text>
                {conversation?.online && <View style={styles.smallOnlineIndicator} />}
              </View>
              <View>
                <Text style={styles.chatHeaderName}>{conversation?.name}</Text>
                <Text style={styles.chatHeaderStatus}>
                  {conversation?.online ? 'En ligne' : 'Hors ligne'}
                </Text>
              </View>
            </View>
            
            <View style={styles.chatHeaderActions}>
              <TouchableOpacity style={styles.chatHeaderAction}>
                <Phone size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatHeaderAction}>
                <Video size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatHeaderAction}>
                <MoreVertical size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
        />

        <View style={styles.messageInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Tapez votre message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}>
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.newMessageButton}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une conversation..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </LinearGradient>

      <FlatList
        data={filteredConversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        style={styles.conversationsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  newMessageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  conversationsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  conversationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  onlineAvatar: {
    borderWidth: 2,
    borderColor: '#059669',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#059669',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  conversationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#1E3A8A',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatHeader: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  chatHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  smallAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  smallOnlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#E0E7FF',
  },
  chatHeaderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  chatHeaderAction: {
    padding: 8,
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  messagesContent: {
    padding: 16,
  },
  messageItem: {
    marginBottom: 16,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
  },
  myMessageBubble: {
    backgroundColor: '#1E3A8A',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#1F2937',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  messageTime: {
    fontSize: 12,
  },
  myMessageTime: {
    color: '#E0E7FF',
  },
  otherMessageTime: {
    color: '#9CA3AF',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});