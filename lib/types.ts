export type UserRole = 'analyst' | 'policy_officer' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar?: string;
}

export type EpisodeType = 'rawat_inap' | 'rawat_jalan' | 'gawat_darurat';
export type ProviderType = 'rsup' | 'rsud_a' | 'rsud_b' | 'rsud_c' | 'fktp_puskesmas' | 'klinik_pratama';
export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface EpisodeService {
  id: string;
  service_code: string;
  service_name: string;
  service_category: 'akomodasi' | 'tindakan_medis' | 'farmasi' | 'laboratorium' | 'visite_dokter';
  service_date: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface ClaimEpisode {
  id: number;
  episode_code: string; // e.g. "JKN-2026-084291"
  patient_pseudonym: string; // e.g. "Pasien #84291 (Usia 58, Pria)"
  provider_id: string;
  provider_name: string;
  provider_type: ProviderType;
  province_code: string;
  province_name: string;
  episode_type: EpisodeType;
  diagnosis_code: string;
  diagnosis_group: string;
  diagnosis_description: string;
  length_of_stay: number; // days
  service_utilization_count: number;
  claim_cost: number; // in IDR
  risk_score: number; // 0 - 100
  risk_level: RiskLevel;
  readmission_risk: number; // 0 - 100%
  episode_started_at: string;
  episode_ended_at: string;
  services: EpisodeService[];
  related_episodes_count: number;
  notes?: string;
}

export interface ScenarioChange {
  variable: 'length_of_stay' | 'provider_scenario' | 'utilization' | 'referral_pathway';
  baseline_value: number | string;
  new_value: number | string;
  unit?: string;
}

export interface DriverAttribution {
  name: string;
  contribution_pct: number;
  direction: 'decrease' | 'increase' | 'neutral';
  impact_amount: number;
  explanation: string;
}

export interface SimulationResultContract {
  baseline_cost: number;
  estimated_cost: number;
  estimated_difference: number;
  estimated_difference_pct: number;
  baseline_los: number;
  estimated_los: number;
  baseline_risk_score: number;
  estimated_risk_score: number;
  baseline_utilization: number;
  estimated_utilization: number;
  confidence: number; // e.g. 0.84
  confidence_level: 'high' | 'moderate' | 'low';
  model_version: string;
  drivers: DriverAttribution[];
  cost_waterfall: {
    category: string;
    baseline: number;
    estimated: number;
    difference: number;
  }[];
  ai_explanation?: {
    summary: string;
    primary_factors: string[];
    operational_recommendation: string;
    disclaimer: string;
  };
}

export type SimulationStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface SimulationRecord {
  id: number;
  simulation_code: string;
  episode_id: number;
  episode_code: string;
  created_by_user_id: number;
  created_by_name: string;
  status: SimulationStatus;
  scenario_changes: ScenarioChange[];
  baseline_snapshot: {
    cost: number;
    los: number;
    risk_score: number;
    utilization: number;
    provider_name: string;
    diagnosis: string;
  };
  result?: SimulationResultContract;
  created_at: string;
  completed_at?: string;
}

export interface AuditLog {
  id: string;
  user_id: number;
  user_name: string;
  user_role: string;
  action: 'LOGIN' | 'LOGOUT' | 'VIEW_EPISODE' | 'RUN_SIMULATION' | 'SAVE_SIMULATION' | 'EXPORT_DATA';
  resource_type: string;
  resource_id: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  metadata?: Record<string, unknown>;
  ip_address: string;
  timestamp: string;
}

export interface DashboardSummary {
  total_claim_episodes: number;
  total_simulations: number;
  estimated_cost_opportunity: number;
  high_risk_episodes_count: number;
  average_episode_cost: number;
  cost_trend: {
    month: string;
    baseline_cost: number;
    simulated_opportunity: number;
  }[];
  risk_distribution: {
    level: RiskLevel;
    label: string;
    count: number;
    percentage: number;
    color: string;
  }[];
  recent_simulations: SimulationRecord[];
}
