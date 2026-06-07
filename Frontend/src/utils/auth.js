import { apiFetch } from "./api.js";

const SESSION_KEY = "cc_session";

export async function signupUser({ name, email, password }) {
  const data = await apiFetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
  setSession(data.user, data.token);
  return data.user;
}

export async function loginUser({ email, password }) {
  const data = await apiFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  setSession(data.user, data.token);
  return data.user;
}

export async function logoutUser() {
  try {
    await apiFetch("/api/logout", { method: "POST" });
  } catch (err) {
    console.error("Logout request failed on server:", err);
  }
  localStorage.removeItem(SESSION_KEY);
}

export function setSession(user, token) {
  const sessionData = { ...user, token };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export async function updateUserProfile(userId, updates) {
  const updatedUser = await apiFetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(updates)
  });
  const currentSession = getSession();
  if (currentSession) {
    setSession(updatedUser, currentSession.token);
  }
  return updatedUser;
}
