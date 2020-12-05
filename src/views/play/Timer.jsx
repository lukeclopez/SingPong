import React from "react";
import { useTimer } from "react-timer-hook";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import RestartIcon from "@material-ui/icons/Restore";
import * as config from "../../services/config";

const time = new Date();
time.setSeconds(time.getSeconds() + config.getSetting("timeLimit"));

export default function Timer() {
  const { seconds, minutes, isRunning, resume, pause, restart } = useTimer({
    time,
    onExpire: () => {},
  });
  const classes = useStyles();

  const playButtonAction = () => {
    if (seconds < 1 && minutes < 1) restartIn(config.getSetting("timeLimit"));
    else if (!isRunning) resume();
    else if (isRunning) pause();
  };

  const restartIn = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + config.getSetting("timeLimit"));
    restart(time);
  };

  return (
    <div className={classes.root}>
      <div className={classes.timer}>
        <span>{minutes}</span>:
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <IconButton onClick={playButtonAction}>
        {isRunning && (seconds > 0 || minutes) > 0 ? (
          <PauseIcon />
        ) : (
          <PlayIcon />
        )}
      </IconButton>
      <IconButton onClick={restartIn}>
        <RestartIcon />
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  timer: {
    fontSize: "10em",
  },
});
