
// TuTruBatTuRequest
export interface TuTruBatTuRequest {
  name: string;
  birthDateTime: string; // ISO string
  gender: number | string;
  category: number | string;
}

// LaSoBatTuResponse (rút gọn, bạn có thể mở rộng thêm nếu cần)
export interface LaSoBatTuResponse {
  compass: any[]; // hoặc Compass[]
  date: any; // hoặc LSBTDateInfo
  tutru: any; // hoặc TuTruInfo
  thansat: any[];
  daivan: any;
  thaimenhcung: any;
  is_fee: boolean;
}

// SectionContent, FiveElementsAnalysis, GodInfo, TenYearCycles, ImprovementSuggestions, ... (rút gọn)
export interface SectionContent {
  title: string;
  key_point: string;
  detailed_analysis: string;
}
export interface FiveElementsAnalysis extends SectionContent {
  element_distribution: ElementInfo[];
}
export interface ElementInfo {
  element: string;
  count: number;
  strength: string;
}
export interface GodInfo extends SectionContent {
  elements: string[];
  explanation: string;
}
export interface UsefulUnfavorableGods extends SectionContent {
  useful_gods: GodInfo;
  unfavorable_gods: GodInfo;
}
export interface CycleInfo {
  age_range: string;
  can_chi: string;
  element: string;
  analysis: string;
}
export interface TenYearCycles extends SectionContent {
  cycles: CycleInfo[];
}
export interface FengShuiItem {
  name: string;
  elements: string[];
  material: string;
  purpose: string;
  usage_instructions: string;
}
export interface ImprovementSuggestions extends SectionContent {
  feng_shui_items: FengShuiItem[];
}
export interface TuTruAnalysisResult {
  day_master_analysis: SectionContent;
  five_elements_analysis: FiveElementsAnalysis;
  ten_gods_analysis: SectionContent;
  useful_and_unfavorable_gods: UsefulUnfavorableGods;
  ten_year_cycles: TenYearCycles;
  career_guidance: SectionContent;
  improvement_suggestions: ImprovementSuggestions;
  conclusion: SectionContent;
}

// TheologyBaseResult
export interface TheologyBaseResult {
  paidResult: TuTruAnalysisResult;
  freeResult: TuTruAnalysisResult;
}

// DestinyResult interface tổng hợp
export interface DestinyResult {
  id: string;
  servicePrice: number | undefined;
  input: TuTruBatTuRequest;
  preData: LaSoBatTuResponse;
  explanation: TheologyBaseResult;
}

interface Product {
  id: string;
  // ...other fields
}