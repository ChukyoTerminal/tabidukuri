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
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h1 style={{ textAlign: 'center' }}>{AppName}</h1>

      <div style={{ margin: '24px 0' }}>
        <h2>新しい部屋を作成</h2>
        <input
          type="text"
          placeholder="新しい部屋コードを入力"
          value={newRoomCode}
          onChange={e => setNewRoomCode(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <button onClick={handleCreateRoom} style={{ width: '100%', padding: 8 }}>
          部屋を作成
        </button>
      </div>

      <div style={{ margin: '24px 0' }}>
        <h2>部屋に参加</h2>
        <input
          type="text"
          placeholder="部屋コードを入力"
          value={roomCode}
          onChange={e => setRoomCode(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <button onClick={handleJoinRoom} style={{ width: '100%', padding: 8 }}>
          参加する
        </button>
      </div>

      <div style={{ margin: '24px 0', textAlign: 'center' }}>
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
            cursor: 'pointer'
          }}
          aria-label="Googleでサインイン"
        >
          <img
            src="/images/google.button.png"
            alt="Googleでサインイン"
            style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block' }}
          />
        </button>
      </div>
    </div>
  );
}
