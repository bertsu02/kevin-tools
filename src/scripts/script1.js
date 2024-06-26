(function() {
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.button');
    const messageContainer = document.querySelector('message-container');
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
    });
     function determineArea(deg) {
      const areas = [
    { name: 'Try Again', startDeg: 0, endDeg: 22.49 },
    { name: '10$ TIP', startDeg: 22.5, endDeg: 45 },
    { name: '20$ Bonus Buy 50/50', startDeg: 45.01, endDeg: 67.49 },
    { name: '50 $1 Spins', startDeg: 67.5, endDeg: 90 },
    { name: 'Try Again', startDeg: 90.01, endDeg: 112.49 },
    { name: '20 $5 Spins', startDeg: 112.5, endDeg: 135 },
    { name: '$100 Buy, 100x = Tip', startDeg: 135.01, endDeg: 157.49 },
    { name: '$60 Buy, 100x = Tip', startDeg: 157.5, endDeg: 180 },
    { name: 'Try Again', startDeg: 180.01, endDeg: 202.49 },
    { name: '25 $3 Spins', startDeg: 202.5, endDeg: 225 },
    { name: '20$ Bonus Buy 50/50', startDeg: 225.01, endDeg: 247.49 },
    { name: '25 2.5$ Spins', startDeg: 247.5, endDeg: 270 },
    { name: 'Try Again', startDeg: 270.01, endDeg: 292.49 },
    { name: '25 $3.5 Spins', startDeg: 292.5, endDeg: 315 },
    { name: '5$ Tip', startDeg: 315.01, endDeg: 337.49 },
    { name: '25 2.5$ Spins', startDeg: 337.5, endDeg: 360 },
  
      ];
  
      for (const area of areas) {
        if (deg >= area.startDeg && deg < area.endDeg) {
          return area.name;
        }
      }
  
      return 'Dead Center - RESPIN';
    }
  
    function displayMessage(area) {
      const messageContainer = document.getElementById('message-container');
      messageContainer.innerText = `${area}`;
      messageContainer.style.display = 'block';
      setTimeout(() => {
        messageContainer.style.display = 'none';
      }, 3000);
    }
  })();