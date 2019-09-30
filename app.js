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
}

