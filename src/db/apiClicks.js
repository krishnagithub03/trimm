import supabase from "./supabase";

export async function getClicksFromUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to Load Clicks");
  }

  return data;
}
