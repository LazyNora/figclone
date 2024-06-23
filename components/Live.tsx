import React, { useCallback, useState } from "react";
import LiveCursors from "./cursor/LiveCursors";
import { useMyPresence, useOthers } from "@/liveblocks.config";
import { CursorMode } from "@/types/type";
import CursorChat from "./cursor/CursorChat";

const Live = () => {
	const others = useOthers();
	const [{ cursor }, updateMyPresence] = useMyPresence() as any;
	const [cursorState, setCursorState] = useState({ mode: CursorMode.Hidden });

	const handlePointerMove = useCallback((e: React.PointerEvent) => {
		e.preventDefault();
		const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
		const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
		updateMyPresence({ cursor: { x, y } });
	}, []);

	const handlePointerLeave = useCallback((e: React.PointerEvent) => {
		setCursorState({ mode: CursorMode.Hidden });
		updateMyPresence({ cursor: null, message: null });
	}, []);

	const handlePointerDown = useCallback((e: React.PointerEvent) => {
		const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
		const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
		updateMyPresence({ cursor: { x, y } });
	}, []);

	return (
		<div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} onPointerDown={handlePointerDown} className="h-[100vh] w-full flex justify-center items-center text-center">
			<p className="text-9xl">abc</p>
			{cursor && <CursorChat cursor={cursor} cursorState={cursorState} setCursorState={setCursorState} updateMyPresence={updateMyPresence} />}
			<LiveCursors others={others} />
		</div>
	);
};

export default Live;
