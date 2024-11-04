import type { CostSetting } from '../types';

const settingSources = ['BASE_CONFIG', 'TEMPERATURE_CAT'];

export function generateCostData(): CostSetting[] {
  const settings = [
    { name: 'BaseAddlStopHours', basis: 'Per Stop', value: 2.5 },
    { name: 'BaseCPM', basis: 'Per Mile', value: 3.25 },
    { name: 'BaseDwellMaxHours', basis: 'Per Load', value: 48 },
    { name: 'BaseDwellMinHours', basis: 'Per Load', value: 2 },
    { name: 'BaseFSC', basis: 'Per Mile', value: 0.45 },
    { name: 'CODriver_CompPctOfACC', basis: 'Percentage', value: '25%' },
    { name: 'CODriver_CompPctOfFSC', basis: 'Percentage', value: '65%' },
    { name: 'CODriver_CompPctOfLH', basis: 'Percentage', value: '75%' },
    { name: 'ReeferFuelHourlyCost', basis: 'Per Hour', value: 2.75 },
  ];

  return settings.map((setting, index) => ({
    id: `setting-${index + 1}`,
    operationCode: 'COST_REF',
    settingName: setting.name,
    settingSource: settingSources[Math.floor(Math.random() * settingSources.length)],
    settingBasis: setting.basis,
    effectiveDateTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '),
    value: setting.value,
  }));
}