import { UAParser } from "ua-parser-js";
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

const parser = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      device: device,
      city: city,
      country: country,
    });
    window.location.href = originalUrl;
  } catch (error) {
    console.log(error);
  }
};
