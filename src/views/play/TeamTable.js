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
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import Title from "./Title";

export default function TeamTable(props) {
  const { teamName, points } = props;
  const [team, setTeam] = React.useState([]);
  const [name, setName] = React.useState("");
  const classes = useStyles();

  const onAddPlayer = (e) => {
    e.preventDefault();
    if (!name) return;
    setTeam((prev) => [...prev, name]);
    setName("");
  };

  const onRemovePlayer = (removeName) => {
    setTeam((prev) => prev.filter((n) => n !== removeName));
  };

  return (
    <div className={classes.root}>
      <div>
        <Title>{teamName}</Title>
        <Typography component="p" variant="h6">
          Points: {points}
        </Typography>
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
                onClick={() => onRemovePlayer(name)}
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
