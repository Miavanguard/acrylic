import { getBranchById, type Service } from '@/data/locations';
import { midstreamMobileInfo, midstreamMobilePricing } from '@/data/midstreamMobile';
import { MOBILE_BRANCH_ID } from '@/lib/booking';
import type { BookingTarget } from '@/types/booking';

export interface CatalogCategory {
  id: string;
  label: string;
  subtext?: string;
  items: Service[];
}

export interface BookingCatalog {
  mode: 'salon' | 'mobile';
  branchId: string;
  branchName: string;
  whatsappNumber: string;
  categories: CatalogCategory[];
}

export function resolveCatalog(target: BookingTarget): BookingCatalog {
  if (target.kind === 'mobile') {
    return {
      mode: 'mobile',
      branchId: MOBILE_BRANCH_ID,
      branchName: 'Midstream Mobile Aesthetics',
      whatsappNumber: midstreamMobileInfo.whatsappNumber,
      categories: midstreamMobilePricing.map((category) => ({
        id: category.id,
        label: category.label,
        subtext: category.subtext,
        items: category.items,
      })),
    };
  }

  const branch = getBranchById(target.branchId || '');
  return {
    mode: 'salon',
    branchId: branch.id,
    branchName: branch.name,
    whatsappNumber: branch.whatsappNumber,
    categories: branch.pricing,
  };
}
