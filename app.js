window.onload = function() {
    let gameStats = {
        player: false,
        playerOne: '',
        playerTwo: ''
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
        gameStats.playerOne = playerOne
        gameStats.playerTwo = playerTwo
        document.getElementById('gameBar').textContent = playerOne + "'s turn!"
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
        let player = null
        let playerColor = null
        if (gameStats.player) {
            player = gameStats.playerTwo
            playerColor = 'red'
        } else {
            player = gameStats.playerOne
            playerColor = 'black'
        }
        document.getElementById('gameBar').textContent = player + "'s turn!"
        document.getElementById('gameBar').style.color = playerColor
        let gameData = sendCellData()
        
    }

    function sendCellData() {
        let output = []
        let inner = []
        for (let i = 0; i < 10; i++) {
            if (i % 3 === 0 && i > 0) {
                output.push(inner)
                inner = []
            }
            if (i < 9) {
                let id = 'cell_num_' + i
                let cell = document.getElementById(id)
                let data = {
                    text: cell.innerText === 'X',
                    player: cell.style.color === 'red' ? true : false
                }
                inner.push(data)
            }
        }
        return output
    }

    function checkForRowsWins(data) {

    }

    function checkForColumnWins(data) {

    }

    function checkForDiagonalWins(data) {

    }
}

