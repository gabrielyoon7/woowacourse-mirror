import { LOTTO } from "../constants";

export const judgeResult = (lottos, winningNumber) => {
  const rankingCount = Array(LOTTO.prize.length).fill(0);

  return lottos.reduce((acc, lotto) => {
    const ranking = lotto.calculateRanking(winningNumber);
    if (ranking) {
      acc[ranking - 1] += 1;
    }
    return acc;
  }, rankingCount);
};
