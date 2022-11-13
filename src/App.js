const MissionUtils = require('@woowacourse/mission-utils');
const Lotto = require('./Lotto');
const TICKET = require('./CONSTANT');

class App {
  #answerNumbers;

  #bonusNumber;

  #tickets = [];

  play() {
    this.inputMoney();
  }

  inputMoney() {
    MissionUtils.Console.readLine('구입금액을 입력해 주세요.\n', (answer) => {
      if (this.validateMoney(answer)) {
        const ticketsCount = this.countTickets(answer);
        MissionUtils.Console.print(`\n${ticketsCount}개를 구매했습니다.`);
        for (let i = 0; i < ticketsCount; i += 1) {
          this.#tickets.push(new Lotto(this.generateRandomNumbers()));
        }
        this.#tickets.map((ticket) => MissionUtils.Console.print(ticket.getTicketNumbers()));
        this.setLottoNumbers();
      }
    });
  }

  validateMoney(answer) {
    const money = Number(answer);
    if (Number.isNaN(money)) {
      throw Error('[ERROR] 숫자여야 합니다.');
    }
    if (money % TICKET.price !== 0) {
      throw Error('[ERROR] 1,000원 단위로 입력하세요');
    }
    return true;
  }

  countTickets(answer) {
    return answer / TICKET.price;
  }

  generateRandomNumbers() {
    return MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6); // [1, 10, 7, 8, 5, 3]
  }

  setLottoNumbers() {
    MissionUtils.Console.readLine('\n당첨 번호를 입력해 주세요.\n', (answer) => {
      this.#answerNumbers = answer.split(',').map((i) => Number(i));
      this.setBonusNumber();
    });
  }

  setBonusNumber() {
    MissionUtils.Console.readLine('\n보너스 번호를 입력해 주세요.\n', (answer) => {
      this.#bonusNumber = Number(answer);
      this.calculateTickets();
    });
  }

  calculateTickets() {
    MissionUtils.Console.print('\n당첨 통계\n---');
    this.#tickets.map((ticket) => ticket.calculateNumbers(this.#answerNumbers, this.#bonusNumber));
  }
}

module.exports = App;
