import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SkipLeft from "@material-ui/icons/SkipPrevious";
import Grid from "@material-ui/core/Grid";
import SkipRight from "@material-ui/icons/SkipNext";
import EmptyIcon from "@material-ui/icons/SettingsBackupRestore";
import ScrapGameIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";

import useStickyState from "../../hooks/useStickyState";
import SettingsModal from "../settings/SettingsModal";
import * as config from "../../services/config";
import words from "../../data/wordsets";
import Title from "./Title";
import Timer from "./Timer";

export default function GameBoard() {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [words, setWords] = useStickyState(wordSet, "words");
  const [currentWord, setCurrentWord] = useStickyState(
    firstWord,
    "currentWord"
  );
  
  const [words2, setWords2] = useStickyState(wordSet2, "words2");
  const [currentWord2, setCurrentWord2] = useStickyState(
    firstWord2,
    "currentWord2"
  );

  const [usedWords, setUsedWords] = useStickyState([], "usedWords");
  const classes = useStyles();

  const onSkipWord = () => {
    // Process First Word Set
    if (words.length === 0) setWords(wordSet);
    const newWord = getNewWord(words);
    
    // Process Second Word Set if in Double Mode
    let newWord2 = null;
    if (doubleMode) {
      if (words2.length === 0) setWords2(wordSet2);
      newWord2 = getNewWord(words2);
    }
    
    if (currentWord) {
      const entry = doubleMode 
        ? `${chosenSet}: ${currentWord}, ${chosenSet2}: ${currentWord2}`
        : currentWord;
      setUsedWords((prev) => [entry, ...prev]);
    }
    
    setWords((prev) => prev.filter((w) => w !== newWord));
    setCurrentWord(newWord);

    if (doubleMode) {
      setWords2((prev) => prev.filter((w) => w !== newWord2));
      setCurrentWord2(newWord2);
    }
  };

  const onScrapGame = () => {
    if (window.confirm("Are you sure you want to start a new game?")) {
      window.localStorage.removeItem("words");
      window.localStorage.removeItem("currentWord");
      window.localStorage.removeItem("words2");
      window.localStorage.removeItem("currentWord2");
      window.localStorage.removeItem("usedWords");
      window.localStorage.removeItem("teamOneActive");
      window.location.reload();
    }
  };

  const onOpenSettings = () => {};

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
            {doubleMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <Typography variant="caption" color="textSecondary">{chosenSet}</Typography>
                  <Typography component="p" variant="h5">
                    {currentWord || <EmptyIcon />}
                  </Typography>
                </div>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <Typography variant="caption" color="textSecondary">{chosenSet2}</Typography>
                  <Typography component="p" variant="h5">
                    {currentWord2 || <EmptyIcon />}
                  </Typography>
                </div>
              </div>
            ) : (
              <Typography component="p" variant="h4">
                {currentWord || <EmptyIcon />}
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={onSkipWord}>
              <SkipRight />
            </IconButton>
          </Grid>
        </Grid>
        <Timer />

      </div>
      <div style={{ width: '100%' }}>
        <div>
          <Typography component="p" variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
              Word Set: {chosenSet} {doubleMode && `& ${chosenSet2}`}
          </Typography>
          <Typography component="p" variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
              {words.length} words remaining
          </Typography>
          {usedWords.length > 0 && (
            <div style={{ marginTop: 16, maxHeight: 100, overflowY: 'auto' }}>
              <Typography variant="caption" color="textSecondary" display="block">
                Used Words:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {usedWords.join(", ")}
              </Typography>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', marginTop: 8, justifyContent: 'center' }}>
            <IconButton onClick={onScrapGame}>
            <ScrapGameIcon />
            </IconButton>
            <IconButton onClick={() => setSettingsOpen(true)}>
            <SettingsIcon />
            </IconButton>
        </div>
      </div>
      <SettingsModal
        open={settingsOpen}
        handleClose={() => setSettingsOpen(false)}
      />
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
    justifyContent: "space-between",
  },
});

const doubleMode = config.getSetting("doubleMode");
const chosenSet = config.getSetting("wordSet");
const chosenSet2 = config.getSetting("wordSet2");
const wordSet = words[chosenSet];
const wordSet2 = words[chosenSet2];
const firstWord = getNewWord(wordSet);
const firstWord2 = doubleMode ? getNewWord(wordSet2) : null;
