// 分数object提取本地存储的数据
const score = JSON.parse(localStorage.getItem('Score')) 
||    //简写
{
  wins: 0,
  losses: 0,
  ties: 0
};
updateScoreElement();

let isAutoPlay = false;
let intervalId; 

// const autoPlay = () =>{
// };

function autoPlay(){
  if(!isAutoPlay){
    intervalId = setInterval(() => {
      let playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlay = true;
    //12t
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  }else{
    clearInterval(intervalId); //清除setInterval()返回的ID
    isAutoPlay = false;
    //12t
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  } 
}

//使用事件监听器代替onclick
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});
//12s
document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
})
//12v
document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  //显示提示
  document.querySelector('.js-p-hint').classList.remove('p-hint');
})

//确定重置分数
document.querySelector('.yes-button').addEventListener('click', () => {
  resetScore();
  document.querySelector('.js-p-hint').classList.add('p-hint');
})
//取消重置分数
document.querySelector('.no-button').addEventListener('click', () => {
  document.querySelector('.js-p-hint').classList.add('p-hint');
})

//监听键盘
document.body.addEventListener('keydown', () => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }else if(event.key === 'a'){  //12u
    autoPlay();
  }else if(event.key === 'Backspace'){
    //显示提示
    document.querySelector('.js-p-hint').classList.remove('p-hint');
  }
})

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  // 清除本地存储数据
  localStorage.removeItem('Score');
  updateScoreElement();
}

function playGame(playerMove){
  let computerMove = pickComputerMove();
  let result = '';

  if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
    result = 'You lose.';
    }else if(computerMove === 'paper'){
      result = 'You win.'
    }else if(computerMove === 'scissors'){
      result = 'Tie.'
    }
  }else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You win.';
    }else if(computerMove === 'paper'){
      result = 'Tie.'
    }else if(computerMove === 'scissors'){
      result = 'You lose.'
    }
  }else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie.';
    }else if(computerMove === 'paper'){
      result = 'You lose.'
    }else if(computerMove === 'scissors'){
      result = 'You win.'
    }
  }

  // 分数更新
  if(result === 'You win.'){
    score.wins ++;
  }else if (result === 'You lose.'){
    score.losses ++;
  }else if(result === 'Tie.'){
    score.ties ++;
  }

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
  <img class="move-icon" src="../images/${playerMove}-emoji.png" alt="">- - -
  <img class="move-icon" src="../images/${computerMove}-emoji.png" alt="">
  Computer`;

  // 分数本地储存(将scoreJson存储到字符串)
  localStorage.setItem('Score', JSON.stringify(score));
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `
  Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
  // 0-1随机数
  const randomNumber = Math.random();

  if(randomNumber >= 0 && randomNumber < 1/3){
    return 'rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){
    return 'paper';
  }else{
    return 'scissors';
  }
}