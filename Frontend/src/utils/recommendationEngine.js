// Score each career against a user's assessment answers.
// answers: { qualification, stream, skills[], interests[], personality[] }
export function recommendCareers(answers, careers, limit = 6) {
  if (!answers) return [];
  const scored = careers.map((c) => {
    let score = 0;
    const reasons = [];

    // Qualification match
    if (answers.qualification && c.qualifications?.some((q) =>
      q.toLowerCase().includes(answers.qualification.toLowerCase()) ||
      answers.qualification.toLowerCase().includes(q.toLowerCase())
    )) {
      score += 15;
      reasons.push("Matches your qualification");
    }

    // Stream match
    if (answers.stream && c.streams?.some((s) =>
      s.toLowerCase() === answers.stream.toLowerCase()
    )) {
      score += 10;
      reasons.push(`Aligned with ${answers.stream} stream`);
    }

    // Skills overlap
    const skillOverlap = (answers.skills || []).filter((s) =>
      (c.skills || []).map((x) => x.toLowerCase()).includes(s.toLowerCase())
    );
    score += skillOverlap.length * 8;
    if (skillOverlap.length) reasons.push(`${skillOverlap.length} matching skills`);

    // Interests overlap
    const interestOverlap = (answers.interests || []).filter((i) =>
      (c.interests || []).map((x) => x.toLowerCase()).includes(i.toLowerCase())
    );
    score += interestOverlap.length * 10;
    if (interestOverlap.length) reasons.push(`${interestOverlap.length} matching interests`);

    // Personality overlap
    const personalityOverlap = (answers.personality || []).filter((p) =>
      (c.personality || []).map((x) => x.toLowerCase()).includes(p.toLowerCase())
    );
    score += personalityOverlap.length * 7;

    const maxPossible = 15 + 10 + (answers.skills?.length || 0) * 8 +
      (answers.interests?.length || 0) * 10 + (answers.personality?.length || 0) * 7;
    const matchPercent = maxPossible > 0
      ? Math.min(100, Math.round((score / maxPossible) * 100))
      : 0;

    return { career: c, score, matchPercent, reasons };
  });

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
