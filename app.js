window.onload = function() {
    let gameStats = {
        player: false,
        playerOne: '',
        playerTwo: '',
        lastWinner: Math.floor(Math.random() * 2) ? true : false,
        totalChecked: 0,
        draws: 0,
        playerOneWins: 0,
        playerTwoWins: 0,
        gameBoard: newGameBoard()
    }

    renderBoard()

    document.getElementById('app').addEventListener('click', function(e) {
        handleCellClick(e)
    })

    setPlayers()
    renderGameStatsBar()
    handlePlayerSelection()

    function newGameBoard() {
        return [
            [{text: false, player: false},{text: false, player: false},{text: false, player: false}],
            [{text: false, player: false},{text: false, player: false},{text: false, player: false}],
            [{text: false, player: false},{text: false, player: false},{text: false, player: false}]
        ]
    }

    function renderBoard() {
        document.getElementById('app').innerHTML = ''
        let count = 0
        for (let i = 0; i < gameStats.gameBoard.length; i++) {
            for (let z = 0; z < gameStats.gameBoard.length; z++) {
                let div = document.createElement("div");
                div.className = 'cell'
                if (gameStats.gameBoard[i][z].text) {
                    div.textContent = 'X'
                } else {
                    div.textContent = ''
                }
                if (gameStats.gameBoard[i][z].player) {
                    div.style.color = 'red'
                } else {
                    div.style.color = ' black'
                }
                div.id = 'cell_num_' + count
                count++
                document.getElementById('app').appendChild(div)
            }
        }
    }

    function setBoard(x, y) {
        gameStats.gameBoard[x][y].text = true
        gameStats.gameBoard[x][y].player = gameStats.player
        renderBoard()
    }

    function setPlayers() {
        let playerOne = 'Nick' //window.prompt('Enter play one\'s name')
        let playerTwo = 'Donny' //window.prompt('Enter play two\'s name')
        gameStats.playerOne = playerOne
        gameStats.playerTwo = playerTwo
    }

    function renderPlayerTurnBar() {
        color = getPlayerColor()
        player = getPlayerName()
        document.getElementById('turnBar').textContent = player + "'s turn!"
        document.getElementById('turnBar').style.color = color
    }

    function renderGameStatsBar() {
        document.getElementById('gameBar').textContent = `${gameStats.draws} Draws : ${gameStats.playerOneWins} ${gameStats.playerOne} Wins : ${gameStats.playerTwoWins} ${gameStats.playerTwo} Wins`
    }

    function getPlayerColor() {
        if (gameStats.player) {
            return 'red'
        } else {
            return 'black'
        }        
    }

    function getPlayerName() {
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
        renderPlayerTurnBar(startingPlayer, color)
    }

    function handleGameEnd(draw, winner, winnerFlag) {
        gameStats.totalChecked = 0
        if (!draw) {
            if (winner === gameStats.playerTwo) {
                gameStats.playerTwoWins++
            } else {
                gameStats.playerOneWins++
            }
            renderGameStatsBar()
            handleGameWin(winner, winnerFlag)
        } else {
            gameStats.draws++
            renderGameStatsBar()
            handleGameDraw()
        }
        gameStats.gameBoard = newGameBoard()
        renderBoard()
        handlePlayerSelection()
    }

    function handleGameWin(winner, winnerFlag) {
        alert(winner + ' won!')
        gameStats.lastWinner = winnerFlag
    }

    function handleGameDraw() {
        alert('Draw!')
    }

    function getEventTargetCoordinates(e) {
        let cellNum = e.target.id.replace('cell_num_', '')
        let x = Math.floor(cellNum / 3)
        let y = cellNum % 3
        return [x, y]
    }

    function handleCellClick(e) {
        let [x, y] = getEventTargetCoordinates(e)
        if (gameStats.gameBoard[x][y].text) {
            return
        } else {
            setBoard(x, y)
            handleSwitchPlayer()
            getWinData()
        }
    }

    function handleTotalPlays() {
        gameStats.totalChecked++
        if (gameStats.totalChecked === 9) {
            handleGameEnd(true)
        }
    }

    function handleSwitchPlayer() {
        gameStats.player = !gameStats.player
        color = getPlayerColor()
        player = getPlayerName()
        renderPlayerTurnBar(player, color)
    }

    function handleRowsWins(data) {
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

    function handleColumnWins(data) {
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
        return handleRowsWins(newData)
    }

    function handleDiagonalWins(data) {
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

        return handleRowsWins(newData)
    }

    function handleAllRowsColumnsAndDiagonals(data) {
        let state = handleRowsWins(data)
        if (state === null) {
            state = handleColumnWins(data)
            if (state === null) {
                state = handleDiagonalWins(data)
            }
        }
        return state
    }

    function getWinData() {
        let gameData = gameStats.gameBoard
        let state = handleAllRowsColumnsAndDiagonals(gameData)
        if (state !== null) {
            if (state.player === true) {
                setTimeout(function() {
                    handleGameEnd(false, gameStats.playerTwo, true)
                }, 50)
            } else {
                setTimeout(function() {
                    handleGameEnd(false, gameStats.playerOne, false)
                }, 50)
            }
        } else {
            handleTotalPlays()
        }
    }
}

