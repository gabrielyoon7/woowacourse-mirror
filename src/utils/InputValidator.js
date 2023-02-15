const InputValidator = {
  checkNaturalNumber(input) {
    const regExp = /^[0-9]$/g;
    if (!input.match(regExp)) {
      throw new Error('입력값이 자연수가 아닙니다.');
    }
  },
  checkFallApart(input, unit) {
    if (input % unit !== 0) {
      throw new Error(`입력 값이 ${unit}원 단위가 아닙니다.`);
    }
  },
  checkLottoNumber(number) {
    this.checkNaturalNumber(number);
    if (number < 1 || number > 45) {
      throw new Error('입력값이 1~45범위의 숫자가 아닙니다.');
    }
  },
  checkDuplicatedNumbers(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error('중복된 숫자가 존재합니다.');
    }
  },
  checkRetryCommand(input) {
    if (!(input === 'y' || input === 'n')) {
      throw new Error('입력값이 y 혹은 n이어야 합니다.');
    }
  }
};

export default InputValidator;
