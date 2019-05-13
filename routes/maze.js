const express = require('express');
const router = express.Router();
const Maze = require('../models/Mazes')

router.get('/', (req, res) => {
  return res.json({data: 'Fuck You, Reed'});
});

router.get('/all', async (req, res) => {
  const foundMaze = await Maze.find({})
  return res.json({data: foundMaze});
});

router.get('/test/:id', async (req, res) => {
  const foundMaze = await Maze.findById(req.params.id)
  return res.json({data: foundMaze});
});

router.post('/', async (req, res) => {
  console.log(req.body,'<------req.body')
  const bigArray = new Array(6400).fill(0)
  for (i=0;i<req.body.maze.length;i++){
    bigArray[req.body.maze[i]]=1;

  }
  const maze = await Maze.create({maze:bigArray,name:req.body.name,attempts:0,successes:0,owner:req.body.currentUser})
  console.log(req.body.name,'<-----req.body.name')
  console.log(req.body.maze,'<---req.body.maze')
  return res.json({
    'A maze in binary---->': bigArray,
    'Name of the maze---->':req.body.name,
    'attempts---->':maze.attempts,
    'successes--->':maze.successes,
    'owner------->':maze.owner
  });
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a MAZE PUT HTTP method'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a MAZE DELETE HTTP method'});
});

module.exports = router;