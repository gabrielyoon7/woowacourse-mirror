/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import { LOTTO } from "../src/constants";
import Lotto from "../src/domain/Lotto";
import LottoController from "../src/domain/LottoController";
import InputValidator from "../src/domain/InputValidator";
test('숫자 6개를 받아 로또를 발행한다.', () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(numbers);
  expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
});

test('로또 갯수는 6개다.', () => {
  const lotto = [1, 2, 3, 4, 5];
  expect(() => InputValidator.checkArrayLength(lotto, LOTTO.length)).toThrow();
});

test('로또 구입 금액은 자연수이다.', () => {
  const a = '1.5';
  expect(() => InputValidator.checkNaturalNumber(a)).toThrow();
});

test('1000원 단위로 나뉘는지 검사', () => {
  const money = 14100;
  expect(() => InputValidator.checkFallApart(money, LOTTO.price)).toThrow();
});

test('로또 번호는 1~45의 자연수', () => {
  const number = '0';
  expect(() => InputValidator.checkLottoNumber(number)).toThrow();
});

test('각 번호는 중복되지 않는 수', () => {
  const numbers = [1, 2, 3, 4, 5, 5];
  expect(() => InputValidator.checkDuplicatedNumbers(numbers)).toThrow();
});

test('입력값이 y 혹은 n 만 가능하다.', () => {
  const command = 's';
  expect(() => InputValidator.checkRetryCommand(command)).toThrow();
});

test('로또 결과 계산', () => {
  const numbers = ['1', '2', '3', '4', '5', '6'];
  const lotto = new Lotto(numbers);
  const winningNumber = ['1', '2', '3', '4', '5', '7'];
  const bonusNumber = '6';
  expect(lotto.calculateRanking({ main: winningNumber, bonus: bonusNumber })).toEqual(2);
});


test('수익률 계산', () => {
  const money = 8000;
  const rank = [0, 0, 0, 0, 1];
  const lottoController = new LottoController();
  expect(lottoController.calculateBenefit(money, rank)).toBe(62.5);
});
