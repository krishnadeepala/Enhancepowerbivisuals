// CHOP 2026 Power BI Design Tokens
// Source: chop_pbix_to_figma_standards guide

export const C = {
  // Brand
  navy:      '#005587',
  cyan:      '#41B6E6',
  // Data palette
  pink:      '#E1176B',
  green:     '#6F972B',
  brown:     '#786452',
  midBlue:   '#0D7BBB',
  deepPink:  '#C0165C',
  darkGreen: '#5E7F24',
  orange:    '#F5A623',
  // Surface
  bg:        '#fcfcfd',
  canvas:    '#f0f0f3',
  // Text
  fg:        '#1c2024',
  muted:     '#60646c',
  // Border
  border:    '#cdced6',
  grid:      '#e0e1e6',
  slicerBg:  '#E1F0F8',
};

// Typography — plain objects, no React type dependency
export const FONT = {
  kpiValue:  { fontFamily: 'Arial, sans-serif',          fontWeight: 700, fontSize: 36  },
  kpiLabel:  { fontFamily: 'Arial, sans-serif',          fontWeight: 400, fontSize: 10.5},
  pageTitle: { fontFamily: "'Segoe UI', sans-serif",     fontWeight: 700, fontSize: 14  },
  axisLabel: { fontFamily: "'Segoe UI', sans-serif",     fontWeight: 400, fontSize: 9   },
  legend:    { fontFamily: "'Segoe UI', sans-serif",     fontWeight: 400, fontSize: 9   },
} as const;