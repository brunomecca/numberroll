function frame() {
    setTimeout(() => {
        getScene();
    }, 500);
}

function getScene() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (i == character[0] && j == character[1]) {
                process.stdout.write("1 ");
            } else {
                process.stdout.write("0 ");
            }
        }
        console.log();
    }
    console.log("\n\n\n\n\n\n\n\n\n\n");
    frame();
}

const scene = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const character = [0, 0];
frame();

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");
stdin.on("data", function(key) {
    // ctrl-c ( end of text )
    if (key === "\u0003") process.exit();
    else if (key === "d") character[1]++;
    else if (key === "a") character[1]--;
    else if (key === "s") character[0]++;
    else if (key === "w") character[0]--;

    for (let i of [0, 1]) {
        if (character[i] < 0) {
            character[i] = 0;
        } else if (character[i] >= scene[0].length) {
            character[i] = scene[0].length - 1;
        }
    }
});
