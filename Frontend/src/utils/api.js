const API_BASE_URL = 'https://backend-1-suhj.onrender.com' || "";

export async function apiFetch(url, options = {}) {
  const session = JSON.parse(localStorage.getItem("cc_session") || "null");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (session?.token) {
    headers["Authorization"] = `Bearer ${session.token}`;
  }

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers
  });
  
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  
  return res.json();
}
