import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  FileText, 
  User, 
  Car,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Clock,
  Shield
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

interface Document {
  id: string;
  type: 'cni' | 'license' | 'carRegistration' | 'insurance';
  user: {
    name: string;
    id: string;
    type: 'driver' | 'client';
    phone: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  fileUrl: string;
  expiryDate?: string;
}

export default function DocumentsValidation() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      type: 'cni',
      user: {
        name: 'Jean Koffi',
        id: 'driver_456',
        type: 'driver',
        phone: '+237 677 123 456'
      },
      status: 'pending',
      submittedAt: '2025-01-14 10:30',
      fileUrl: 'cni_jean_koffi.jpg',
      expiryDate: '2030-05-15'
    },
    {
      id: '2',
      type: 'license',
      user: {
        name: 'Jean Koffi',
        id: 'driver_456',
        type: 'driver',
        phone: '+237 677 123 456'
      },
      status: 'pending',
      submittedAt: '2025-01-14 10:32',
      fileUrl: 'license_jean_koffi.jpg',
      expiryDate: '2027-08-20'
    },
    {
      id: '3',
      type: 'carRegistration',
      user: {
        name: 'Marie Ngozi',
        id: 'driver_789',
        type: 'driver',
        phone: '+237 690 987 654'
      },
      status: 'approved',
      submittedAt: '2025-01-13 14:15',
      reviewedAt: '2025-01-13 16:20',
      reviewedBy: 'Admin',
      fileUrl: 'carte_grise_marie.jpg'
    },
    {
      id: '4',
      type: 'insurance',
      user: {
        name: 'Paul Biya',
        id: 'driver_321',
        type: 'driver',
        phone: '+237 655 111 222'
      },
      status: 'rejected',
      submittedAt: '2025-01-12 09:45',
      reviewedAt: '2025-01-12 11:30',
      reviewedBy: 'Admin',
      rejectionReason: 'Document expiré depuis 6 mois',
      fileUrl: 'assurance_paul.jpg',
      expiryDate: '2024-07-15'
    }
  ]);

  const filteredDocuments = documents.filter(doc => {
    if (selectedFilter === 'all') return true;
    return doc.status === selectedFilter;
  });

  const getDocumentTypeText = (type: string) => {
    switch (type) {
      case 'cni': return 'Carte Nationale d\'Identité';
      case 'license': return 'Permis de conduire';
      case 'carRegistration': return 'Carte grise';
      case 'insurance': return 'Assurance véhicule';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  const isDocumentExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const handleDocumentAction = (documentId: string, action: 'approve' | 'reject') => {
    const document = documents.find(d => d.id === documentId);
    if (!document) return;

    if (action === 'reject') {
      Alert.prompt(
        'Rejeter le document',
        'Veuillez indiquer la raison du rejet :',
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Rejeter',
            style: 'destructive',
            onPress: (reason) => {
              if (reason) {
                setDocuments(prevDocs =>
                  prevDocs.map(d =>
                    d.id === documentId
                      ? {
                          ...d,
                          status: 'rejected' as const,
                          reviewedAt: new Date().toLocaleString('fr-FR'),
                          reviewedBy: 'Admin',
                          rejectionReason: reason
                        }
                      : d
                  )
                );
                Alert.alert('Document rejeté', `Le document de ${document.user.name} a été rejeté.`);
              }
            }
          }
        ],
        'plain-text',
        '',
        'default'
      );
    } else {
      Alert.alert(
        'Approuver le document',
        `Voulez-vous approuver ce ${getDocumentTypeText(document.type).toLowerCase()} de ${document.user.name} ?`,
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Approuver',
            onPress: () => {
              setDocuments(prevDocs =>
                prevDocs.map(d =>
                  d.id === documentId
                    ? {
                        ...d,
                        status: 'approved' as const,
                        reviewedAt: new Date().toLocaleString('fr-FR'),
                        reviewedBy: 'Admin'
                      }
                    : d
                )
              );
              Alert.alert('Document approuvé', `Le document de ${document.user.name} a été approuvé.`);
            }
          }
        ]
      );
    }
  };

  const viewDocument = (document: Document) => {
    Alert.alert(
      'Visualiser le document',
      `${getDocumentTypeText(document.type)}\n\nUtilisateur: ${document.user.name}\nFichier: ${document.fileUrl}\n${document.expiryDate ? `Expire le: ${document.expiryDate}` : ''}`,
      [
        { text: 'Fermer' },
        { text: 'Télécharger', onPress: () => Alert.alert('Téléchargement', 'Document téléchargé') }
      ]
    );
  };

  const contactUser = (user: Document['user']) => {
    Alert.alert(
      'Contacter l\'utilisateur',
      `Comment souhaitez-vous contacter ${user.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => Alert.alert('Appel', `Appel vers ${user.phone}`) },
        { text: 'Message', onPress: () => Alert.alert('Message', `Envoi d'un message à ${user.name}`) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/admin/dashboard')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <FileText size={32} color="#FFFFFF" />
            <View>
              <Text style={styles.headerTitle}>Documents</Text>
              <Text style={styles.headerSubtitle}>Validation des documents</Text>
            </View>
          </View>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{documents.filter(d => d.status === 'pending').length}</Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{documents.filter(d => d.status === 'approved').length}</Text>
            <Text style={styles.statLabel}>Approuvés</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{documents.filter(d => isDocumentExpired(d.expiryDate)).length}</Text>
            <Text style={styles.statLabel}>Expirés</Text>
          </View>
        </View>

        {/* Filtres */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.filterChip, selectedFilter === 'all' && styles.activeFilter]}
              onPress={() => setSelectedFilter('all')}>
              <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>
                Tous ({documents.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, selectedFilter === 'pending' && styles.activeFilter]}
              onPress={() => setSelectedFilter('pending')}>
              <Text style={[styles.filterText, selectedFilter === 'pending' && styles.activeFilterText]}>
                En attente ({documents.filter(d => d.status === 'pending').length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, selectedFilter === 'approved' && styles.activeFilter]}
              onPress={() => setSelectedFilter('approved')}>
              <Text style={[styles.filterText, selectedFilter === 'approved' && styles.activeFilterText]}>
                Approuvés ({documents.filter(d => d.status === 'approved').length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, selectedFilter === 'rejected' && styles.activeFilter]}
              onPress={() => setSelectedFilter('rejected')}>
              <Text style={[styles.filterText, selectedFilter === 'rejected' && styles.activeFilterText]}>
                Rejetés ({documents.filter(d => d.status === 'rejected').length})
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredDocuments.length === 0 ? (
          <View style={styles.emptyState}>
            <FileText size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Aucun document</Text>
            <Text style={styles.emptyDescription}>
              {selectedFilter === 'all' 
                ? 'Aucun document soumis pour le moment.'
                : `Aucun document ${getStatusText(selectedFilter).toLowerCase()}.`}
            </Text>
          </View>
        ) : (
          filteredDocuments.map((document) => (
            <View key={document.id} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <View style={styles.documentInfo}>
                  <View style={styles.documentTitleRow}>
                    <Text style={styles.documentTitle}>
                      {getDocumentTypeText(document.type)}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(document.status)}20` }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(document.status) }]}>
                        {getStatusText(document.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.userInfo}>
                    <User size={16} color="#6B7280" />
                    <Text style={styles.userName}>{document.user.name}</Text>
                    <View style={styles.userTypeBadge}>
                      <Text style={styles.userTypeText}>
                        {document.user.type === 'driver' ? 'Conducteur' : 'Client'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.documentMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.metaText}>Soumis le {document.submittedAt}</Text>
                    </View>
                    {document.expiryDate && (
                      <View style={styles.metaItem}>
                        <Shield size={14} color={isDocumentExpired(document.expiryDate) ? "#EF4444" : "#6B7280"} />
                        <Text style={[
                          styles.metaText,
                          isDocumentExpired(document.expiryDate) && styles.expiredText
                        ]}>
                          Expire le {document.expiryDate}
                          {isDocumentExpired(document.expiryDate) && ' (EXPIRÉ)'}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {document.status === 'rejected' && document.rejectionReason && (
                <View style={styles.rejectionContainer}>
                  <Text style={styles.rejectionLabel}>Raison du rejet :</Text>
                  <Text style={styles.rejectionText}>{document.rejectionReason}</Text>
                </View>
              )}

              {document.reviewedAt && (
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewText}>
                    {document.status === 'approved' ? 'Approuvé' : 'Rejeté'} le {document.reviewedAt} par {document.reviewedBy}
                  </Text>
                </View>
              )}

              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => viewDocument(document)}>
                  <Eye size={16} color="#1E3A8A" />
                  <Text style={styles.viewButtonText}>Voir</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.downloadButton}
                  onPress={() => Alert.alert('Téléchargement', 'Document téléchargé')}>
                  <Download size={16} color="#059669" />
                  <Text style={styles.downloadButtonText}>Télécharger</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => contactUser(document.user)}>
                  <User size={16} color="#7C3AED" />
                  <Text style={styles.contactButtonText}>Contacter</Text>
                </TouchableOpacity>

                {document.status === 'pending' && (
                  <>
                    <TouchableOpacity 
                      style={styles.approveButton}
                      onPress={() => handleDocumentAction(document.id, 'approve')}>
                      <CheckCircle size={16} color="#FFFFFF" />
                      <Text style={styles.approveButtonText}>Approuver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.rejectButton}
                      onPress={() => handleDocumentAction(document.id, 'reject')}>
                      <XCircle size={16} color="#FFFFFF" />
                      <Text style={styles.rejectButtonText}>Rejeter</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#E0E7FF',
    textAlign: 'center',
  },
  filtersContainer: {
    marginTop: 8,
  },
  filterChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    fontSize: 12,
    color: '#E0E7FF',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#1E3A8A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  documentHeader: {
    marginBottom: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  userTypeBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  userTypeText: {
    fontSize: 10,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  documentMeta: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  expiredText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  rejectionContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  rejectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 4,
  },
  rejectionText: {
    fontSize: 14,
    color: '#DC2626',
    lineHeight: 20,
  },
  reviewInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  reviewText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 8,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#059669',
    borderRadius: 8,
    gap: 6,
  },
  downloadButtonText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 8,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#10B981',
    borderRadius: 8,
    gap: 6,
  },
  approveButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    gap: 6,
  },
  rejectButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});