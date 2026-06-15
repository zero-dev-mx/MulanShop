export interface Category {
  id: 'deportivo' | 'playa' | 'vestidos';
  label: string;
  count: number;
  blurb: string;
}

export const MULAN_CATEGORIES: Category[] = [
  { id: 'deportivo', label: 'Deportivo',      count: 4, blurb: 'Para el cuerpo en movimiento.' },
  { id: 'playa',     label: 'Playa',           count: 3, blurb: 'Para los días junto al agua.' },
  { id: 'vestidos',  label: 'Vestidos & Sets', count: 3, blurb: 'Para las noches que se cuentan.' },
];

export function formatMXN(n: string | number): string {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  return '$' + num.toLocaleString('es-MX') + ' MXN';
}
