import '../../../css/modal.css';

const GameModal = (global) => {
  if (global.getStore('result')) {
    return `
<div>
  <div id="game-result-title">🏆 당첨 통계 🏆</div>
    <table id="game-result-content">
      <thead>
        <tr>
          <th>일치 갯수</th>
          <th>당첨금</th>
          <th>당첨 갯수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3개</td>
          <td>5,000</td>
          <td>${global.getStore('result')[4]}개</td>
        </tr>
        <tr>
          <td>4개</td>
          <td>50,000</td>
          <td>${global.getStore('result')[3]}개</td>
        </tr>
        <tr>
          <td>5개</td>
          <td>1,500,000</td>
          <td>${global.getStore('result')[2]}개</td>
        </tr>
        <tr>
          <td>5개+보너스볼</td>
          <td>30,000,000</td>
          <td>${global.getStore('result')[1]}개</td>
        </tr>
        <tr>
          <td>6개</td>
          <td>2,000,000,000</td>
          <td>${global.getStore('result')[0]}개</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <div id="game-result-calculate">
        당신의 총 수익률은 ${global.getStore('benefit')}%입니다.
      </div>
    </div>
    <button id="game-reload-button" class="width-100 btn lotto-primary lotto-greyscale-1" onclick="window.location.reload()">다시 시작하기</button>
  </div>
</div>
`;
  }
  return '';

};
export default GameModal;
