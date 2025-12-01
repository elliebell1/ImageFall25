function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

const SEED = 87734;
const random = mulberry32(SEED);

const objects = [
  { obj: "#pine-tree-snow-1-obj", mtl: "#pine-tree-snow-1-mtl", baseScale: 1.75, weight: 3 },
  { obj: "#pine-tree-snow-2-obj", mtl: "#pine-tree-snow-2-mtl", baseScale: 1.75, weight: 3 },
  { obj: "#pine-tree-snow-3-obj", mtl: "#pine-tree-snow-3-mtl", baseScale: 1.75, weight: 3 },
  { obj: "#pine-tree-snow-4-obj", mtl: "#pine-tree-snow-4-mtl", baseScale: 1.75, weight: 1 },
  { obj: "#pine-tree-snow-5-obj", mtl: "#pine-tree-snow-5-mtl", baseScale: 1.75, weight: 1 },
  { obj: "#birch-tree-dead-snow-1-obj", mtl: "#birch-tree-dead-snow-1-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#birch-tree-dead-snow-2-obj", mtl: "#birch-tree-dead-snow-2-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#birch-tree-dead-snow-3-obj", mtl: "#birch-tree-dead-snow-2-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#birch-tree-dead-snow-4-obj", mtl: "#birch-tree-dead-snow-4-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#birch-tree-dead-snow-5-obj", mtl: "#birch-tree-dead-snow-5-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#bush-snow-1-obj", mtl: "#bush-snow-1-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#bush-snow-2-obj", mtl: "#bush-snow-2-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#bush-berries-1-obj", mtl: "#bush-berries-1-mtl", baseScale: 1.75, weight: 1 },
  { obj: "#bush-berries-2-obj", mtl: "#bush-berries-2-mtl", baseScale: 1.75, weight: 1 },
  { obj: "#common-tree-dead-snow-1-obj", mtl: "#common-tree-dead-snow-1-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#common-tree-dead-snow-2-obj", mtl: "#common-tree-dead-snow-2-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#common-tree-dead-snow-3-obj", mtl: "#common-tree-dead-snow-3-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#common-tree-dead-snow-4-obj", mtl: "#common-tree-dead-snow-4-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#common-tree-dead-snow-5-obj", mtl: "#common-tree-dead-snow-5-mtl", baseScale: 1.75, weight: 2 },
  { obj: "#rock-snow-1-obj", mtl: "#rock-snow-1-mtl", baseScale: 1, weight: 1 },
  { obj: "#rock-snow-2-obj", mtl: "#rock-snow-2-mtl", baseScale: 1, weight: 1 },
  { obj: "#rock-snow-3-obj", mtl: "#rock-snow-3-mtl", baseScale: 1, weight: 1 },
  { obj: "#rock-snow-4-obj", mtl: "#rock-snow-4-mtl", baseScale: 1, weight: 1 },
  { obj: "#rock-snow-5-obj", mtl: "#rock-snow-5-mtl", baseScale: 1, weight: 1 },
  { obj: "#rock-snow-6-obj", mtl: "#rock-snow-6-mtl", baseScale: 1, weight: 1 },
  { obj: "#rock-snow-7-obj", mtl: "#rock-snow-7-mtl", baseScale: 1, weight: 1 },
  { obj: "#wood-log-snow-obj", mtl: "#wood-log-snow-mtl", baseScale: 1, weight: 1 },
  { obj: "#tree-stump-snow-obj", mtl: "#tree-stump-snow-mtl", baseScale: 1, weight: 1 },
  { obj: "#snow-pile-obj", mtl: "", baseScale: 3, weight: 2, color: "#d3ceed" },
  { obj: "#snow-flat-obj", mtl: "", baseScale: 1, weight: 2, color: "#d3ceed" },
  { obj: "#snow-flat-large-obj", mtl: "", baseScale: 1.5, weight: 2, color: "#d3ceed" }
];

let weightedObjects = [];
objects.forEach(o => {
  for (let i = 0; i < o.weight; i++) weightedObjects.push(o);
});

const scene = document.querySelector('a-scene');

for (let i = 0; i < 600; i++) {
  let x = (random() * 200) - 100;
  let z = (random() * 200) - 100;

  if (Math.abs(x) < 7.5 && Math.abs(z) < 7.5) { i--; continue; }

  const model = weightedObjects[Math.floor(random() * weightedObjects.length)];

  const el = document.createElement('a-obj-model');
  el.setAttribute('src', model.obj);
    if (model.mtl) {
        el.setAttribute('mtl', model.mtl);
    } else if (model.color) {
        el.setAttribute('material', `color: ${model.color}`);
    }

  const rotY = random() * 360;
  el.setAttribute('rotation', `0 ${rotY} 0`);

  const distance = Math.sqrt(x*x + z*z);
  const maxDistance = Math.sqrt((100)**2 + (100)**2);
  const minScale = model.baseScale * 0.8;
  const maxScale = model.baseScale * 4;
  const scaleFactor = minScale + (distance / maxDistance) * (maxScale - minScale);

  const finalScale = scaleFactor * (0.8 + random() * 0.4);
  el.setAttribute('scale', `${finalScale} ${finalScale} ${finalScale}`);

  if (distance < 50) {
        el.setAttribute('shadow', 'cast: true; receive: true');
  }

  el.setAttribute('position', `${x} 0 ${z}`);

  scene.appendChild(el);
}
