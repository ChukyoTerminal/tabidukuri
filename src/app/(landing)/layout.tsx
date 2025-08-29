import type { LayoutProps } from '@/types';


/**
 * ランディングページのレイアウトを構成する。
 *
 * @param param0 - レイアウトのプロパティ
 * @param param0.children - レイアウト内の子要素
 * @returns ページレイアウト
 */
export default function LandingLayout({ children }: LayoutProps) {
  return <main>{children}</main>;
}
