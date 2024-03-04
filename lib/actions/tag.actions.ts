"use server";

import User from "@/database/user.model";
import { GetTopInteractedTagsParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tags...
    // Interaction...

    return [
      { name: "Tag1", id: 1 },
      { name: "Tag2", id: 2 },
      { name: "Tag3", id: 3 },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
