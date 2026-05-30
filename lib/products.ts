export interface Product {
  id: string;
  name: string;
  category: 'deportivo' | 'playa' | 'vestidos';
  price: number;
  color: string;
  sizes: string[];
  composition: string;
  care: string;
  description: string;
  story?: string;
  label: string;
  image?: string;
}

export interface Category {
  id: 'deportivo' | 'playa' | 'vestidos';
  label: string;
  cjk: string;
  count: number;
  blurb: string;
}

export interface CartItem extends Product {
  size: string;
  qty: number;
}

export const MULAN_PRODUCTS: Product[] = [
  {
    id: 'jumpsuit-oliva',
    name: 'Jumpsuit Atlético',
    category: 'deportivo',
    price: 1290,
    color: 'Oliva',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '78% nylon reciclado · 22% elastano',
    care: 'Lavar en frío · No usar suavizante · Secar a la sombra',
    description: 'Una sola pieza, segunda piel. Espalda abierta, costura central que esculpe. Para entrenar, caminar, vivir el día completo.',
    story: 'Cortado en Aguascalientes, en un taller que también nos hace los leggings. El tono oliva es de un lote único — cuando se acaba, se acaba.',
    label: 'JUMPSUIT',
    image: '/products/jumpsuit-oliva.jpg',
  },
  {
    id: 'set-piedra',
    name: 'Set Termal · Piedra',
    category: 'deportivo',
    price: 1890,
    color: 'Piedra',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '82% nylon reciclado · 18% elastano · Tejido sin costuras',
    care: 'Lavar en frío al revés · Secar plano · Plancha tibia',
    description: 'Conjunto de dos piezas: chaqueta con zipper completo, cuello alto y puños con orificio para el pulgar; legging de cintura alta a juego. Tejido termorregulador, sin costuras laterales.',
    story: 'Inspirado en las capas de la ropa de montaña japonesa. Pensado para los días de transición: yoga en la mañana, café después.',
    label: 'SET 2 PIEZAS',
    image: '/products/set-piedra.jpg',
  },
  {
    id: 'set-negro',
    name: 'Set Termal · Negro',
    category: 'deportivo',
    price: 1890,
    color: 'Negro',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '82% nylon reciclado · 18% elastano · Tejido sin costuras',
    care: 'Lavar en frío al revés · Secar plano · Plancha tibia',
    description: 'El set termal en negro absoluto. Chaqueta entallada con zipper, cuello alto, puños largos. Legging a juego de cintura alta. Para entrenar y para todo lo demás.',
    label: 'SET 2 PIEZAS',
    image: '/products/set-negro.jpg',
  },
  {
    id: 'top-yoga-algodon',
    name: 'Top Yoga Algodón',
    category: 'deportivo',
    price: 720,
    color: 'Crudo',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '92% algodón orgánico · 8% elastano',
    care: 'Lavar a mano · Secar a la sombra',
    description: 'Un top sin costuras, suave al tacto. Pensado para los días lentos del cuerpo.',
    story: 'Tejido en una pequeña fábrica en Aguascalientes. Cada lote se tiñe con tintes minerales que envejecen con el uso.',
    label: 'TOP',
  },
  {
    id: 'pareo-lino',
    name: 'Pareo Lino Lavado',
    category: 'playa',
    price: 980,
    color: 'Arena',
    sizes: ['Único'],
    composition: '100% lino europeo lavado',
    care: 'Lavar a mano · Secar al sol',
    description: 'Un rectángulo largo de lino, suave de tantos lavados. Se anuda en la cintura, sobre el hombro, donde quieras.',
    label: 'PAREO',
  },
  {
    id: 'bikini-anudado',
    name: 'Bikini Anudado',
    category: 'playa',
    price: 1180,
    color: 'Marfil',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '78% poliamida reciclada · 22% elastano',
    care: 'Enjuagar después de cada uso · Secar a la sombra',
    description: 'Triángulo clásico, atado a mano. Sin moldes ni rellenos. Hecho para nadar en serio.',
    label: 'BIKINI',
  },
  {
    id: 'camisa-playa-crudo',
    name: 'Camisa Playa Oversize',
    category: 'playa',
    price: 1280,
    color: 'Crudo',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '100% algodón orgánico',
    care: 'Lavar en frío · Plancha cálida',
    description: 'La camisa que te pones encima del traje de baño y ya. Manga larga, botones de concha, cae hasta medio muslo.',
    label: 'CAMISA',
  },
  {
    id: 'vestido-largo-seda',
    name: 'Vestido Largo Seda',
    category: 'vestidos',
    price: 4290,
    color: 'Tinta',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '100% seda china',
    care: 'Sólo limpieza en seco',
    description: 'Largo hasta el tobillo, espalda baja, tirantes finos. Una pieza para llevar dos décadas.',
    story: 'La seda viene de Hangzhou, tejida en talleres familiares. Cada vestido se corta a mano en CDMX.',
    label: 'VESTIDO LARGO',
  },
  {
    id: 'set-satin-marfil',
    name: 'Set Satín · Marfil',
    category: 'vestidos',
    price: 3490,
    color: 'Marfil',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '92% viscosa · 8% elastano',
    care: 'Lavar a mano en frío · Plancha al revés',
    description: 'Top con tirantes y pantalón ancho a juego, en satín pesado. Para las cenas que terminan tarde.',
    label: 'SET 2 PIEZAS',
  },
  {
    id: 'vestido-midi-bias',
    name: 'Vestido Midi al Bies',
    category: 'vestidos',
    price: 3290,
    color: 'Bronce',
    sizes: ['XS', 'S', 'M', 'L'],
    composition: '100% viscosa',
    care: 'Lavar a mano · Secar plano',
    description: 'Corte al bies, escote en V, espalda descubierta. Cae como agua sobre el cuerpo.',
    label: 'VESTIDO MIDI',
  },
];

export const MULAN_CATEGORIES: Category[] = [
  { id: 'deportivo', label: 'Deportivo',      cjk: '動', count: 4, blurb: 'Para el cuerpo en movimiento.' },
  { id: 'playa',     label: 'Playa',           cjk: '海', count: 3, blurb: 'Para los días junto al agua.' },
  { id: 'vestidos',  label: 'Vestidos & Sets', cjk: '夜', count: 3, blurb: 'Para las noches que se cuentan.' },
];

export function formatMXN(n: number): string {
  return '$' + n.toLocaleString('es-MX') + ' MXN';
}
