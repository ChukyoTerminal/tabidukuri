'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { MPlus2 } from '@/styles/fonts';

import GoogleSigninDarkLogo from '@/public/google_signin_dark.svg';
import GoogleSigninLightLogo from '@/public/google_signin_light.svg';

const AppName = 'タビヅクリ';

export default function Landing() {
  const [roomCode, setRoomCode] = useState('');
  const [isDark, setIsDark] = useState(false);

  // 初期表示時にlocalStorage/システム設定を反映
  useEffect(() => {
    if (globalThis.window !== undefined) {
      const saved = globalThis.localStorage.getItem('theme-dark');
      if (saved !== null) {
        setIsDark(saved === 'true');
      } else if (globalThis.matchMedia) {
        setIsDark(globalThis.matchMedia('(prefers-color-scheme: dark)').matches);
      }
      // システム設定変更時も追従（localStorage未設定時のみ）
      const mq = globalThis.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        if (globalThis.localStorage.getItem('theme-dark') === null) {
          setIsDark(e.matches);
        }
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  // テーマ切替時にlocalStorageへ保存
  const handleThemeToggle = () => {
    setIsDark(previous => {
      globalThis.localStorage.setItem('theme-dark', (!previous).toString());
      return !previous;
    });
  };

  const handleJoinRoom = () => {
    alert(`部屋コード「${roomCode}」で参加します`);
  };

  const handleCreateRoom = () => { // eslint-disable-line unicorn/consistent-function-scoping
    // TODO
  };

  const handleGoogleSignIn = () => { // eslint-disable-line unicorn/consistent-function-scoping
    alert('Googleアカウントでサインインします');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-sky-100 to-teal-50'}`}>
      {/* テーマ切替ボタン */}
      <button
        onClick={handleThemeToggle}
        className={`absolute top-6 right-8 rounded-full w-10 h-10 text-[22px] shadow transition-colors z-10
          ${isDark ? 'bg-slate-700 text-slate-100' : 'bg-sky-100 text-sky-500'}`}
        aria-label={isDark ? 'ライトテーマ' : 'ダークテーマ'}
        title={isDark ? 'ライトテーマ' : 'ダークテーマ'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      <div className={`max-w-[400px] w-full rounded-2xl p-8 shadow-lg transition-colors
        ${isDark ? 'bg-slate-800 text-slate-100 shadow-slate-900' : 'bg-white text-gray-900 shadow-sky-100'}`}>
        <h1
          className={`${MPlus2.className} text-center font-bold text-[28px] mb-2 transition-colors ${isDark ? 'text-sky-400' : 'text-sky-500'}`}
        >{AppName}</h1>
        <p className={`text-center mb-6 text-[16px] transition-colors ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>旅の計画をみんなで作ろう</p>

        <div className="mt-8">
          <input
            type="text"
            placeholder="部屋コードを入力"
            value={roomCode}
            onChange={e => setRoomCode(e.target.value)}
            className={`w-full px-3 py-2 mb-3 rounded-lg text-[16px] outline-none transition-colors border
              ${isDark ? 'bg-slate-700 text-slate-100 border-slate-700 focus:border-sky-400' : 'bg-white text-gray-900 border-sky-100 focus:border-sky-500'}`}
          />
          <button
            onClick={handleJoinRoom}
            className={`w-full py-3 rounded-lg font-bold text-[16px] shadow transition-colors
              ${isDark ? 'bg-sky-400 hover:bg-sky-600' : 'bg-sky-500 hover:bg-sky-600'} text-white`}
          >
            参加する
          </button>
        </div>

        <hr className={`my-8 border-0 border-t transition-colors ${isDark ? 'border-slate-700' : 'border-sky-100'}`} />

        <div className="mb-8">
          <button
            onClick={handleCreateRoom}
            className={`w-full py-3 rounded-lg font-bold text-[16px] shadow transition-colors
              ${isDark ? 'bg-sky-600 hover:bg-sky-400' : 'bg-sky-300 hover:bg-sky-500'} text-white`}
          >
            部屋を作成
          </button>
        </div>

        <hr className={`my-8 border-0 border-t transition-colors ${isDark ? 'border-slate-700' : 'border-sky-100'}`} />

        <div className="mb-2 flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="py-2 min-h-[48px] max-w-[240px] w-full flex justify-center items-center rounded-lg shadow transition-shadow"
            aria-label="Googleでサインイン"
          >
            <Image
              src={isDark ? GoogleSigninDarkLogo : GoogleSigninLightLogo}
              alt="Googleでサインイン"
              className="w-full h-auto block transition-all"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
