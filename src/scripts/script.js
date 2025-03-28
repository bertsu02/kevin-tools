(function() {
  const wheel = document.querySelector('.wheel');
  const startButton = document.querySelector('.button');
  const messageContainer = document.querySelector('.message-container');
  const latestRollsContainer = document.getElementById('latest-rolls-container');
  let deg = 0;

  startButton.addEventListener('click', () => {
    startButton.style.pointerEvents = 'none';
    deg = Math.floor(1000 + Math.random() * 1000);
    wheel.style.transition = 'all 5s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.classList.add('blur');
  });

  wheel.addEventListener('transitionend', () => {
    wheel.classList.remove('blur');
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none';
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;

    const area = determineArea(actualDeg);
    displayMessage(area);
    updateLatestRolls(area);
    displayLatestRolls();
  });

  function determineArea(deg) {
    const areas = [
      { name: 'Try Again', startDeg: 0, endDeg: 17.99 },
      { name: '10$ Depo DaddySkins', startDeg: 18, endDeg: 35.99 },
      { name: 'Try Again', startDeg: 36, endDeg: 53.99 },
      { name: '10$ Depo Shuffle', startDeg: 54, endDeg: 71.99 },
      { name: 'Try Again', startDeg: 72, endDeg: 90 },
      { name: 'Kevin Spin', startDeg: 90.01, endDeg: 107.99 },
      { name: 'Try Again', startDeg: 108.01, endDeg: 125.99 },
      { name: '50 Battle Rain 30%', startDeg: 126.01, endDeg: 143.99 },
      { name: 'Try Again', startDeg: 144.01, endDeg: 161.99 },
      { name: '10$ Depo Big', startDeg: 162.01, endDeg: 179.99 },
      { name: 'Try Again', startDeg: 180.01, endDeg: 197.99 },
      { name: '10$ Depo Big', startDeg: 198.01, endDeg: 215.99 },
      { name: 'Try Again', startDeg: 216.01, endDeg: 233.99 },
      { name: '20$ Buy, Keep Half ', startDeg: 234.01, endDeg: 251.99 },
      { name: 'Try Again', startDeg: 252.01, endDeg: 269.99 },
      { name: 'Kevin Spin', startDeg: 270.01, endDeg: 287.99 },
      { name: 'Try Again', startDeg: 288.01, endDeg: 305.99 },
      { name: '30 Battle Big 50%', startDeg: 306.01, endDeg: 323.99 },
      { name: 'Try Again', startDeg: 324.01, endDeg: 341.99 },
      { name: '50 Battle Big 30%', startDeg: 342.01, endDeg: 359.99 },
    ];

    for (const area of areas) {
      if (deg >= area.startDeg && deg < area.endDeg) {
        return area.name;
      }
    }

    return 'Dead center, RE-SPIN!';
  }

  function displayMessage(area) {
    if (area === 'Kevin Spin') {
      const proceedButton = document.createElement('button');
      messageContainer.innerText = `You have won a Kevin Spin!`;
      messageContainer.style.display = 'block';
      proceedButton.innerText = 'Proceed';
      proceedButton.onclick = function() {
        window.location.href = '/src/kevin-spin.html';
      };
      messageContainer.appendChild(document.createElement('br'));
      messageContainer.appendChild(proceedButton);
    } else {
      messageContainer.innerText = `${area}`;
      messageContainer.style.display = 'block';
      setTimeout(() => {
        messageContainer.style.display = 'none';
      }, 3000);
    }
  }

  let latestRolls = JSON.parse(localStorage.getItem('latestRolls')) || [];

  function updateLatestRolls(roll) {
    latestRolls.unshift(roll);

    if (latestRolls.length > 5) {
      latestRolls.pop();
    }
    localStorage.setItem('latestRolls', JSON.stringify(latestRolls));
    displayLatestRolls();
  }

  function displayLatestRolls() {
    latestRollsContainer.innerHTML = '';

    const ul = document.createElement('ul');

    latestRolls.forEach(roll => {
      const li = document.createElement('li');
      li.textContent = roll;
      ul.appendChild(li);
    });

    latestRollsContainer.appendChild(ul);
  }

  displayLatestRolls();
})();
