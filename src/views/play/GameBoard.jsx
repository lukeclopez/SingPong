import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SkipLeft from "@material-ui/icons/SkipPrevious";
import Grid from "@material-ui/core/Grid";
import SkipRight from "@material-ui/icons/SkipNext";
import EmptyIcon from "@material-ui/icons/SettingsBackupRestore";

import useStickyState from "../../hooks/useStickyState";
import * as config from "../../services/config";
import words from "../../data/words.json";
import Title from "./Title";
import Timer from "./Timer";

export default function GameBoard() {
  const [words, setWords] = useStickyState(wordSet, "words");
  const [currentWord, setCurrentWord] = useStickyState(
    firstWord,
    "currentWord"
  );
  const classes = useStyles();

  const onSkipWord = () => {
    if (words.length === 0) setWords(wordSet);
    const newWord = getNewWord(words);
    setWords((prev) => prev.filter((w) => w !== newWord));
    setCurrentWord(newWord);
  };

  return (
    <div className={classes.root}>
      <div>
        <Title>Current Word</Title>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <IconButton disabled>
              <SkipLeft />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p" variant="h4">
              {currentWord || <EmptyIcon />}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={onSkipWord}>
              <SkipRight />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <Timer />
    </div>
  );
}

export const getNewWord = (words) => {
  const dice = Math.floor(Math.random() * words.length);
  return words[dice];
};

export const getBackWord = (usedWords, backIndex) => {
  return usedWords[usedWords.length - parseInt(backIndex)];
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  },
});

const wordSet = words[config.getWordSet()];
const firstWord = getNewWord("Set 1");
const startingBackIndex = 2;
