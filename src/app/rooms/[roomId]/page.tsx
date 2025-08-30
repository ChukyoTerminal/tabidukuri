'use client';

import { useState, useCallback, useEffect } from 'react';
import { Plus } from 'lucide-react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Position,
  type Node,
  type Edge,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Modal from '@/components/modal';

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const initialNodes: Node[] = [
  {
    id: 'A',
    position: { x: 0, y: 150 },
    data: { label: 'A' },
    ...nodeDefaults,
  },
  {
    id: 'B',
    position: { x: 250, y: 0 },
    data: { label: 'B' },
    ...nodeDefaults,
  },
  {
    id: 'C',
    position: { x: 250, y: 150 },
    data: { label: 'C' },
    ...nodeDefaults,
  },
  {
    id: 'D',
    position: { x: 250, y: 300 },
    data: { label: 'D' },
    ...nodeDefaults,
  },
];

const initialEdges: Edge[] = [
  {
    id: 'A-B',
    source: 'A',
    target: 'B',
    style: { stroke: '#059669', strokeWidth: 4 },
    markerEnd: { type: 'arrowclosed', color: '#059669', width: 10, height: 10 }
  },
  {
    id: 'B-C',
    source: 'B',
    target: 'C',
    style: { stroke: '#059669', strokeWidth: 4 },
    markerEnd: { type: 'arrowclosed', color: '#059669', width: 10, height: 10 },
  },
];

