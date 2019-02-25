let imax = 30;
let jmax = 100;

const scene = [];

for (let i = 0; i < imax; i++) {
    scene.push([]);
    for (let j = 0; j < jmax; j++) {
        scene[i].push(0);
    }
    // scene[i].push("");
}

module.exports = scene;
