window.onload = function() {
    let gameStats = {
        player: false,
        playerOne: '',
        playerTwo: '',
        lastWinner: Math.floor(Math.random() * 2) ? true : false,
        totalChecked: 0,
        draws: 0,
        playerOneWins: 0,
        playerTwoWins: 0
    }

    init()

    document.getElementById('app').addEventListener('click', function(e) {
        handleCellClick(e)
    })

    startPreGame()
    updateGameBar()
    handlePlayerSelection()

    function init() {
        document.getElementById('app').innerHTML = ''
        for (let i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.className = 'cell'
            div.textContent = ''
            div.id = 'cell_num_' + i
            document.getElementById('app').appendChild(div)
        }
    }

    function startPreGame() {
        let playerOne = 'Nick' //window.prompt('Enter play one\'s name')
        let playerTwo = 'Donny' //window.prompt('Enter play two\'s name')
        gameStats.playerOne = playerOne
        gameStats.playerTwo = playerTwo
    }

    function updateTurnBar() {
        color = getPlayerColor()
        player = getPlayer()
        document.getElementById('turnBar').textContent = player + "'s turn!"
        document.getElementById('turnBar').style.color = color
    }

    function updateGameBar() {
        document.getElementById('gameBar').textContent = `${gameStats.draws} Draws : ${gameStats.playerOneWins} ${gameStats.playerOne} Wins : ${gameStats.playerTwoWins} ${gameStats.playerTwo} Wins`
    }

    function getPlayerColor() {
        if (gameStats.player) {
            return 'red'
        } else {
            return 'black'
        }        
    }

    function getPlayer() {
        if (gameStats.player) {
            return gameStats.playerTwo
        } else {
            return gameStats.playerOne
        }        
    }

    function handlePlayerSelection() {
        let startingPlayer = null
        if (gameStats.lastWinner === true) {
            startingPlayer = gameStats.playerTwo
            gameStats.player = true
        } else {
            startingPlayer = gameStats.playerOne
            gameStats.player = false
        }
        color = getPlayerColor()
        updateTurnBar(startingPlayer, color)
    }

    function handleEnd(draw, winner, winnerFlag) {
        gameStats.totalChecked = 0
        if (!draw) {
            if (winner === gameStats.playerTwo) {
                gameStats.playerTwoWins++
            } else {
                gameStats.playerOneWins++
            }
            updateGameBar()
            handleWin(winner, winnerFlag)
        } else {
            gameStats.draws++
            updateGameBar()
            handleDraw()
        }
        init()
        handlePlayerSelection()
    }

    function handleWin(winner, winnerFlag) {
        alert(winner + ' won!')
        gameStats.lastWinner = winnerFlag
    }

    function handleDraw() {
        alert('Draw!')
    }

    function handleCellClick(e) {
        if (e.target.textContent === 'X') {
            return
        }

        let color = getPlayerColor()
        e.target.style.color = color
        e.target.textContent = 'X'

        switchPlayer()
        getWinData()
    }

    function checkTotalPlays() {
        gameStats.totalChecked++
        if (gameStats.totalChecked === 9) {
            handleEnd(true)
        }
    }

    function switchPlayer() {
        gameStats.player = !gameStats.player
        color = getPlayerColor()
        player = getPlayer()
        updateTurnBar(player, color)
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
                    player: cell.style.color === 'red'
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
        let newData = [
            new Array(3),
            new Array(3)
        ]
        newData[0][0] = data[0][0]
        newData[0][1] = data[1][1]
        newData[0][2] = data[2][2]

        newData[1][0] = data[2][0]
        newData[1][1] = data[1][1]
        newData[1][2] = data[0][2]

        return checkForRowsWins(newData)
    }

    function checkAllRowsColumnsAndDiagonals(data) {
        let state = checkForRowsWins(data)
        if (state === null) {
            state = checkForColumnWins(data)
            if (state === null) {
                state = checkForDiagonalWins(data)
            }
        }
        return state
    }

    function getWinData() {
        let gameData = sendCellData()
        let state = checkAllRowsColumnsAndDiagonals(gameData)
        if (state !== null) {
            if (state.player === true) {
                setTimeout(function() {
                    handleEnd(false, gameStats.playerTwo, true)
                }, 50)
            } else {
                setTimeout(function() {
                    handleEnd(false, gameStats.playerOne, false)
                }, 50)
            }
        } else {
            checkTotalPlays()
        }
    }
}

