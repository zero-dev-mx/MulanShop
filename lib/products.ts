export interface Category {
  id: 'deportivo' | 'playa' | 'vestidos';
  label: string;
  cjk: string;
  count: number;
  blurb: string;
}

export const MULAN_CATEGORIES: Category[] = [
  { id: 'deportivo', label: 'Deportivo',      cjk: '動', count: 4, blurb: 'Para el cuerpo en movimiento.' },
  { id: 'playa',     label: 'Playa',           cjk: '海', count: 3, blurb: 'Para los días junto al agua.' },
  { id: 'vestidos',  label: 'Vestidos & Sets', cjk: '夜', count: 3, blurb: 'Para las noches que se cuentan.' },
];

export function formatMXN(n: string | number): string {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  return '$' + num.toLocaleString('es-MX') + ' MXN';
}
