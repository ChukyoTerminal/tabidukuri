'use client';

import React, { useState, useEffect } from 'react';

const AppName = 'Tabizukuri.';

export default function Landing() {
  const [roomCode, setRoomCode] = useState('');
  const [newRoomCode, setNewRoomCode] = useState('');
  const [isDark, setIsDark] = useState(false);

  // 初期表示時にlocalStorage/システム設定を反映
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('theme-dark');
      if (saved !== null) {
        setIsDark(saved === 'true');
      } else if (window.matchMedia) {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
      // システム設定変更時も追従（localStorage未設定時のみ）
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        if (window.localStorage.getItem('theme-dark') === null) {
          setIsDark(e.matches);
        }
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  // テーマ切替時にlocalStorageへ保存
  const handleThemeToggle = () => {
    setIsDark(prev => {
      window.localStorage.setItem('theme-dark', (!prev).toString());
      return !prev;
    });
  };

  const handleJoinRoom = () => {
    alert(`部屋コード「${roomCode}」で参加します`);
  };

  const handleCreateRoom = () => {
    alert(`新しい部屋コード「${newRoomCode}」を作成します`);
  };

  const handleGoogleSignIn = () => {
    alert('Googleアカウントでサインインします');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #e0f2fe 0%, #f0fdfa 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* テーマ切替ボタン */}
      <button
        onClick={handleThemeToggle}
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          background: isDark ? '#334155' : '#e0f2fe',
          color: isDark ? '#f1f5f9' : '#0ea5e9',
          border: 'none',
          borderRadius: '50%',
          width: 40,
          height: 40,
          fontSize: 22,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'background 0.2s',
        }}
        aria-label={isDark ? 'ライトテーマ' : 'ダークテーマ'}
        title={isDark ? 'ライトテーマ' : 'ダークテーマ'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      <div style={{
        maxWidth: 400,
        width: '100%',
        background: isDark ? '#1e293b' : '#fff',
        boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.32)' : '0 4px 24px rgba(0,0,0,0.08)',
        borderRadius: 16,
        padding: 32,
        color: isDark ? '#f1f5f9' : '#222',
        transition: 'background 0.2s, color 0.2s',
      }}>
        <h1 style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 28,
          color: isDark ? '#38bdf8' : '#0ea5e9',
          marginBottom: 8,
          transition: 'color 0.2s',
        }}>{AppName}</h1>
        <p style={{
          textAlign: 'center',
          color: isDark ? '#94a3b8' : '#555',
          marginBottom: 24,
          fontSize: 16,
          transition: 'color 0.2s',
        }}>旅の計画をみんなで作ろう</p>

        <div style={{ margin: '32px 0 0 0' }}>
          <input
            type="text"
            placeholder="部屋コードを入力"
            value={roomCode}
            onChange={e => setRoomCode(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: 12,
              border: isDark ? '1px solid #334155' : '1px solid #bae6fd',
              background: isDark ? '#334155' : '#fff',
              color: isDark ? '#f1f5f9' : '#222',
              borderRadius: 8,
              fontSize: 16,
              outline: 'none',
              transition: 'border 0.2s, background 0.2s, color 0.2s',
            }}
            onFocus={e => (e.target.style.border = isDark ? '1.5px solid #38bdf8' : '1.5px solid #0ea5e9')}
            onBlur={e => (e.target.style.border = isDark ? '1px solid #334155' : '1px solid #bae6fd')}
          />
          <button
            onClick={handleJoinRoom}
            style={{
              width: '100%',
              padding: '12px 0',
              background: isDark ? '#38bdf8' : '#0ea5e9',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              borderRadius: 8,
              boxShadow: isDark ? '0 2px 8px rgba(56,189,248,0.16)' : '0 2px 8px rgba(14,165,233,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = isDark ? '#0ea5e9' : '#0369a1')}
            onMouseOut={e => (e.currentTarget.style.background = isDark ? '#38bdf8' : '#0ea5e9')}
          >
            参加する
          </button>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: isDark ? '1.5px solid #334155' : '1.5px solid #e0e7ef', transition: 'border-top 0.2s' }} />

        <div style={{ margin: '0 0 32px 0' }}>
          <button
            onClick={handleCreateRoom}
            style={{
              width: '100%',
              padding: '12px 0',
              background: isDark ? '#0ea5e9' : '#38bdf8',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              borderRadius: 8,
              boxShadow: isDark ? '0 2px 8px rgba(14,165,233,0.16)' : '0 2px 8px rgba(56,189,248,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = isDark ? '#38bdf8' : '#0ea5e9')}
            onMouseOut={e => (e.currentTarget.style.background = isDark ? '#0ea5e9' : '#38bdf8')}
          >
            部屋を作成
          </button>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: isDark ? '1.5px solid #334155' : '1.5px solid #e0e7ef', transition: 'border-top 0.2s' }} />

        <div style={{ margin: '0 0 8px 0', textAlign: 'center' }}>
          <button
            onClick={handleGoogleSignIn}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              borderRadius: 8,
              boxShadow: isDark ? '0 2px 8px rgba(56,189,248,0.08)' : '0 2px 8px rgba(14,165,233,0.04)',
              transition: 'box-shadow 0.2s',
            }}
            aria-label="Googleでサインイン"
            onMouseOver={e => (e.currentTarget.style.boxShadow = isDark ? '0 4px 16px rgba(56,189,248,0.16)' : '0 4px 16px rgba(14,165,233,0.12)')}
            onMouseOut={e => (e.currentTarget.style.boxShadow = isDark ? '0 2px 8px rgba(56,189,248,0.08)' : '0 2px 8px rgba(14,165,233,0.04)')}
          >
            <img
              src="/images/google.button.png"
              alt="Googleでサインイン"
              style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block', borderRadius: 8, filter: isDark ? 'brightness(0.85) contrast(1.2)' : 'none', transition: 'filter 0.2s' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
