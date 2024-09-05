import supabase from "./supabase";
import { supabaseUrl } from "@/db/supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  // console.log("user_id : ", data);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to Load URLs");
  }

  return data;
}

export async function deleteUrls(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to Delete URLs");
  }

  return data;
}

export async function createUrls(
  { title, longUrl, customUrl, user_id },
  qrCode
) {
  const short_url = Math.random().toString(36).substring(2, 8);

  const fileName = `qr-${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrCode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        short_url,
        custom_url: customUrl || null,
        qr,
        user_id,
      },
    ])
    .select();

  if (error) {
    console.log(error.message);
    throw new Error("Unable to Create URL");
  }

  return data;
}
