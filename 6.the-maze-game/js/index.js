const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const {
  mazeWrapper,
  wireframesShow,
  gravityY,
  wallSize,
  cellsHorizontal,
  cellsVertical,
  velocity,
  successMsgHolder,
  hideClass,
  wallsColor,
  mazeWallsColor,
  ballColor,
  goalColor,
} = mazeConfig;

const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = gravityY;
const { world } = engine;
const render = Render.create({
  element: mazeWrapper ? mazeWrapper : document.body,
  engine: engine,
  options: {
    wireframes: wireframesShow ? wireframesShow : false,
    width: width,
    height: height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, wallSize, {
    isStatic: true,
    render: { fillStyle: wallsColor },
  }),
  Bodies.rectangle(width / 2, height, width, wallSize, {
    isStatic: true,
    render: { fillStyle: wallsColor },
  }),
  Bodies.rectangle(0, height / 2, wallSize, height, {
    isStatic: true,
    render: { fillStyle: wallsColor },
  }),
  Bodies.rectangle(width, height / 2, wallSize, height, {
    isStatic: true,
    render: { fillStyle: wallsColor },
  }),
];

World.add(world, walls);

// Maze generaton
const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
  // If i have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }
  // Mark this cell being visited
  grid[row][column] = true;
  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, 'up'], // top
    [row, column + 1, 'right'], // right
    [row + 1, column, 'down'], // bottom
    [row, column - 1, 'left'], // left
  ]);
  // For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue;
    }

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    // Remove a wall from either horizontals or verticals
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }

    stepThroughCell(nextRow, nextColumn);
  }
  // Visit that next cell
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      10,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: mazeWallsColor,
        },
      }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      10,
      unitLengthY,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: mazeWallsColor,
        },
      }
    );
    World.add(world, wall);
  });
});

// Goal
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    label: 'goal',
    isStatic: true,
    render: {
      fillStyle: goalColor,
    },
  }
);
World.add(world, goal);

// Ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: 'ball',
  render: {
    fillStyle: ballColor,
  },
});
World.add(world, ball);

document.addEventListener('keydown', (event) => {
  const { x, y } = ball.velocity;
  if (event.keyCode === 38) {
    Body.setVelocity(ball, { x, y: y - velocity });
  }

  if (event.keyCode === 39) {
    Body.setVelocity(ball, { x: x + velocity, y });
  }

  if (event.keyCode === 40) {
    Body.setVelocity(ball, { x, y: y + velocity });
  }

  if (event.keyCode === 37) {
    Body.setVelocity(ball, { x: x - velocity, y });
  }
});

// Win Condition
Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach((collision) => {
    const labels = ['ball', 'goal'];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      successMsgHolder.classList.remove(hideClass);
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === 'wall') {
          Body.setStatic(body, false);
        }
      });
    }
  });
});
