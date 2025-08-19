import { LayoutProps } from '@/types';


/**
 * メインページのレイアウトを定義する。
 *
 * @param param0 - レイアウトのプロパティ
 * @param param0.children - レイアウト内の子要素
 * @returns ページレイアウト
 */
export default function Layout({ children }: LayoutProps) {
  return <main>{children}</main>;
}
