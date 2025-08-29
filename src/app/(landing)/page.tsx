'use client';

import React, { useState } from 'react';

const AppName = 'Tabizukuri.';

export default function Landing() {
  const [roomCode, setRoomCode] = useState('');
  const [newRoomCode, setNewRoomCode] = useState('');

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdfa 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 400, width: '100%', background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderRadius: 16, padding: 32 }}>
        <h1 style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, color: '#0ea5e9', marginBottom: 8 }}>{AppName}</h1>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: 24, fontSize: 16 }}>旅の計画をみんなで作ろう</p>

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
              border: '1px solid #bae6fd',
              borderRadius: 8,
              fontSize: 16,
              outline: 'none',
              transition: 'border 0.2s',
            }}
            onFocus={e => (e.target.style.border = '1.5px solid #0ea5e9')}
            onBlur={e => (e.target.style.border = '1px solid #bae6fd')}
          />
          <button
            onClick={handleJoinRoom}
            style={{
              width: '100%',
              padding: '12px 0',
              background: '#0ea5e9',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(14,165,233,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#0369a1')}
            onMouseOut={e => (e.currentTarget.style.background = '#0ea5e9')}
          >
            参加する
          </button>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1.5px solid #e0e7ef' }} />

        <div style={{ margin: '0 0 32px 0' }}>
          <button
            onClick={handleCreateRoom}
            style={{
              width: '100%',
              padding: '12px 0',
              background: '#38bdf8',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(56,189,248,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#0ea5e9')}
            onMouseOut={e => (e.currentTarget.style.background = '#38bdf8')}
          >
            部屋を作成
          </button>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1.5px solid #e0e7ef' }} />

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
              boxShadow: '0 2px 8px rgba(14,165,233,0.04)',
              transition: 'box-shadow 0.2s',
            }}
            aria-label="Googleでサインイン"
            onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(14,165,233,0.12)')}
            onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(14,165,233,0.04)')}
          >
            <img
              src="/images/google.button.png"
              alt="Googleでサインイン"
              style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block', borderRadius: 8 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
