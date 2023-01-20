export const SOCIALS = ['facebook', 'whatsapp', 'twitter', 'instagram', 'linkedin', 'pinterest', 'telegram', 'youtube'] as string[];

export const DAYS = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday'
} as object;

export const DEFAULT_COLORS = { p: '#0f4d8c', s: '#99c4f0' };

export const FONTS = {
  Default: '"Roboto","Helvetica","Arial",sans-serif',
  Arial: 'arial, sans-serif',
  'Arial Black': 'arial black, sans-serif',
  Verdana: 'verdana, sans-serif',
  Trebuchet: 'trebuchet ms, sans-serif',
  Impact: 'impact, sans-serif',
  'Gill Sans': 'gill sans, sans-serif',
  'Times New Roman': 'times new roman, serif',
  Georgia: 'georgia, serif',
  Courier: 'courier, monospace',
  Monaco: 'monaco, monospace',
  'Comic Sans': 'comic sans ms, cursive'
};

export const DEVELOP = process.env.REACT_NODE_ENV === "develop";
