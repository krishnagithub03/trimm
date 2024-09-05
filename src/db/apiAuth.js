import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// export async function loginWithGoogle() {
//   const { user, session, error } = await supabase.auth.signIn({
//     provider: "google",
//   });

//   if (error) throw new Error(error.message);

//   return { user, session };
// }

export async function getCurrUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;
  if (error) throw new Error(error.message);

  return session.session?.user;
}

export async function signup({ email, password, name, profile_pic }) {
  const fileName = `userDp-${name.split(".").join("-")}-${Math.floor(
    Math.random() * 1000
  )}`;
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
