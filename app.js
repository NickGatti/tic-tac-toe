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
        let state = checkForRowsWins(gameData)
        let state2 = checkForColumnWins(gameData)
        if (state !== null) {
            if (state.player === true) {
                alert(gameStats.playerTwo + ' won!')
            } else {
                alert(gameStats.playerOne + ' won!')
            }
        }
        if (state2 !== null) {
            if (state2.player === true) {
                alert(gameStats.playerTwo + ' won!')
            } else {
                alert(gameStats.playerOne + ' won!')
            }
        }
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
        let win = {
            player: null,
            checks: 1
        }
        for (let i = 0; i < data.length; i++) {
            for (let z = 0; z < data[i].length; z++) {
                let cell = data[i][z]
                if (cell.text === true) {
                    if (win.player === null) {
                        win.player = cell.player
                    } else if (win.player !== cell.player) {
                        break;
                    } else {
                        win.checks++
                    }
                }
            }
            if (win.checks === 3) {
                return win
            }
            win = {
                player: null,
                checks: 1
            }
        }
        return null
    }

    function checkForColumnWins(data) {
        let newData = [
            new Array(3),
            new Array(3),
            new Array(3)
        ]
        for (let i = 0; i < data.length; i++) {
            newData[i][0] = data[2][i]
            newData[i][1] = data[1][i]
            newData[i][2] = data[0][i]
        }        
        return checkForRowsWins(newData)
    }

    function checkForDiagonalWins(data) {

    }
}

