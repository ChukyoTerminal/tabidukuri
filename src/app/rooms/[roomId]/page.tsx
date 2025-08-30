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

  return (
    <div className="w-screen h-screen relative">
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
              <span className="text-sm font-medium">場所</span>
              <input
                type="text"
                name="place"
                placeholder="場所を入力"
                className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-sky-500"
                value={place}
                onChange={e => setPlace(e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">説明</span>
              <textarea
                name="description"
                placeholder="説明を入力"
                rows={3}
                className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-sky-500"
              />
            </label>
            <button
              type="submit"
              className="absolute right-4 bottom-4 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl shadow-lg px-6 py-3 font-bold text-lg z-30"
              disabled={!place}
            >
              追加
            </button>
          </form>
        </Modal>
      )}
      <header className="fixed top-0 left-0 w-full p-4 bg-sky-500 shadow-md z-10">
        <h1>{room?.name}</h1>
      </header>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node)}
        onEdgeClick={(_, edge) => setSelectedEdge(edge)}
        fitView
        className="bg-background text-black"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
      <button
        type="button"
        aria-label="ノード追加"
        onClick={() => setIsNodeModalOpen((pre) => !pre)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center z-20"
      >
        <Plus size={32} className={isNodeModalOpen ? 'transition-transform rotate-45' : 'transition-transform'} />
      </button>

      {/* ノードクリック時の場所表示モーダル */}
      {selectedNode && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedNode(null)}
          contentLabel={selectedNode.data?.label as string}
        >
          <div>
            {/* ノード情報 */}
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
          <div>
            <div className="font-bold mb-2">エッジ情報</div>
            <div>ID: {selectedEdge.id}</div>
            <div>Source: {selectedEdge.source}</div>
            <div>Target: {selectedEdge.target}</div>
          </div>
        </Modal>
      )}
    </div>
  );
}
