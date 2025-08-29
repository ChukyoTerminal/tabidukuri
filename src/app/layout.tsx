import '@/styles/globals.css';
import { GeistSans, GeistMono } from '@/styles/fonts';

import type { Metadata } from 'next';

import type { LayoutProps } from '@/types';


/**
 * ページのメタデータを定義する。
 */
export const metadata: Metadata = {
  title: '旅行計画作成サイト',
  description: '旅行計画を簡単に作成できるWebサイト',
};


/**
 * アプリケーションのルートレイアウトを定義する。
 *
 * @param param0 - レイアウトのプロパティ
 * @param param0.children - レイアウト内の子要素
 * @returns ページレイアウト
 */
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
