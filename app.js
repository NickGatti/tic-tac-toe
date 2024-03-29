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

    init()

    function init() {
        document.getElementById('app').addEventListener('click', function(e) {
            handleCellClick(e)
        })
    
        renderBoard()
        setPlayers()
        renderGameStatsBar()
        handlePlayerSelection()
    }

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

    function renderPlayerTurnBar() {
        let color = getPlayerColor()
        let player = getPlayerName()
        document.getElementById('turnBar').textContent = player + "'s turn!"
        document.getElementById('turnBar').style.color = color
    }

    function renderGameStatsBar() {
        let draws = getDraws()
        let playerOneWins = getPlayerOneWins()
        let playerOne = getPlayerNameByPlayer(false)
        let playerTwoWins = getPlayerTwoWins()
        let playerTwo = getPlayerNameByPlayer(true)
        let text =  `${draws} Draws :` +
                    `${playerOneWins} ${playerOne} Wins : `+
                    `${playerTwoWins} ${playerTwo} Wins`
        document.getElementById('gameBar').textContent = text
    }

    function getPlayerTwoWins() {
        return gameStats.playerTwoWins
    }

    function getPlayerOneWins() {
        return gameStats.playerOneWins
    }

    function getDraws() {
        return gameStats.draws
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

    function getEventTargetCoordinates(e) {
        let cellNum = e.target.id.replace('cell_num_', '')
        let x = Math.floor(cellNum / 3)
        let y = cellNum % 3
        return [x, y]
    }

    function getAllRowsColumnsAndDiagonals(data) {
        let state = getRowsWins(data)
        if (state === null) {
            state = getColumnWins(data)
            if (state === null) {
                state = getDiagonalWins(data)
            }
        }
        return state
    }

    function getRowsWins(data) {
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

    function getColumnWins(data) {
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
        return getRowsWins(newData)
    }

    function getDiagonalWins(data) {
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

        return getRowsWins(newData)
    }

    function getLastWinner() {
        return gameStats.lastWinner
    }

    function getDivAtCoordinates(x, y) {
        return gameStats.gameBoard[x][y]
    }

    function getTotalChecked() {
        return gameStats.totalChecked
    }

    function getGameBoard() {
        return gameStats.gameBoard
    }

    function getPlayerNameByPlayer(player) {
        return player ? gameStats.playerTwo : gameStats.playerOne
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

    function setSwitchPlayer() {
        gameStats.player = !gameStats.player
        let color = getPlayerColor()
        let player = getPlayerName()
        renderPlayerTurnBar(player, color)
    }

    function setWhichPlayer(player) {
        gameStats.player = player
    }

    function setAddPlayerScore(winner) {
        if (winner === gameStats.playerTwo) {
            gameStats.playerTwoWins++
        } else {
            gameStats.playerOneWins++
        }
    }

    function setAddDrawScore() {
        gameStats.draws++
    }

    function setNewGameBoard() {
        gameStats.gameBoard = newGameBoard()
    }

    function setResetTotalChecked() {
        gameStats.totalChecked = 0
    }

    function setAddToTotalChecked() {
        gameStats.totalChecked++
    }

    function setLastWinnerFlag(winnerFlag) {
        gameStats.lastWinner = winnerFlag
    }

    function handlePlayerSelection() {
        let lastWinner = getLastWinner()
        if (lastWinner) {
            setWhichPlayer(true)
        } else {
            setWhichPlayer(false)
        }
        let startingPlayer = getPlayerName()
        let color = getPlayerColor()
        renderPlayerTurnBar(startingPlayer, color)
    }
    
    function handleGameEnd(draw, winner, winnerFlag) {
        setResetTotalChecked()
        if (!draw) {
            setAddPlayerScore(winner)
            renderGameStatsBar()
            handleGameWin(winner, winnerFlag)
        } else {
            setAddDrawScore()
            renderGameStatsBar()
            handleGameDraw()
        }
        setNewGameBoard()
        renderBoard()
        handlePlayerSelection()
    }

    function handleGameWin(winner, winnerFlag) {
        alert(winner + ' won!')
        setLastWinnerFlag(winnerFlag)
    }

    function handleGameDraw() {
        alert('Draw!')
    }

    function handleCellClick(e) {
        let [x, y] = getEventTargetCoordinates(e)
        let node = getDivAtCoordinates(x, y)
        if (node.text) {
            return
        } else {
            setBoard(x, y)
            setSwitchPlayer()
            handleWinData()
        }
    }

    function handleTotalPlays() {
        setAddToTotalChecked()
        let totalChecked = getTotalChecked()
        if (totalChecked === 9) {
            handleGameEnd(true)
        }
    }

    function handleWinData() {
        let gameData = getGameBoard()
        let state = getAllRowsColumnsAndDiagonals(gameData)
        if (state !== null) {
            if (state.player) {
                setTimeout(function() {
                    let playerTwo = getPlayerNameByPlayer(true)
                    handleGameEnd(false, playerTwo, true)
                }, 50)
            } else {
                setTimeout(function() {
                    let playerOne = getPlayerNameByPlayer(false)
                    handleGameEnd(false, playerOne, false)
                }, 50)
            }
        } else {
            handleTotalPlays()
        }
    }
}

