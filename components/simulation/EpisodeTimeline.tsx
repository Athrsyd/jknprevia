import React from 'react';
import { EpisodeService } from '@/lib/types';
import { formatIDR, formatDate } from '@/lib/utils';
import { Calendar, Activity, Pill, Stethoscope, BedDouble, FileText } from 'lucide-react';

interface EpisodeTimelineProps {
  services: EpisodeService[];
}

export const EpisodeTimeline: React.FC<EpisodeTimelineProps> = ({ services }) => {
  const getCategoryIcon = (category: EpisodeService['service_category']) => {
    switch (category) {
      case 'akomodasi':
        return <BedDouble className="w-4 h-4 text-[#0071E3]" />;
      case 'tindakan_medis':
        return <Activity className="w-4 h-4 text-[#FF3B30]" />;
      case 'farmasi':
        return <Pill className="w-4 h-4 text-[#34C759]" />;
      case 'laboratorium':
        return <FileText className="w-4 h-4 text-[#FF9500]" />;
      case 'visite_dokter':
        return <Stethoscope className="w-4 h-4 text-[#5856D6]" />;
      default:
        return <Calendar className="w-4 h-4 text-[#86868B]" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="pb-4 mb-6 border-b border-black/[0.06]">
        <h4 className="font-bold text-base sm:text-lg text-[#1D1D1F]">
          Kronologi Pelayanan Episode
        </h4>
        <p className="text-xs sm:text-sm text-[#86868B] mt-0.5">
          Daftar tindakan, akomodasi, dan medikasi selama masa perawatan
        </p>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-black/[0.06]">
        {services.map((srv) => (
          <div key={srv.id} className="relative group">
            {/* Dot */}
            <div className="absolute -left-6 top-2.5 w-4 h-4 rounded-full bg-white border-2 border-black/[0.15] group-hover:border-[#0071E3] flex items-center justify-center transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86868B] group-hover:bg-[#0071E3]" />
            </div>

            <div className="bg-[#F5F5F7] hover:bg-[#EBEBED] rounded-2xl p-4 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs flex-shrink-0">
                    {getCategoryIcon(srv.service_category)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#1D1D1F] text-xs sm:text-sm">
                      {srv.service_name}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-[#86868B] mt-0.5">
                      <span>Kode: {srv.service_code}</span>
                      <span>•</span>
                      <span>{formatDate(srv.service_date)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-[#1D1D1F] text-xs sm:text-sm">
                    {formatIDR(srv.cost)}
                  </div>
                  <div className="text-[11px] text-[#86868B]">
                    {srv.quantity} {srv.unit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
