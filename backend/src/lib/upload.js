import { createClient } from "@supabase/supabase-js";
import path from "path";
import "dotenv/config";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const uploadFile = async (file) => {
  try {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const fileName = `${Date.now()}${fileExt}`;
    const filePath = `books/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("books") // bucket name
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("books").getPublicUrl(filePath);
    return data.publicUrl; // return just the public URL
  } catch (err) {
    console.error("Upload failed:", err.message);
    throw err;
  }
};
