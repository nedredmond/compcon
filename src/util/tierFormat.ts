const ByTier = (str: string, tier?: number): string => {
  if (!str) return '';
  if (typeof str !== 'string') return JSON.stringify(str);
  let fmt = str;
  const perTier = /(\{.*?\})/g;
  const m = str.match(perTier);
  if (m) {
    m.forEach((x) => {
      if (tier) {
        const tArr = x.replace('{', '').replace('}', '').split('/');
        fmt = fmt.replace(x, `<b class="text-accent">${tArr[tier - 1]}</b>`);
      } else fmt = fmt.replace(x, x.replace('{', '<b class="text-accent">').replace('}', '</b>'));
    });
  }
  return fmt;
};

const ByTierArray = (arr: string, tier?: number): string => {
  if (!arr) return '';
  let fmt = arr;
  if (!tier) return arr;
  if (typeof arr === 'string') fmt = JSON.parse(arr);
  if (!Array.isArray(fmt)) return arr;
  return fmt[tier - 1];
};

export { ByTier, ByTierArray };
