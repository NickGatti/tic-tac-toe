window.onload = function() {
    let gameStats = {
        player: false
    }

    init()

    startGame()

    function init() {
        for (let i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.className = 'cell'
            div.onclick = handleCellClick
            div.textContent = ''
            div.id = 'cell_num_' + i
            document.getElementById('app').appendChild(div)
        }
    }

    function startGame() {
        let playerOne = 'Nick'//window.prompt('Enter play one\'s name')
        let playerTwo = 'Donny'//window.prompt('Enter play two\'s name')
    }

    function handleCellClick(e) {
        if (e.target.textContent === 'X') {
            return
        }
        if (gameStats.player) {
            e.target.style.color = 'red'
        } else {
            e.target.style.color = 'black'
        }
        e.target.textContent = 'X'
        gameStats.player = !gameStats.player
    }
}

