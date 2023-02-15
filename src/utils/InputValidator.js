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
  }
};

export default InputValidator;
