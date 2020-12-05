import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import InputAdornment from "@material-ui/core/InputAdornment";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";

import useStickyState from "../../hooks/useStickyState";
import Title from "./Title";

export default function TeamTable(props) {
  const { teamName } = props;
  const [points, setPoints] = useStickyState(0, teamName + "Points");
  const [team, setTeam] = useStickyState([], teamName + "Players");
  const [name, setName] = React.useState("");
  const classes = useStyles();

  const onAddPlayer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!name) return;
    setTeam((prev) => [...prev, name]);
    setName("");
  };

  const onRemovePlayer = (e, removeName) => {
    e.stopPropagation();
    setTeam((prev) => prev.filter((n) => n !== removeName));
  };

  const addPoints = (e, amount) => {
    e.stopPropagation();
    setPoints((prev) => prev + amount);
  };

  return (
    <div className={classes.root}>
      <div>
        <Title>{teamName}</Title>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <IconButton onClick={(e) => addPoints(e, -1)}>
              <RemoveIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p" variant="h6">
              Points: {points}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={(e) => addPoints(e, 1)}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team.map((name) => (
              <TableRow
                key={name}
                onClick={(e) => onRemovePlayer(e, name)}
                className={classes.row}
              >
                <TableCell>{name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <form onSubmit={onAddPlayer}>
          <TextField
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="New Player"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onAddPlayer}
                    onMouseDown={onAddPlayer}
                    edge="end"
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  row: {
    cursor: "pointer",
  },
}));
