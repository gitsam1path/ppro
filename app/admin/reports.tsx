import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  AlertTriangle, 
  User, 
  Car,
  MessageSquare,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Flag
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

interface Report {
  id: string;
  type: 'user' | 'driver' | 'trip' | 'payment';
  title: string;
  description: string;
  reportedBy: {
    name: string;
    id: string;
  };
  reportedUser: {
    name: string;
    id: string;
    type: 'client' | 'driver';
  };
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  evidence?: string[];
}

export default function ReportsManagement() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'investigating' | 'resolved'>('all');
  
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      type: 'user',
      title: 'Comportement inapproprié',
      description: 'Le conducteur a eu un comportement déplacé pendant le trajet. Il a fait des commentaires inappropriés et a conduit de manière dangereuse.',
      reportedBy: {
        name: 'Marie Ngozi',
        id: 'user_123'
      },
      reportedUser: {
        name: 'Jean Koffi',
        id: 'driver_456',
        type: 'driver'
      },
      status: 'pending',
      priority: 'high',
      createdAt: '2025-01-14 16:30',
      evidence: ['photo1.jpg', 'audio_record.mp3']
    },
    {
      id: '2',
      type: 'payment',
      title: 'Problème de paiement',
      description: 'Le passager n\'a pas payé le montant convenu et a quitté le véhicule sans régler.',
      reportedBy: {
        name: 'Paul Biya',
        id: 'driver_789'
      },
      reportedUser: {
        name: 'Alice Mbarga',
        id: 'user_321',
        type: 'client'
      },
      status: 'investigating',
      priority: 'medium',
      createdAt: '2025-01-14 14:15'
    },
    {
      id: '3',
      type: 'trip',
      title: 'Annulation de dernière minute',
      description: 'Le conducteur a annulé le trajet 10 minutes avant le départ sans raison valable.',
      reportedBy: {
        name: 'David Nkomo',
        id: 'user_654'
      },
      reportedUser: {
        name: 'Marie Toto',
        id: 'driver_987',
        type: 'driver'
      },
      status: 'resolved',
      priority: 'low',
      createdAt: '2025-01-13 09:45'
    }
  ]);

  const filteredReports = reports.filter(report => {
    if (selectedFilter === 'all') return true;
    return report.status === selectedFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#DC2626';
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'investigating': return '#3B82F6';
      case 'resolved': return '#10B981';
      case 'dismissed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'investigating': return 'En cours';
      case 'resolved': return 'Résolu';
      case 'dismissed': return 'Rejeté';
      default: return status;
    }
  };

  const handleReportAction = (reportId: string, action: 'investigate' | 'resolve' | 'dismiss' | 'ban') => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    let title = '';
    let message = '';
    let newStatus: Report['status'] = report.status;

    switch (action) {
      case 'investigate':
        title = 'Commencer l\'enquête';
        message = `Voulez-vous commencer l'enquête sur ce signalement contre ${report.reportedUser.name} ?`;
        newStatus = 'investigating';
        break;
      case 'resolve':
        title = 'Marquer comme résolu';
        message = `Voulez-vous marquer ce signalement comme résolu ?`;
        newStatus = 'resolved';
        break;
      case 'dismiss':
        title = 'Rejeter le signalement';
        message = `Voulez-vous rejeter ce signalement ? Cette action indique que le signalement n'est pas fondé.`;
        newStatus = 'dismissed';
        break;
      case 'ban':
        title = 'Suspendre l\'utilisateur';
        message = `⚠️ ATTENTION ⚠️\n\nVoulez-vous suspendre ${report.reportedUser.name} ?\n\nCette action va :\n• Suspendre le compte utilisateur\n• Annuler tous ses trajets actifs\n• L'empêcher d'utiliser la plateforme`;
        break;
    }

    Alert.alert(
      title,
      message,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: action === 'ban' ? 'Suspendre' : 'Confirmer',
          style: action === 'ban' ? 'destructive' : 'default',
          onPress: () => {
            if (action === 'ban') {
              Alert.alert(
                'Utilisateur suspendu',
                `${report.reportedUser.name} a été suspendu de la plateforme.`
              );
            } else {
              setReports(prevReports =>
                prevReports.map(r =>
                  r.id === reportId ? { ...r, status: newStatus } : r
                )
              );
              Alert.alert('Action effectuée', 'Le signalement a été mis à jour.');
            }
          }
        }
      ]
    );
  };

  const viewReportDetails = (report: Report) => {
    Alert.alert(
      'Détails du signalement',
      `Type: ${report.type}\n\nSignalé par: ${report.reportedBy.name}\nContre: ${report.reportedUser.name}\n\nDescription:\n${report.description}\n\nDate: ${report.createdAt}`,
      [
        { text: 'Fermer' },
        { text: 'Contacter le signaleur', onPress: () => Alert.alert('Contact', `Contacter ${report.reportedBy.name}`) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#DC2626', '#EF4444']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/admin/dashboard')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <AlertTriangle size={32} color="#FFFFFF" />
            <View>
              <Text style={styles.headerTitle}>Signalements</Text>
              <Text style={styles.headerSubtitle}>Gestion des signalements</Text>
            </View>
          </View>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{reports.filter(r => r.status === 'pending').length}</Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{reports.filter(r => r.status === 'investigating').length}</Text>
            <Text style={styles.statLabel}>En cours</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{reports.filter(r => r.priority === 'high' || r.priority === 'critical').length}</Text>
            <Text style={styles.statLabel}>Priorité haute</Text>
          </View>
        </View>

        {/* Filtres */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.filterChip, selectedFilter === 'all' && styles.activeFilter]}
              onPress={() => setSelectedFilter('all')}>
              <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>
                Tous ({reports.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, selectedFilter === 'pending' && styles.activeFilter]}
              onPress={() => setSelectedFilter('pending')}>
              <Text style={[styles.filterText, selectedFilter === 'pending' && styles.activeFilterText]}>
                En attente ({reports.filter(r => r.status === 'pending').length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, selectedFilter === 'investigating' && styles.activeFilter]}
              onPress={() => setSelectedFilter('investigating')}>
              <Text style={[styles.filterText, selectedFilter === 'investigating' && styles.activeFilterText]}>
                En cours ({reports.filter(r => r.status === 'investigating').length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, selectedFilter === 'resolved' && styles.activeFilter]}
              onPress={() => setSelectedFilter('resolved')}>
              <Text style={[styles.filterText, selectedFilter === 'resolved' && styles.activeFilterText]}>
                Résolus ({reports.filter(r => r.status === 'resolved').length})
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredReports.length === 0 ? (
          <View style={styles.emptyState}>
            <AlertTriangle size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Aucun signalement</Text>
            <Text style={styles.emptyDescription}>
              {selectedFilter === 'all' 
                ? 'Aucun signalement pour le moment.'
                : `Aucun signalement ${getStatusText(selectedFilter).toLowerCase()}.`}
            </Text>
          </View>
        ) : (
          filteredReports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportInfo}>
                  <View style={styles.reportTitleRow}>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                    <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(report.priority)}20` }]}>
                      <Text style={[styles.priorityText, { color: getPriorityColor(report.priority) }]}>
                        {report.priority.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.reportMeta}>
                    <View style={styles.metaItem}>
                      <User size={14} color="#6B7280" />
                      <Text style={styles.metaText}>
                        {report.reportedBy.name} → {report.reportedUser.name}
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.metaText}>{report.createdAt}</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(report.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(report.status) }]}>
                    {getStatusText(report.status)}
                  </Text>
                </View>
              </View>

              <Text style={styles.reportDescription} numberOfLines={3}>
                {report.description}
              </Text>

              {report.evidence && report.evidence.length > 0 && (
                <View style={styles.evidenceContainer}>
                  <Text style={styles.evidenceLabel}>Preuves jointes:</Text>
                  <View style={styles.evidenceList}>
                    {report.evidence.map((evidence, index) => (
                      <View key={index} style={styles.evidenceItem}>
                        <Text style={styles.evidenceText}>{evidence}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => viewReportDetails(report)}>
                  <Eye size={16} color="#1E3A8A" />
                  <Text style={styles.viewButtonText}>Voir</Text>
                </TouchableOpacity>

                {report.status === 'pending' && (
                  <TouchableOpacity 
                    style={styles.investigateButton}
                    onPress={() => handleReportAction(report.id, 'investigate')}>
                    <Flag size={16} color="#FFFFFF" />
                    <Text style={styles.investigateButtonText}>Enquêter</Text>
                  </TouchableOpacity>
                )}

                {report.status === 'investigating' && (
                  <>
                    <TouchableOpacity 
                      style={styles.resolveButton}
                      onPress={() => handleReportAction(report.id, 'resolve')}>
                      <CheckCircle size={16} color="#FFFFFF" />
                      <Text style={styles.resolveButtonText}>Résoudre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.dismissButton}
                      onPress={() => handleReportAction(report.id, 'dismiss')}>
                      <XCircle size={16} color="#FFFFFF" />
                      <Text style={styles.dismissButtonText}>Rejeter</Text>
                    </TouchableOpacity>
                  </>
                )}

                {(report.status === 'pending' || report.status === 'investigating') && (
                  <TouchableOpacity 
                    style={styles.banButton}
                    onPress={() => handleReportAction(report.id, 'ban')}>
                    <Ban size={16} color="#FFFFFF" />
                    <Text style={styles.banButtonText}>Suspendre</Text>
                  </TouchableOpacity>
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
    color: '#FEE2E2',
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
    color: '#FEE2E2',
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
    color: '#FEE2E2',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#DC2626',
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
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reportInfo: {
    flex: 1,
    marginRight: 12,
  },
  reportTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  reportMeta: {
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
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reportDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  evidenceContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  evidenceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  evidenceList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  evidenceItem: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  evidenceText: {
    fontSize: 11,
    color: '#6B7280',
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
  investigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    gap: 6,
  },
  investigateButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resolveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#10B981',
    borderRadius: 8,
    gap: 6,
  },
  resolveButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dismissButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#6B7280',
    borderRadius: 8,
    gap: 6,
  },
  dismissButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  banButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    gap: 6,
  },
  banButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});