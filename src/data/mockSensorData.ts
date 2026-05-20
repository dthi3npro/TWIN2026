// Mock IoT Sensor Data for AIoT Cadmium Risk Prediction System
// Simulates ESP32 → Cloud → AI Processing → Mobile App pipeline

export interface SensorReading {
  timestamp: string;
  pH: number;
  ec: number; // Electrical Conductivity (mS/cm) - salinity indicator
  moisture: number; // % volumetric water content
  temperature: number; // °C soil temperature
}

export interface ZoneData {
  id: string;
  name: string;
  location: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  soilHealthScore: number; // 0-100
  cdRiskScore: number; // 0-100
  currentReadings: SensorReading;
  status: string;
  lastUpdated: string;
  treeCount: number;
  areaHectares: number;
}

export interface Alert {
  id: string;
  zoneId: string;
  zoneName: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface AIAnalysis {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  rootCauses: RootCause[];
  reasoning: string;
  lastAnalyzed: string;
}

export interface RootCause {
  factor: string;
  impact: 'low' | 'medium' | 'high';
  description: string;
  contribution: number; // percentage
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'immediate' | 'short-term' | 'long-term';
  category: 'soil' | 'water' | 'fertilizer' | 'monitoring';
  estimatedCost: string;
  expectedImprovement: string;
  timeframe: string;
}

// Generate realistic historical data
export function generateHistoricalData(days: number = 30): SensorReading[] {
  const data: SensorReading[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Simulate realistic soil sensor patterns
    const baseHigh = i < 10; // recent days show deterioration
    data.push({
      timestamp: date.toISOString(),
      pH: 5.2 + Math.sin(i * 0.3) * 0.8 + (baseHigh ? -0.3 : 0) + Math.random() * 0.2,
      ec: 1.8 + Math.cos(i * 0.2) * 0.6 + (baseHigh ? 0.5 : 0) + Math.random() * 0.3,
      moisture: 35 + Math.sin(i * 0.4) * 12 + Math.random() * 5,
      temperature: 28 + Math.sin(i * 0.15) * 3 + Math.random() * 2,
    });
  }
  
  return data;
}

// Current zone data
export const zones: ZoneData[] = [
  {
    id: 'zone-a',
    name: 'Zone A',
    location: 'North Section - Mature Trees',
    riskLevel: 'low',
    soilHealthScore: 82,
    cdRiskScore: 18,
    currentReadings: {
      timestamp: new Date().toISOString(),
      pH: 5.8,
      ec: 1.6,
      moisture: 42,
      temperature: 29.2,
    },
    status: 'Healthy',
    lastUpdated: '2 min ago',
    treeCount: 45,
    areaHectares: 1.2,
  },
  {
    id: 'zone-b',
    name: 'Zone B',
    location: 'East Section - Young Trees',
    riskLevel: 'high',
    soilHealthScore: 45,
    cdRiskScore: 72,
    currentReadings: {
      timestamp: new Date().toISOString(),
      pH: 4.3,
      ec: 3.2,
      moisture: 28,
      temperature: 31.5,
    },
    status: 'At Risk',
    lastUpdated: '1 min ago',
    treeCount: 32,
    areaHectares: 0.8,
  },
  {
    id: 'zone-c',
    name: 'Zone C',
    location: 'South Section - New Plantation',
    riskLevel: 'medium',
    soilHealthScore: 63,
    cdRiskScore: 41,
    currentReadings: {
      timestamp: new Date().toISOString(),
      pH: 5.1,
      ec: 2.4,
      moisture: 35,
      temperature: 30.1,
    },
    status: 'Moderate',
    lastUpdated: '3 min ago',
    treeCount: 28,
    areaHectares: 0.6,
  },
];

// Overall dashboard data
export const dashboardData = {
  overallSoilHealth: 63,
  overallCdRisk: 44,
  totalZones: 3,
  activeAlerts: 4,
  lastSync: '1 min ago',
  farmName: 'Durian Paradise Farm',
  farmLocation: 'Chanthaburi, Thailand',
};

// AI Analysis results
export const aiAnalysis: AIAnalysis = {
  overallRisk: 'medium',
  confidence: 87,
  rootCauses: [
    {
      factor: 'High Soil Salinity',
      impact: 'high',
      description: 'EC levels in Zone B (3.2 mS/cm) exceed safe threshold. High salinity increases Cd solubility and plant uptake.',
      contribution: 38,
    },
    {
      factor: 'Low Soil pH',
      impact: 'high',
      description: 'pH 4.3 in Zone B is below optimal range (5.5-6.5). Acidic conditions mobilize heavy metals including Cadmium.',
      contribution: 32,
    },
    {
      factor: 'Low Moisture Content',
      impact: 'medium',
      description: 'Soil moisture at 28% indicates water stress. Dry conditions can concentrate salts and heavy metals.',
      contribution: 18,
    },
    {
      factor: 'Elevated Temperature',
      impact: 'low',
      description: 'Soil temperature 31.5°C slightly above optimal. May accelerate chemical reactions affecting Cd mobility.',
      contribution: 12,
    },
  ],
  reasoning: 'The AI model detects a convergence of risk factors in Zone B: critically low pH combined with high salinity creates conditions favorable for Cadmium mobilization. Historical trend analysis shows progressive deterioration over the past 10 days, likely due to recent phosphate fertilizer application and inadequate irrigation. The combination of these factors increases the probability of Cd uptake by durian root systems by approximately 3.2x compared to baseline conditions.',
  lastAnalyzed: '5 minutes ago',
};

// Recommendations
export const recommendations: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Apply Agricultural Lime (Zone B)',
    description: 'Apply dolomite lime at 2-3 tons/hectare to raise soil pH from 4.3 to target range 5.5-6.0. This will reduce Cd mobility by up to 60%.',
    priority: 'immediate',
    category: 'soil',
    estimatedCost: '฿15,000-20,000',
    expectedImprovement: 'pH increase 1.0-1.5 units within 4-6 weeks',
    timeframe: 'Apply within 7 days',
  },
  {
    id: 'rec-2',
    title: 'Switch Water Source',
    description: 'Current irrigation water may contribute to salinity buildup. Consider switching to rainwater harvesting or filtered water source for Zone B.',
    priority: 'immediate',
    category: 'water',
    estimatedCost: '฿8,000-12,000',
    expectedImprovement: 'EC reduction 30-40% within 2 weeks',
    timeframe: 'Implement within 3 days',
  },
  {
    id: 'rec-3',
    title: 'Reduce Phosphate Fertilizer',
    description: 'Phosphate fertilizers often contain trace Cadmium. Switch to low-Cd organic compost and reduce phosphate application rate by 50%.',
    priority: 'short-term',
    category: 'fertilizer',
    estimatedCost: '฿5,000-8,000',
    expectedImprovement: 'Cd input reduction 40-50%',
    timeframe: 'Next fertilizer cycle (2-3 weeks)',
  },
  {
    id: 'rec-4',
    title: 'Increase Organic Matter',
    description: 'Add biochar and compost to increase soil organic matter. Organic matter binds Cd and reduces bioavailability.',
    priority: 'short-term',
    category: 'soil',
    estimatedCost: '฿10,000-15,000',
    expectedImprovement: 'Cd bioavailability reduction 25-35%',
    timeframe: '2-4 weeks',
  },
  {
    id: 'rec-5',
    title: 'Install Drip Irrigation (Zone B)',
    description: 'Drip irrigation provides consistent moisture, prevents salt concentration, and allows precise water management.',
    priority: 'long-term',
    category: 'water',
    estimatedCost: '฿25,000-35,000',
    expectedImprovement: 'Moisture stability +40%, salt flush capability',
    timeframe: '1-2 months',
  },
  {
    id: 'rec-6',
    title: 'Deploy Additional Sensors',
    description: 'Add 2 more sensor nodes in Zone B for higher resolution monitoring and early detection of hotspots.',
    priority: 'long-term',
    category: 'monitoring',
    estimatedCost: '฿6,000-10,000',
    expectedImprovement: 'Detection accuracy +25%, coverage +50%',
    timeframe: '2-4 weeks',
  },
];

