import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
            });
        }

        const {chatId, name} = await req.json();

// connect to the database nd update the chat name
        await Chat.findOneAndUpdate({_id: chatId, userId}, {name});

        return NextResponse.json({success: true, message: "Chat Renamed"})

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}