function Hex(i, j, l, shift) {
    this.i = i;
    this.j = j;
    this.shift = shift;
    this.l = l;
    this.bee = false
    this.reveal = false;
    this.flagged = false;
    this.amtBees;
    if (!this.shift) {
        this.x = (j * 35) + 70;
    } else {
        this.x = (j * 35) + 87.5;
    }
    this.y = (i * 31) + 160;

}

Hex.prototype.show = function () {
    fill('#eee999');
    stroke('#f05e23');
    hexagon(this.x, this.y);

//        image(this.wave, this.x, this.y, this.l, this.l);

        if (this.flagged) {
            fill('#1034a6');
            rect(this.x, this.y, this.l, this.l);
//            image(this.tree, this.x, this.y, this.l, this.l);
    
        }
    if (this.reveal) {
        if (this.bee) {
            fill('#eee999');
            hexagon(this.x, this.y);
            //          image(this.crabs, this.x, this.y, this.l, this.l);
        } else {
            fill('#b87333');
            hexagon(this.x, this.y, this.l, this.l);
            fill('orange')
            textAlign(CENTER);
            textSize(18);
            if (this.amtBees > 0) {
                text(this.amtBees, this.x, this.y);
            }
        }
    }
}

Hex.prototype.reveals = function () {
    if (!gg) {
        if (!this.reveal) {
            revealCount++;
        }
        this.reveal = true;
        if (this.amtBees == 0) {
            this.chain(cols);
        } else if (this.bee) {
            lose();
        } else if (revealCount + allBees == gridSize) {
            win();
        }
    }
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
            if ((i > -1 && i < cols && j > -1 && j < rows)) {
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
                                if (!grid[i][j].reveal) {
                                    grid[i][j].reveals();
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!grid[i][j].reveal) {
                                        grid[i][j].reveals();
                                    }
                                }
                            } else {
                                if (i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!grid[i][j].reveal) {
                                        grid[i][j].reveals();
                                    }
                                }
                            }
                        }
                        // Other Rows
                    } else {
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j) {
                                if (!grid[i][j].reveal) {
                                    grid[i][j].reveals();
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j - 1 || i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!grid[i][j].reveal) {
                                        grid[i][j].reveals();
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j - 1 || i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!grid[i][j].reveal) {
                                        grid[i][j].reveals();
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
                                if (!grid[i][j].reveal) {
                                    grid[i][j].reveals();
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1) {
                                    if (!grid[i][j].reveal) {
                                        grid[i][j].reveals();
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1) {
                                    if (!grid[i][j].reveal) {
                                        grid[i][j].reveals();
                                    }
                                }
                            }
                        }
                        // Other Rows
                    } else {
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j || i == this.i + 1 && j == this.j + 1) {
                                if (!grid[i][j].reveal) {
                                    grid[i][j].reveals();
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (!grid[i][j].reveal) {
                                        grid[i][j].reveals();
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j || i == this.i + 1 && j == this.j + 1) {
                                    if (!grid[i][j].reveal) {
                                        grid[i][j].reveals();
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

Hex.prototype.countBees = function (cols) {
    if (this.bee) {
        return;
    }
    let bees = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
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
                                if (grid[i][j].bee) {
                                    bees++
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (grid[i][j].bee) {
                                        bees++
                                    }
                                }
                            } else {
                                if (i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (grid[i][j].bee) {
                                        bees++
                                    }
                                }
                            }
                        }
                        // Other Rows
                    } else {
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j) {
                                if (grid[i][j].bee) {
                                    bees++
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j - 1 || i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (grid[i][j].bee) {
                                        bees++
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j - 1 || i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (grid[i][j].bee) {
                                        bees++
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
                                if (grid[i][j].bee) {
                                    bees++
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1) {
                                    if (grid[i][j].bee) {
                                        bees++
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1) {
                                    if (grid[i][j].bee) {
                                        bees++
                                    }
                                }
                            }
                        }
                        // Other Rows
                    } else {
                        if (this.j == 0) {
                            if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j || i == this.i + 1 && j == this.j + 1) {
                                if (grid[i][j].bee) {
                                    bees++
                                }
                            }
                        } else {
                            // Last Column -- Then Middle Columns
                            if (this.j == cols) {
                                if (i == this.i - 1 && j == this.j || i == this.i && j == this.j - 1 || i == this.i + 1 && j == this.j) {
                                    if (grid[i][j].bee) {
                                        bees++
                                    }
                                }
                            } else {
                                if (i == this.i - 1 && j == this.j || i == this.i - 1 && j == this.j + 1 || i == this.i && j == this.j - 1 || i == this.i && j == this.j + 1 || i == this.i + 1 && j == this.j || i == this.i + 1 && j == this.j + 1) {
                                    if (grid[i][j].bee) {
                                        bees++
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }
    this.amtBees = bees;
}
