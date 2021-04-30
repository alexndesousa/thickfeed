import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  button: {
    backgroundColor: 'white',
    color: 'grey',
    borderRadius: '15px',
  },
}));

const ChildToggleButtons = (childButtonNames: Array<string>): Array<JSX.Element> => {
  const mappedButtons = childButtonNames.map((text) => (
    <ToggleButton
      value={text}
      key={text}
      aria-label={text}
      style={{
        borderRadius: 30, marginLeft: '5px', borderColor: 'lightgray', border: '1px solid lightgray',
      }}
      disableFocusRipple
    >
      {text}
    </ToggleButton>
  ));
  return mappedButtons;
};

interface MenuToggleButtonData {
  text: string,
  childButtonNames: Array<string>,
  setPlatform: React.Dispatch<React.SetStateAction<Array<string>>>,
  disabled: boolean
}

const MenuToggleButton = ({
  text, childButtonNames, setPlatform, disabled,
}: MenuToggleButtonData): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(() => [childButtonNames[0]]);
  const [active, setActive] = React.useState(true);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const prevOpen = React.useRef(open);

  const handleToggle = () => {
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleChange = (_: any, nextView: any) => {
    setView(nextView);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
    setPlatform(view);
  }, [open]);

  React.useEffect(() => {
    if (view.length >= 1) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [view]);

  const subToggleButtons = ChildToggleButtons(childButtonNames);

  return (
    <div className={classes.root}>
      <div>
        <Button
          className={classes.button}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          disableFocusRipple
          aria-haspopup="true"
          disabled={disabled}
          onClick={handleToggle}
          // eslint-disable-next-line no-nested-ternary
          style={{ backgroundColor: !disabled ? (active ? 'lightskyblue' : 'white') : 'lightgrey', maxWidth: 'min(15vw, 100px)', maxHeight: '7vw' }}
        >
          <Typography variant="button" style={{ fontSize: 'min(2.75vw, 14px)' }}>
            {text}
          </Typography>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              in={TransitionProps?.in}
              onEnter={TransitionProps?.onEnter}
              onExited={TransitionProps?.onExited}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper style={{
                borderRadius: 15, paddingRight: '5px',
              }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{ paddingTop: '3px' }}>
                    <ToggleButtonGroup orientation="horizontal" value={view} onChange={handleChange} size="small">
                      {subToggleButtons}
                    </ToggleButtonGroup>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default MenuToggleButton;
