function Hex(i, j, l, shift) {
    this.pot = potpot;
    this.bee = beebee;
    this.i = i;
    this.j = j;
    this.shift = shift;
    this.l = l;
    this.bomb = false
    this.reveal = false;
    this.flagged = false;
    this.amtBombs;
    if (!this.shift) {
        this.x = (j * 35) + 70;
    } else {
        this.x = (j * 35) + 87.5;
    }
    this.y = (i * 31) + 160;

}

Hex.prototype.show = function () {
    imageMode(CENTER);
    fill('#992409');
    stroke('#fbd604');

    hexagon(this.x, this.y);

    //        image(this.wave, this.x, this.y, this.l, this.l);

    if (this.flagged) {
        fill('#1034a6');
        image(this.pot, this.x - 3, this.y, this.l, this.l);

    }
    if (this.reveal) {
        if (this.bomb) {
            fill('#442c0a');
            hexagon(this.x, this.y);
            image(this.bee, this.x - 3, this.y, this.l + 10, this.l + 10);
        } else {
            fill('#fcb43a');
            hexagon(this.x, this.y, this.l, this.l);
            fill('#992409')
            stroke('#3a3637');
            textAlign(CENTER);
            textSize(18);
            stroke('#3a3637');
            if (this.amtBombs > 0) {
                text(this.amtBombs, this.x - 2, this.y + 6);
            }
        }
    }
    imageMode(CORNER);
}

Hex.prototype.reveals = function () {
    if (!hexGame.gg) {
        if (!this.reveal) {
            hexGame.revealCount++;
        }
        this.reveal = true;
        if (this.amtBombs == 0) {
            this.chain(hex.dimensions);
        }
        if (this.bomb) {
            hexGame.lose();
        }
        if (hexGame.revealCount + hexGame.allBombs == hexGame.gridSize) {
            console.log("Chicken Dinner")
            hexGame.win();
        }
    }
//    console.log(hexGame.revealCount)
//    console.log(hexGame.allBombs)
//    console.log(hexGame.gridSize)
}

Hex.prototype.flag = function () {
    print('works');
    if (!this.reveal && !this.flagged && flagger.on) {
        this.flagged = true;
    } else if (this.flagged && flagger.on) {
        this.flagged = false;
    } else {
        if (!this.flagged) {
            this.reveals();
        }
    }
}


Hex.prototype.click = function (x, y) {
    let d = dist(this.x - 3.5, this.y, x, y)
    return (d < 17.5);
}

Hex.prototype.chain = function (cols) {
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if ((i > -1 && i < hexGame.dimensions && j > -1 && j < hexGame.dimensions)) {
                // Check if odd or even
                // If Even
                if (!this.shift) {
                    // Check Row
                    // First Row
                    if (this.i == 0) {
                        // Check Col
                        // First Column
                        if (this.j == 0) {
                            if (i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j) {
                                if (!hexGame.grid[i][j].reveal) {
                                    hexGame.grid[i][j].reveals();
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!hexGame.grid[i][j].reveal) {
                                        hexGame.grid[i][j].reveals();
                                    }
                                }
                            } else {
                                if (i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!hexGame.grid[i][j].reveal) {
                                        hexGame.grid[i][j].reveals();
                                    }
                                }
                            }
                        }
                        // Other Rows
                    } else {
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j) {
                                if (!hexGame.grid[i][j].reveal) {
                                    hexGame.grid[i][j].reveals();
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j - 1 || i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!hexGame.grid[i][j].reveal) {
                                        hexGame.grid[i][j].reveals();
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j - 1 || i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!hexGame.grid[i][j].reveal) {
                                        hexGame.grid[i][j].reveals();
                                    }
                                }
                            }
                        }
                    }
                    // If Odd
                } else {
                    // Check Row
                    // Last Row
                    if (this.i == cols) {
                        // Check Col
                        // First Column
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j + 1) {
                                if (!hexGame.grid[i][j].reveal) {
                                    hexGame.grid[i][j].reveals();
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1) {
                                    if (!hexGame.grid[i][j].reveal) {
                                        hexGame.grid[i][j].reveals();
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1) {
                                    if (!hexGame.grid[i][j].reveal) {
                                        hexGame.grid[i][j].reveals();
                                    }
                                }
                            }
                        }
                        // Other Rows
                    } else {
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j || i == this.i + 1 && j == this.j + 1) {
                                if (!hexGame.grid[i][j].reveal) {
                                    hexGame.grid[i][j].reveals();
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!hexGame.grid[i][j].reveal) {
                                        hexGame.grid[i][j].reveals();
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j || i == this.i + 1 && j == this.j + 1) {
                                    if (!hexGame.grid[i][j].reveal) {
                                        hexGame.grid[i][j].reveals();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

Hex.prototype.countBombs = function (cols) {
    if (this.bomb) {
        return;
    }
    let bombs = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if (i > -1 && i < hexGame.dimensions && j > -1 && j < hexGame.dimensions) {
                // Check if odd or even
                // If Even
                if (!this.shift) {
                    // Check Row
                    // First Row
                    if (this.i == 0) {
                        // Check Col
                        // First Column
                        if (this.j == 0) {
                            if (i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j) {
                                if (hexGame.grid[i][j].bomb) {
                                    bombs++
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (hexGame.grid[i][j].bomb) {
                                        bombs++
                                    }
                                }
                            } else {
                                if (i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (hexGame.grid[i][j].bomb) {
                                        bombs++
                                    }
                                }
                            }
                        }
                        // Other Rows
                    } else {
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j) {
                                if (hexGame.grid[i][j].bomb) {
                                    bombs++
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j - 1 || i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (hexGame.grid[i][j].bomb) {
                                        bombs++
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j - 1 || i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (hexGame.grid[i][j].bomb) {
                                        bombs++
                                    }
                                }
                            }
                        }
                    }
                    // If Odd
                } else {
                    // Check Row
                    // Last Row
                    if (this.i == cols) {
                        // Check Col
                        // First Column
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j + 1) {
                                if (hexGame.grid[i][j].bomb) {
                                    bombs++
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1) {
                                    if (hexGame.grid[i][j].bomb) {
                                        bombs++
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1) {
                                    if (hexGame.grid[i][j].bomb) {
                                        bombs++
                                    }
                                }
                            }
                        }
                        // Other Rows
                    } else {
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j || i == this.i + 1 && j == this.j + 1) {
                                if (hexGame.grid[i][j].bomb) {
                                    bombs++
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (hexGame.grid[i][j].bomb) {
                                        bombs++
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j || i == this.i + 1 && j == this.j + 1) {
                                    if (hexGame.grid[i][j].bomb) {
                                        bombs++
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }
    this.amtBombs = bombs;
}

function hexagon(x, y) {
    beginShape();
    vertex(-2.45 + x, 20 + y);
    vertex(15.32 + x, 10 + y);
    vertex(15.32 + x, -10 + y);
    vertex(-2.45 + x, -20 + y);
    vertex(-19.5 + x, -10 + y);
    vertex(-19.5 + x, 10 + y);
    vertex(-2.45 + x, 20 + y);
    endShape(CLOSE);
}
