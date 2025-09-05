import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const uploadFile = async (dataUrl) => {
  try {
    // Data URL format: data:image/jpeg;base64,ABC...
    const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) throw new Error("Invalid image data URL");

    const imageType = matches[1]; // e.g., image/jpeg
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    const fileExt = imageType.split("/")[1]; // e.g., jpeg
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `books/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("book")
      .upload(filePath, buffer, {
        contentType: imageType,
        upsert: true,
      });

    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from("book").getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error("Upload failed:", err.message);
    throw err;
  }
};
