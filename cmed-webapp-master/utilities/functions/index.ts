export const formatDepartment = (hrefToDepartments: string): string => {
  return hrefToDepartments.toString().toLowerCase().replace(/[ /]/g, '-');
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join('');
};

type NormalizeRegister = 'lower' | 'upper';
export const normalizeString = (string: string, register?: NormalizeRegister) => {
  let normalizedString = string.replace(/\W+/g, '-');

  if (register === 'lower') {
    normalizedString = normalizedString.toLowerCase();
  }

  if (register === 'upper') {
    normalizedString = normalizedString.toUpperCase();
  }

  return normalizedString;
};
