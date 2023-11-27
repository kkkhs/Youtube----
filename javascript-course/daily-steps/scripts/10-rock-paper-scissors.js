// 分数object提取本地存储的数据
const score = JSON.parse(localStorage.getItem('Score')) 
||    //简写
{
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function playGame(playerMove){
  console.log(pickComputerMove());
  let result = '';

  if(playerMove === 'Scissors'){
    if(computerMove === 'rock'){
    result = 'You lose.';
    }else if(computerMove === 'paper'){
      result = 'You win.'
    }else if(computerMove === 'scissors'){
      result = 'Tie.'
    }
  }else if(playerMove === 'Paper'){
    if(computerMove === 'rock'){
      result = 'You win.';
    }else if(computerMove === 'paper'){
      result = 'Tie.'
    }else if(computerMove === 'scissors'){
      result = 'You lose.'
    }
  }else if(playerMove === 'Rock'){
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

  // 分数本地储存(将scoreJson存储到字符串)
  localStorage.setItem('Score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
  <img class="move-icon" src="../images/${playerMove}-emoji.png" alt="">- - -
  <img class="move-icon" src="../images/${computerMove}-emoji.png" alt="">
  Computer`;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `
  Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let computerMove = '';
function pickComputerMove(){
  // 0-1随机数
  const randomNumber = Math.random();

  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }else{
    computerMove = 'scissors';
  }
  console.log(computerMove);

  // return
  return computerMove;

  console.log("after");
}