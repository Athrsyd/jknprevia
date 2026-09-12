import {
  ClaimEpisode,
  SimulationRecord,
  AuditLog,
  DashboardSummary,
  ScenarioChange,
} from '../types';
import { INITIAL_EPISODES, INITIAL_USERS } from './fixtures';
import { runCounterfactualSimulation } from '../simulation/engine';
import { generateAiOperationalExplanation } from '../ai/gemini';

// In-memory canonical singleton store
class PreviaStore {
  private episodes: ClaimEpisode[] = [...INITIAL_EPISODES];
  private simulations: SimulationRecord[] = [];
  private auditLogs: AuditLog[] = [];
  private simulationIdCounter = 1840;

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // Initial Audit Logs
    this.auditLogs = [
      {
        id: 'aud-101',
        user_id: 1,
        user_name: 'Dr. Raditya Pratama, M.H.Kes',
        user_role: 'analyst',
        action: 'LOGIN',
        resource_type: 'AUTH',
        resource_id: 'usr-1',
        status: 'SUCCESS',
        ip_address: '10.14.2.89',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: 'aud-102',
        user_id: 1,
        user_name: 'Dr. Raditya Pratama, M.H.Kes',
        user_role: 'analyst',
        action: 'VIEW_EPISODE',
        resource_type: 'CLAIM_EPISODE',
        resource_id: 'JKN-2026-084291',
        status: 'SUCCESS',
        ip_address: '10.14.2.89',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: 'aud-103',
        user_id: 1,
        user_name: 'Dr. Raditya Pratama, M.H.Kes',
        user_role: 'analyst',
        action: 'RUN_SIMULATION',
        resource_type: 'SIMULATION',
        resource_id: 'SIM-2026-01840',
        status: 'SUCCESS',
        metadata: { variable: 'length_of_stay', baseline: 7, new_value: 5 },
        ip_address: '10.14.2.89',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ];

    // Seed one previous completed simulation matching the PRD killer flow
    const targetEpisode = this.episodes.find((e) => e.episode_code === 'JKN-2026-084291') || this.episodes[0];
    const initialChanges: ScenarioChange[] = [
      {
        variable: 'length_of_stay',
        baseline_value: 7,
        new_value: 5,
        unit: 'hari',
      },
    ];
    const result = runCounterfactualSimulation({
      episode: targetEpisode,
      scenarioChanges: initialChanges,
    });

    this.simulations.push({
      id: 1840,
      simulation_code: 'SIM-2026-01840',
      episode_id: targetEpisode.id,
      episode_code: targetEpisode.episode_code,
      created_by_user_id: 1,
      created_by_name: 'Dr. Raditya Pratama, M.H.Kes',
      status: 'completed',
      scenario_changes: initialChanges,
      baseline_snapshot: {
        cost: targetEpisode.claim_cost,
        los: targetEpisode.length_of_stay,
        risk_score: targetEpisode.risk_score,
        utilization: targetEpisode.service_utilization_count,
        provider_name: targetEpisode.provider_name,
        diagnosis: targetEpisode.diagnosis_description,
      },
      result,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      completed_at: new Date(Date.now() - 3600000 * 2 + 1500).toISOString(),
    });
  }