// Alerts
export const alerts: Alert[] = [
  {
    id: 'alert-1',
    zoneId: 'zone-b',
    zoneName: 'Zone B',
    type: 'danger',
    title: 'High Cd Risk Detected',
    message: 'Cadmium risk score reached 72/100 in Zone B. Immediate intervention recommended.',
    timestamp: '10 min ago',
    isRead: false,
    priority: 'high',
  },
  {
    id: 'alert-2',
    zoneId: 'zone-b',
    zoneName: 'Zone B',
    type: 'warning',
    title: 'Salinity Exceeds Threshold',
    message: 'EC level 3.2 mS/cm exceeds safe limit (2.0 mS/cm). Salt buildup may accelerate Cd mobilization.',
    timestamp: '25 min ago',
    isRead: false,
    priority: 'high',
  },
  {
    id: 'alert-3',
    zoneId: 'zone-b',
    zoneName: 'Zone B',
    type: 'warning',
    title: 'Soil pH Critical',
    message: 'pH dropped to 4.3 in Zone B. Below optimal range for durian cultivation (5.5-6.5).',
    timestamp: '1 hour ago',
    isRead: true,
    priority: 'medium',
  },
  {
    id: 'alert-4',
    zoneId: 'zone-c',
    zoneName: 'Zone C',
    type: 'info',
    title: 'Soil Stress Warning',
    message: 'Moderate soil stress detected in Zone C. Moisture levels declining. Monitor closely.',
    timestamp: '2 hours ago',
    isRead: true,
    priority: 'low',
  },
];
