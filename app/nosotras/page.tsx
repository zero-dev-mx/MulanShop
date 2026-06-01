import type { Metadata } from 'next';
import NosotrasTemplate from '@/components/templates/NosotrasTemplate/NosotrasTemplate';

export const metadata: Metadata = {
  title: 'Nosotras · Mulán',
  description: 'La historia detrás de Mulan Shop. Una marca que nació de una herencia doble, un nombre reclamado y la pasión por la moda con intención.',
};

export default function NosotrasPage() {
  return <NosotrasTemplate />;
}
