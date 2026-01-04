import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import * as config from "../../services/config";
import words from "../../data/wordsets";

export default function SettingsModal(props) {
  const { open, handleClose } = props;
  const classes = useStyles();

  const [wordSet, setWordSet] = React.useState(config.getSetting("wordSet"));

  const onSave = () => {
    config.setSetting("wordSet", wordSet);
    window.localStorage.removeItem("words");
    window.localStorage.removeItem("currentWord");
    window.location.reload();
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className={classes.header}>
            <h2 id="transition-modal-title">Settings</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          
          <div className={classes.content}>
            <FormControl className={classes.formControl}>
              <InputLabel id="word-set-select-label">Word Set</InputLabel>
              <Select
                labelId="word-set-select-label"
                id="word-set-select"
                value={wordSet}
                onChange={(e) => setWordSet(e.target.value)}
              >
                {Object.keys(words).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className={classes.footer}>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save & Reload
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 300,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  content: {
    marginBottom: theme.spacing(3),
  },
  formControl: {
    minWidth: 200,
    width: "100%",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
