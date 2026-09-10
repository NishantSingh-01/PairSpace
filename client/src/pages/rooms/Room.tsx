import {
    Braces,
    LogOut,
    Plus,
    DoorOpen,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Room = {
    id: string;
    inviteCode: string;
    name: string;
    members?: Array<{ id: string }>;
};

export default function Rooms() {
    const navigate = useNavigate();

    const rooms: Room[] = [];

    return (
        <div className="min-h-screen w-full bg-[#070707f7] text-white">


            <header className="h-17 border-b-2 border-zinc-900 flex items-center justify-between px-8">


                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-400 flex items-center justify-center">
                        <Braces className="h-5 w-5 text-black" />
                    </div>

                    <span className="text-white font-bold text-lg">
                        PairSpace
                    </span>
                </div>


                <div className="flex items-center gap-5">

                    <div className="w-8 h-8 rounded-full bg-teal-400 hover:bg-teal-300 flex items-center justify-center">
                        <span className="text-black text-xs font-bold">
                            NS
                        </span>
                    </div>

                    <button
                        onClick={() => {
                            // logout logic here
                        }}
                        className="text-zinc-500 hover:text-white transition-colors"
                        aria-label="Logout"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>

                </div>
            </header>


            <main className="px-8 py-8">


                <div className="flex items-start justify-between mb-7">

                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Your rooms
                        </h1>

                        <p className="text-sm text-zinc-500 mt-1">
                            Workspaces you're a member of
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => navigate("/join-room")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg
                            border border-zinc-800
                            text-zinc-300 text-sm font-medium
                            hover:bg-zinc-900 hover:text-white
                            transition-colors"
                        >
                            <DoorOpen className="h-4 w-4" />
                            Join room
                        </button>

                        <button
                            onClick={() => navigate("/create-room")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg
                            bg-teal-400 hover:bg-teal-300
                            text-black text-sm font-bold
                            transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            New room
                        </button>

                    </div>
                </div>


                {rooms.length === 0 ? (
                    <div className="min-h-[270px] border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center">

                        <div className="text-center">


                            <div className="mx-auto w-11 h-11 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center mb-5">
                                <Braces className="h-5 w-5 text-teal-400" />
                            </div>

                            <h2 className="text-base font-bold text-white">
                                No rooms yet
                            </h2>

                            <p className="text-sm text-zinc-500 mt-2 max-w-md">
                                Create a room or join one with an invite code
                                to start collaborating.
                            </p>

                            {/* Empty state buttons */}
                            <div className="flex items-center justify-center gap-3 mt-5">

                                <button
                                    onClick={() => navigate("/join-room")}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                                    border border-zinc-800
                                    text-zinc-300 text-sm font-medium
                                    hover:bg-zinc-900 hover:text-white
                                    transition-colors"
                                >
                                    <DoorOpen className="h-4 w-4" />
                                    Join room
                                </button>

                                <button
                                    onClick={() => navigate("/create-room")}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                                    bg-teal-400 hover:bg-teal-300
                                    text-black text-sm font-bold
                                    transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    New room
                                </button>

                            </div>

                        </div>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {rooms.map((room) => (
                            <div
                                key={room.id}
                                className="bg-zinc-950 border border-zinc-800 rounded-xl p-5
                                hover:border-zinc-700 transition-colors"
                            >

                                <div className="flex items-start justify-between">

                                    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                                        <Braces className="h-5 w-5 text-cyan-400" />
                                    </div>

                                    <span className="text-xs text-zinc-500">
                                        {room.inviteCode}
                                    </span>

                                </div>

                                <h3 className="text-white font-semibold mt-4">
                                    {room.name}
                                </h3>

                                <div className="flex items-center gap-2 mt-2 text-zinc-500 text-sm">
                                    <Users className="h-4 w-4" />
                                    <span>
                                        {room.members?.length || 0} members
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        navigate(`/room/${room.id}`)
                                    }
                                    className="w-full mt-5 py-2 rounded-lg
                                    border border-zinc-800
                                    text-zinc-300 text-sm font-medium
                                    hover:bg-zinc-900 hover:text-white
                                    transition-colors"
                                >
                                    Open room
                                </button>

                            </div>
                        ))}

                    </div>
                )}

            </main>
        </div>
    );
}