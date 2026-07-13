type RankableSolution = {
  id: string;
  verificationLevel: string;
};

export function rankSolutionsByPractice<T extends RankableSolution>(
  solutions: T[],
  counts: Record<string, number>
) {
  return solutions
    .map((solution, originalIndex) => ({ solution, originalIndex }))
    .sort((left, right) => {
      const leftOfficial = left.solution.verificationLevel === "Official";
      const rightOfficial = right.solution.verificationLevel === "Official";

      if (leftOfficial !== rightOfficial) return leftOfficial ? -1 : 1;
      if (leftOfficial) return left.originalIndex - right.originalIndex;

      const countDifference = (counts[right.solution.id] ?? 0) - (counts[left.solution.id] ?? 0);
      return countDifference || left.originalIndex - right.originalIndex;
    })
    .map(({ solution }) => solution);
}
