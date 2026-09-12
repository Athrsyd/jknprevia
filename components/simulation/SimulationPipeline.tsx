import React from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  status: 'waiting' | 'running' | 'completed';
}

interface SimulationPipelineProps {
  stages: PipelineStage[];
}

export const SimulationPipeline: React.FC<SimulationPipelineProps> = ({ stages }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-9 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
      <div className="text-center pb-6 mb-6 border-b border-black/[0.06]">
        <div className="w-12 h-12 rounded-full bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center mx-auto mb-3">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
          Menjalankan Simulasi Counterfactual
        </h3>
        <p className="text-xs sm:text-sm text-[#86868B] mt-1">
          Memproses skenario kausalitas dan estimasi efisiensi biaya secara bertahap
        </p>
      </div>

      {/* Apple style installer stages list */}
      <div className="space-y-3.5">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'completed';
          const isRunning = stage.status === 'running';

          return (
            <div
              key={stage.id}
              className={`flex items-start gap-3.5 p-4 rounded-2xl transition-all duration-200 ${
                isRunning
                  ? 'bg-[#F5F5F7] border border-black/[0.06]'
                  : isCompleted
                  ? 'bg-white'
                  : 'bg-white opacity-40'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-[#34C759]" />
                ) : isRunning ? (
                  <Loader2 className="w-5 h-5 text-[#0071E3] animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-[#86868B]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm tracking-tight ${
                      isRunning
                        ? 'text-[#0071E3] font-bold'
                        : isCompleted
                        ? 'text-[#1D1D1F] font-semibold'
                        : 'text-[#86868B]'
                    }`}
                  >
                    Tahap {idx + 1}: {stage.name}
                  </h4>
                  {isRunning && (
                    <span className="text-xs font-semibold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-0.5 rounded-full">
                      Memproses
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6E6E73] mt-0.5 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
