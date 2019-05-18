const express = require('express');
const router = express.Router();
const Maze = require('../models/Mazes')

router.get('/', (req, res) => {
  return res.json({data: 'Hi Reed'});
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
  const maze = await Maze.create({maze:bigArray,name:req.body.name,attempts:0,successes:0,owner:req.body.userName})
  console.log(req.body.name,'<-----req.body.name')
  console.log(req.body.maze,'<---req.body.maze')
  console.log(req.body.userName,'<---req.body.userName')
  return res.json({
    'A maze in binary---->': bigArray,
    'Name of the maze---->':req.body.name,
    'attempts---->':maze.attempts,
    'successes--->':maze.successes,
    'owner------->':maze.owner
  });
});

router.put('/test/:id', async (req, res) => {
  const winnerMaze = await Maze.findById(req.params.id)
  winnerMaze.successes=winnerMaze.successes+1
  winnerMaze.attempts=winnerMaze.attempts+1
  winnerMaze.save()
  return res.json({'winner':winnerMaze});
});

router.delete('/delete/:id', async (req, res) => {
  const deletedMaze = await Maze.findByIdAndRemove(req.params.id)
  return res.json({'deletedMaze--->':req.params.id});
});

router.put('/test/loser/:id', async (req, res) => {
  const winnerMaze = await Maze.findById(req.params.id)
  winnerMaze.attempts=winnerMaze.attempts+1
  winnerMaze.save()
  return res.json({'loser':winnerMaze});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a MAZE DELETE HTTP method'});
});

module.exports = router;
