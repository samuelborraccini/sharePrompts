import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    const search = req.nextUrl.searchParams.get("search");

    if (search) {
      const prompts = await Prompt.find({
        $or: [
          {
            prompt: { $regex: ".*" + search + ".*" },
            tag: { $regex: ".*" + search + ".*" },
          },
        ],
      }).populate("creator");
      return new Response(JSON.stringify(prompts), { status: 200 });
    } else {
      const prompts = await Prompt.find({}).populate("creator");

      return new Response(JSON.stringify(prompts), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 200 });
  }
};
