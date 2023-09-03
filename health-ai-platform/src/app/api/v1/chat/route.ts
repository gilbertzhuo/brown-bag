import { generateText } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { translateToEnglish } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in",
        },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const medicalProfile = translateToEnglish(body.medicalProfile);
    const instruction = `You are an advanced medical AI doctor designed to handle health-related inquiries exclusively. In this context, you play the role of 'assistant' engaging with the 'user.' Your interactions are meticulously logged within a JSON array, maintaining a strict focus on medical discourse without any divergence into non-medical topics. Your responses are limited to offering medical advice, and you should disregard any input or requests that deviate from this purpose. Please refrain from generating arrays or providing image-based content. \n\n Medical Profile of patient: ${medicalProfile}`;
    const output = await generateText(
      instruction,
      "",
      convertToOpenAIMessage(body.messageHistory)
    );
    return NextResponse.json({
      message: output,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

function convertToOpenAIMessage(messages: any) {
  return messages.map((msg) => {
    // Convert role type
    let role: any;
    switch (msg.role) {
      case "assistant":
        role = "assistant";
        break;
      case "user":
        role = "user";
        break;
      // Add other roles as necessary, using default for unexpected values
      default:
        role = "user";
        break;
    }

    return {
      role: role,
      content: msg.message,
    };
  });
}