  public getEpisodes(filters?: {
    search?: string;
    province?: string;
    provider_type?: string;
    diagnosis_group?: string;
    episode_type?: string;
    risk_level?: string;
    min_cost?: number;
    max_cost?: number;
  }): ClaimEpisode[] {
    let list = [...this.episodes];

    if (!filters) return list;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (e) =>
          e.episode_code.toLowerCase().includes(q) ||
          e.patient_pseudonym.toLowerCase().includes(q) ||
          e.provider_name.toLowerCase().includes(q) ||
          e.diagnosis_group.toLowerCase().includes(q) ||
          e.diagnosis_description.toLowerCase().includes(q)
      );
    }

    if (filters.province && filters.province !== 'all') {
      list = list.filter((e) => e.province_name.toLowerCase() === filters.province?.toLowerCase());
    }

    if (filters.provider_type && filters.provider_type !== 'all') {
      list = list.filter((e) => e.provider_type === filters.provider_type);
    }

    if (filters.diagnosis_group && filters.diagnosis_group !== 'all') {
      list = list.filter((e) => e.diagnosis_group.toLowerCase().includes(filters.diagnosis_group!.toLowerCase()));
    }

    if (filters.episode_type && filters.episode_type !== 'all') {
      list = list.filter((e) => e.episode_type === filters.episode_type);
    }

    if (filters.risk_level && filters.risk_level !== 'all') {
      list = list.filter((e) => e.risk_level === filters.risk_level);
    }

    if (filters.min_cost !== undefined && !isNaN(filters.min_cost)) {
      list = list.filter((e) => e.claim_cost >= Number(filters.min_cost));
    }

    if (filters.max_cost !== undefined && !isNaN(filters.max_cost)) {
      list = list.filter((e) => e.claim_cost <= Number(filters.max_cost));
    }

    return list;
  }

  public getEpisodeById(idOrCode: number | string): ClaimEpisode | undefined {
    return this.episodes.find(
      (e) => e.id === Number(idOrCode) || e.episode_code.toLowerCase() === String(idOrCode).toLowerCase()
    );
  }

  public async runSimulation(
    episodeId: number,
    scenarioChanges: ScenarioChange[],
    userId: number = 1
  ): Promise<SimulationRecord> {
    const episode = this.getEpisodeById(episodeId);
    if (!episode) {
      throw new Error(`Episode dengan ID ${episodeId} tidak ditemukan.`);
    }

    const user = INITIAL_USERS.find((u) => u.id === userId) || INITIAL_USERS[0];
    this.simulationIdCounter += 1;
    const simCode = `SIM-2026-0${this.simulationIdCounter}`;

    const simulationResult = runCounterfactualSimulation({
      episode,
      scenarioChanges,
    });

    // Generate AI explanation with guardrail
    const aiExplanation = await generateAiOperationalExplanation({
      episode,
      result: simulationResult,
    });
    simulationResult.ai_explanation = aiExplanation;

    const record: SimulationRecord = {
      id: this.simulationIdCounter,
      simulation_code: simCode,
      episode_id: episode.id,
      episode_code: episode.episode_code,
      created_by_user_id: user.id,
      created_by_name: user.name,
      status: 'completed',
      scenario_changes: scenarioChanges,
      baseline_snapshot: {
        cost: episode.claim_cost,
        los: episode.length_of_stay,
        risk_score: episode.risk_score,
        utilization: episode.service_utilization_count,
        provider_name: episode.provider_name,
        diagnosis: episode.diagnosis_description,
      },
      result: simulationResult,
      created_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    };

    this.simulations.unshift(record);

    // Audit log
    this.addAuditLog({
      user_id: user.id,
      user_name: user.name,
      user_role: user.role,
      action: 'RUN_SIMULATION',
      resource_type: 'SIMULATION',
      resource_id: simCode,
      status: 'SUCCESS',
      metadata: {
        episode_code: episode.episode_code,
        changes: scenarioChanges,
        diff: simulationResult.estimated_difference,
      },
      ip_address: '127.0.0.1',
    });

    return record;
  }

  public getSimulationById(idOrCode: number | string): SimulationRecord | undefined {
    return this.simulations.find(
      (s) => s.id === Number(idOrCode) || s.simulation_code.toLowerCase() === String(idOrCode).toLowerCase()
    );
  }

  public getSimulations(): SimulationRecord[] {
    return [...this.simulations];
  }

  public getAuditLogs(): AuditLog[] {
    return [...this.auditLogs];
  }

  public addAuditLog(entry: Omit<AuditLog, 'id' | 'timestamp'>): AuditLog {
    const log: AuditLog = {
      ...entry,
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    return log;
  }

  public getDashboardSummary(): DashboardSummary {
    const totalClaimEpisodes = this.episodes.length;
    const totalSimulations = this.simulations.length;
    const highRiskEpisodesCount = this.episodes.filter((e) => e.risk_score >= 70).length;

    const totalCost = this.episodes.reduce((acc, curr) => acc + curr.claim_cost, 0);
    const averageEpisodeCost = Math.round(totalCost / Math.max(1, totalClaimEpisodes));

    // Estimated opportunity: sum of cost reduction across all simulations
    const estimatedCostOpportunity = this.simulations.reduce((acc, sim) => {
      if (sim.result && sim.result.estimated_difference < 0) {
        return acc + Math.abs(sim.result.estimated_difference);
      }
      return acc;
    }, 0) || 1510000;

    const riskDistribution = [
      {
        level: 'critical' as const,
        label: 'Kritis (Score >= 75)',
        count: this.episodes.filter((e) => e.risk_score >= 75).length,
        percentage: 28.5,
        color: '#DC2626',
      },
      {
        level: 'high' as const,
        label: 'Tinggi (Score 50-74)',
        count: this.episodes.filter((e) => e.risk_score >= 50 && e.risk_score < 75).length,
        percentage: 42.8,
        color: '#D97706',
      },
      {
        level: 'moderate' as const,
        label: 'Sedang (Score 25-49)',
        count: this.episodes.filter((e) => e.risk_score >= 25 && e.risk_score < 50).length,
        percentage: 14.3,
        color: '#2563EB',
      },
      {
        level: 'low' as const,
        label: 'Rendah (Score < 25)',
        count: this.episodes.filter((e) => e.risk_score < 25).length,
        percentage: 14.4,
        color: '#16A34A',
      },
    ];

    const costTrend = [
      { month: 'Sep 2025', baseline_cost: 38500000, simulated_opportunity: 5200000 },
      { month: 'Okt 2025', baseline_cost: 41200000, simulated_opportunity: 6400000 },
      { month: 'Nov 2025', baseline_cost: 39800000, simulated_opportunity: 5800000 },
      { month: 'Des 2025', baseline_cost: 44500000, simulated_opportunity: 7100000 },
      { month: 'Jan 2026', baseline_cost: 42300000, simulated_opportunity: 6900000 },
      { month: 'Feb 2026', baseline_cost: 45720000, simulated_opportunity: 7850000 },
    ];

    return {
      total_claim_episodes: totalClaimEpisodes,
      total_simulations: totalSimulations,
      estimated_cost_opportunity: estimatedCostOpportunity,
      high_risk_episodes_count: highRiskEpisodesCount,
      average_episode_cost: averageEpisodeCost,
      cost_trend: costTrend,
      risk_distribution: riskDistribution,
      recent_simulations: this.simulations.slice(0, 5),
    };
  }
}

// Global singleton declaration to preserve state across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var __previaStore: PreviaStore | undefined;
}

export const store = globalThis.__previaStore || (globalThis.__previaStore = new PreviaStore());
