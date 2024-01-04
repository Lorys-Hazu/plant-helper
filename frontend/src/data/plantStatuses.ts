export const plantStatusesOptions = [
  {
    label: 'Healthy',
    value: 'HEALTHY',
  },
  {
    label: 'Sick / unhealthy conditions',
    options: [
      { label: 'Infested', value: 'INFESTED' },
      { label: 'Drought-stressed', value: 'DROUGHT-STRESSED' },
      { label: 'Overwatered', value: 'OVERWATERED' },
      { label: 'Nutrient-deficient', value: 'NUTRIENT-DEFICIENT' },
      { label: 'Sunlight-deprived', value: 'SUNLIGHT-DEPRIVED' },
      { label: 'Frost-damaged', value: 'FROST-DAMAGED' },
      { label: 'Diseased', value: 'DISEASED' },
      { label: 'Pest-damaged', value: 'PEST-DAMAGED' },
      { label: 'Wilting', value: 'WILTING' }
    ]
  },
  {
    label: 'Growth & development',
    options: [
      { label: 'Flowering', value: 'FLOWERING' },
      { label: 'Dormant', value: 'DORMANT' },
      { label: 'Growing', value: 'GROWING' },
      { label: 'Mature', value: 'MATURE' },
      { label: 'Young', value: 'YOUNG' }
    ]
  },
  {
    label: 'Maintenance needs',
    options: [
      { label: 'Pruning needed', value: 'PRUNING NEEDED' },
      { label: 'Recovering', value: 'RECOVERING' },
      { label: 'Root-bound', value: 'ROOT-BOUND' },
      { label: 'Declining', value: 'DECLINING' }
    ]
  }
];