function clickEvent() {
    if (currentScreen == landingScreen) {
        if (standardButton.click(mouseX, mouseY)) {
            standardButton.command(Cell);
        }
        if (hexButton.click(mouseX, mouseY)) {
            hexButton.command(Hex);
        }
        if (planetButton.click(mouseX, mouseY)) {
            planetButton.command(Planet);
        }
    } else if (currentScreen == standardScreen) {
        standard.start = true;
        if (resetButton.click(mouseX, mouseY)) {
            resetButton.command(Cell)
        }
        if (menuButton.click(mouseX, mouseY)) {
            menuButton.command()
        } else {
            for (let i = 0; i < standard.dimensions; i++) {
                for (let j = 0; j < standard.dimensions; j++) {
                    if (standard.grid[i][j].click(mouseX, mouseY)) {
                        standard.grid[i][j].flag();
                    }
                }
            }
        }
    } else if (currentScreen == hexScreen) {
        hexGame.start = true;
        if (resetButton.click(mouseX, mouseY)) {
            resetButton.command(Hex)
        }
        if (menuButton.click(mouseX, mouseY)) {
            menuButton.command()
        } else {
            for (let i = 0; i < hexGame.dimensions; i++) {
                for (let j = 0; j < hexGame.dimensions; j++) {
                    if (hexGame.grid[i][j].click(mouseX, mouseY)) {
                        console.log([hexGame.grid[i][j].i, hexGame.grid[i][j].j])
                        hexGame.grid[i][j].flag();
                    }
                }
            }
        }
    } else if (currentScreen == planetScreen) {
        planetGame.start = true;
        if (resetButton.click(mouseX, mouseY)) {
            resetButton.command(Planet)
        }
        if (menuButton.click(mouseX, mouseY)) {
            menuButton.command()
        } else {
            for (let i = 0; i < planetGame.grid.length; i++) {
                for (let j = 0; j < planetGame.grid[i].length; j++) {
                    if (planetGame.grid[i][j].click(mouseX, mouseY)) {
                        console.log([planetGame.grid[i][j].i, planetGame.grid[i][j].j])
                        console.log(planetGame.grid[i][j].neighbours);
                        planetGame.grid[i][j].flag();
                    }
                }
            }
        }
    }
}