import React from 'react';
type RoomPageProps = { params: Promise<{ roomId: string }> | { roomId: string } };
export default function RoomPage(props: RoomPageProps) {
  // ダークモード判定
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('theme-dark');
      if (saved !== null) {
        setIsDark(saved === 'true');
      } else if (window.matchMedia) {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
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
  // Next.js 14+ paramsはPromiseの場合がある
  const parameters = typeof props.params === 'object' && 'then' in props.params
    ? React.use(props.params)
    : props.params;
  const roomId = parameters.roomId;
  const [room, setRoom] = useState<any>(null);
  const [roomLoading, setRoomLoading] = useState(true);
  useEffect(() => {
    if (!roomId) return;
    setRoomLoading(true);
    fetch(`/api/rooms/${roomId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setRoom(data);
        setRoomLoading(false);
      });
  }, [roomId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const [place, setPlace] = useState('');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  const onConnect: OnConnect = useCallback(
    (parameters) => {
      setEdges((eds) => {
        // sourceまたはtargetが既存エッジで使われていれば追加しない
        const exists = eds.some(
          (edge) => edge.source === parameters.source || edge.target === parameters.target
        );
        if (exists) return eds;
        return addEdge(parameters, eds);
      });
    },
    [setEdges],
  );

  // テーマ切替
  const handleThemeToggle = () => {
    setIsDark(prev => {
      window.localStorage.setItem('theme-dark', (!prev).toString());
      return !prev;
    });
  };

  return (
    <div className={
      `w-screen h-screen relative flex flex-col transition-colors ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-sky-100 to-teal-50'}`
    }>
      {/* テーマ切替ボタン */}
      <button
        onClick={handleThemeToggle}
        className={`absolute top-20 right-8 rounded-full w-10 h-10 text-[22px] shadow transition-colors z-30
          ${isDark ? 'bg-slate-700 text-slate-100' : 'bg-sky-100 text-sky-500'}`}
        aria-label={isDark ? 'ライトテーマ' : 'ダークテーマ'}
        title={isDark ? 'ライトテーマ' : 'ダークテーマ'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
      {/* ヘッダー */}
      <header className={`fixed top-0 left-0 w-full px-6 py-4 backdrop-blur shadow-md z-20 flex items-center justify-between border-b ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-sky-100'}`}>
        <div className="flex items-center gap-3">
          <span className="inline-block w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
          <h1 className={`font-bold text-xl tracking-wide drop-shadow-sm ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>{room?.name ?? '部屋名'}</h1>
        </div>
        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{room?.description}</span>
      </header>

      {/* ReactFlowエリア */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-32">
        <div className={`w-full h-full max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden backdrop-blur border relative transition-colors
          ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-sky-100'}`}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => setSelectedNode(node)}
            onEdgeClick={(_, edge) => setSelectedEdge(edge)}
            fitView
            className={isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-black' : 'bg-gradient-to-br from-sky-50 to-teal-100 text-black'}
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
          {/* ノード追加ボタン */}
          <button
            type="button"
            aria-label="ノード追加"
            onClick={() => setIsNodeModalOpen((pre) => !pre)}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full shadow-lg p-5 flex items-center justify-center z-30 border-4 ${isDark ? 'bg-sky-400 hover:bg-sky-600 text-white border-slate-800' : 'bg-sky-500 hover:bg-sky-600 text-white border-white'}`}
          >
            <Plus size={36} className={isNodeModalOpen ? 'transition-transform rotate-45' : 'transition-transform'} />
          </button>
        </div>
      </main>

      {/* ノード追加モーダル */}
      {isNodeModalOpen && (
        <Modal
          isOpen={isNodeModalOpen}
          onRequestClose={() => setIsNodeModalOpen(false)}
          contentLabel="ノード追加"
        >
          <form className="flex flex-col gap-4 relative pb-20" onSubmit={e => {
            e.preventDefault();
            if (!place) return;
            setNodes((nds) => {
              return [...nds, {
                id: (nds.length + 1).toString(),
                position: { x: 0, y: 0 },
                data: { label: place },
                ...nodeDefaults,
              }];
            });
            setIsNodeModalOpen(false);
            setPlace('');
          }}>
            <label className="flex flex-col gap-1">
              <span className={`text-sm font-medium ${isDark ? 'text-sky-300' : ''}`}>場所</span>
              <input
                type="text"
                name="place"
                placeholder="場所を入力"
                className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-colors ${isDark ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-sky-50'}`}
                value={place}
                onChange={e => setPlace(e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className={`text-sm font-medium ${isDark ? 'text-sky-300' : ''}`}>説明</span>
              <textarea
                name="description"
                placeholder="説明を入力"
                rows={3}
                className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-colors ${isDark ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-sky-50'}`}
              />
            </label>
            <button
              type="submit"
              className={`absolute right-4 bottom-4 font-bold text-lg z-30 border-2 shadow-lg px-8 py-3 rounded-3xl transition-colors
                ${isDark ? 'bg-sky-400 hover:bg-sky-600 text-white border-slate-800' : 'bg-sky-500 hover:bg-sky-600 text-white border-white'}`}
              disabled={!place}
            >
              追加
            </button>
          </form>
        </Modal>
      )}

      {/* ノードクリック時の場所表示モーダル */}
      {selectedNode && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedNode(null)}
          contentLabel={selectedNode.data?.label as string}
        >
          <div className={`p-4 ${isDark ? 'bg-slate-800 text-slate-100' : ''}`}>
            <div className={`font-bold text-lg mb-2 ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>{selectedNode.data?.label as string}</div>
            <div className={isDark ? 'text-slate-400' : 'text-gray-700'}>説明: （未実装）</div>
          </div>
        </Modal>
      )}

      {/* エッジクリック時のエッジ情報表示モーダル */}
      {selectedEdge && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedEdge(null)}
          contentLabel={selectedEdge.id}
        >
          <div className={`p-4 ${isDark ? 'bg-slate-800 text-slate-100' : ''}`}>
            <div className={`font-bold mb-2 ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>エッジ情報</div>
            <div className="mb-1">ID: <span className="font-mono text-xs">{selectedEdge.id}</span></div>
            <div>Source: <span className="font-mono text-xs">{selectedEdge.source}</span></div>
            <div>Target: <span className="font-mono text-xs">{selectedEdge.target}</span></div>
          </div>
        </Modal>
      )}
    </div>
  );
}
