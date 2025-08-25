import React, { useState } from "react";

const AppName = "Travel Plan.";

export default function Landing() {
  const [roomCode, setRoomCode] = useState("");
  const [newRoomCode, setNewRoomCode] = useState("");

  const handleJoinRoom = () => {
    // ここで部屋コードで参加する処理を実装
    alert(`部屋コード「${roomCode}」で参加します`);
  };

  const handleCreateRoom = () => {
    // ここで新しい部屋コードを作成する処理を実装
    alert(`新しい部屋コード「${newRoomCode}」を作成します`);
  };

  const handleGoogleSignIn = () => {
    // Google認証の処理をここに実装
    alert("Googleアカウントでサインインします");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h1 style={{ textAlign: "center" }}>{AppName}</h1>

      <div style={{ margin: "24px 0" }}>
        <h2>部屋を作成</h2>
        <input
          type="text"
          placeholder="新しい部屋コードを入力"
          value={newRoomCode}
          onChange={e => setNewRoomCode(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <button onClick={handleCreateRoom} style={{ width: "100%", padding: 8 }}>
          部屋を作成
        </button>
      </div>

      <div style={{ margin: "24px 0" }}>
        <h2>部屋に参加</h2>
        <input
          type="text"
          placeholder="部屋コードを入力"
          value={roomCode}
          onChange={e => setRoomCode(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <button onClick={handleJoinRoom} style={{ width: "100%", padding: 8 }}>
          参加する
        </button>
      </div>

      <div style={{ margin: "24px 0", textAlign: "center" }}>
        <button onClick={handleGoogleSignIn} style={{ width: "100%", padding: 12, background: "#4285F4", color: "#fff", border: "none", borderRadius: 4 }}>
          Googleでサインイン
        </button>
      </div>
    </div>
  );
}
