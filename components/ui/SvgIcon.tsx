import Image from 'next/image';
import { findSvgByName } from '@/configs/svgConstants';

export function SvgIcon({ name }: { name: string }) {
  return (
    <Image
      src={findSvgByName(name)}
      alt={name}
      width={24}
      height={24}
      className="w-6 h-6"
    />
  );
}