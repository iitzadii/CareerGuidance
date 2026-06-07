import { apiFetch } from "./api.js";

export async function getSavedCareers(userId) {
  return apiFetch("/api/saved-careers");
}

export async function toggleSavedCareer(userId, careerId) {
  return apiFetch("/api/saved-careers/toggle", {
    method: "POST",
    body: JSON.stringify({ careerId })
  });
}

export async function isCareerSaved(userId, careerId) {
  try {
    const saved = await getSavedCareers(userId);
    return saved.includes(careerId);
  } catch {
    return false;
  }
}

export async function saveAssessment(userId, assessment) {
  // assessment = { answers }
  return apiFetch("/api/assessment", {
    method: "POST",
    body: JSON.stringify(assessment)
  });
}

export async function getLatestAssessment(userId) {
  return apiFetch("/api/assessment/latest");
}

export async function getAssessmentHistory(userId) {
  return apiFetch("/api/assessment");
}

export async function logActivity(userId, activity) {
  // activity = { message }
  return apiFetch("/api/activity", {
    method: "POST",
    body: JSON.stringify(activity)
  });
}

export async function getActivity(userId) {
  return apiFetch("/api/activity");
}
