import React, { useState } from "react";
import Draggable from "react-draggable";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import RemoveDialog from "./RemoveDialog";
import {
  Card,
  Typography,
  IconButton,
  CardActions,
  Tooltip,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SportsMartialArtsOutlinedIcon from "@mui/icons-material/SportsMartialArtsOutlined";
import { useTranslation } from "./LocalizationProvider";
import { useCatch } from "../../reactHelper";

const useStyles = makeStyles((theme) => ({
  card: {
    pointerEvents: "auto",
    width: theme.spacing(45),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 1, 0, 2),
  },
  table: {
    "& .MuiTableCell-sizeSmall": {
      paddingLeft: 20,
      paddingRight: 0,
      fontSize: "1rem",
    },
  },
  cell: {
    borderBottom: "none",
    fontSize: "10rem",
  },
  actions: {
    justifyContent: "space-between",
    marginTop: "auto",
  },
  root: ({ desktopPadding }) => ({
    pointerEvents: "none",
    position: "fixed",
    zIndex: 5,
    left: "50%",
    [theme.breakpoints.up("md")]: {
      left: `calc(50% + ${desktopPadding} / 2)`,
      bottom: theme.spacing(3),
    },
    [theme.breakpoints.down("md")]: {
      left: "50%",
      bottom: `calc(${theme.spacing(3)} + ${
        theme.dimensions.bottomBarHeight
      }px)`,
    },
    button: {},
    transform: "translateX(-50%)",
  }),
}));

function Good({ deviceId, position, disableActions, deviceReadonly, onClose }) {
  const classes = useStyles();
  const t = useTranslation();
  const device = useSelector((state) => state.devices.items[deviceId]);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();

  const handleRemove = useCatch(async (removed) => {
    if (removed) {
      const response = await fetch("/api/devices");
      if (response.ok) {
        dispatch(devicesActions.refresh(await response.json()));
      } else {
        throw Error(await response.text());
      }
    }
    setRemoving(false);
  });

  const StatusRow = ({ name, content }) => (
    <TableRow>
      <TableCell className={classes.cell} colSpan={2}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontWeight: 550 }}
        >
          {content}
        </Typography>
      </TableCell>
    </TableRow>
  );

  return (
    <div className={classes.root}>
      {device && (
        <Draggable>
          <Card elevation={3} className={classes.card}>
            <div className={classes.header}>
              <Typography variant="body2" color="textSecondary">
                {device.name}
              </Typography>
              <IconButton size="small" onClick={onClose} onTouchStart={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>

            <div
              style={{
                height: 300,
                backgroundImage: "url(/Screenshot.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{
                fontWeight: "bold",
                marginLeft: 1.5,
                marginTop: 1.5,
                fontStyle: "sans-serif",
              }}
            >
              {device.name}
            </Typography>

            <Table size="small" classes={{ root: classes.table }}>
              <TableBody>
                <div
                  className={classes.button}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginRight: "100px",
                  }}
                >
                  <StatusRow name="Edad:" content="34 años" sx={{display: 'flex', justifyContent: 'space-between'}} />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginRight: 2.5, textTransform: "none"  , backgroundColor: 'red'}}
                  >
                    Nivel Alto
                  </Button>
                </div>

                <StatusRow
                  name="Ubicación:"
                  content="Av. Insurgentes Sur 1234, Col. Del Valle, CDMX jkgidasuighzdsjbg;ahgu[arhugbjafbb"
                />
                <StatusRow
                  name="Tel. Directo:"
                  content="(55) 1234-567897t8-y-t89y89yt89y89 sdgiasuisd;bgv:IHV;hFUIdspugfuhsduvh"
                />
                <StatusRow
                  name="Tel. Contacto:"
                  content="(55) 8765-4321fuashfuhaudfjsd;ghuert979ytrhfuheptyw9e"
                />
              </TableBody>
            </Table>

            <Divider />
            <Divider />
            <Divider />

            <CardActions classes={{ root: classes.actions }} disableSpacing>
              <Tooltip title={t("sharedExtra")}>
                <IconButton
                // color="secondary"
                //  disabled={!position}
                >
                  <PendingActionsOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("commandTitle")}>
                <IconButton
                  color="error"
                  //      onClick={() => navigate(`/settings/device/${deviceId}/command`)}
                  //   disabled={disableActions}
                >
                  <AddLocationAltOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("sharedRemove")}>
                <IconButton
                // color="secondary"
                >
                  <SportsMartialArtsOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("sharedRemove")}>
                <IconButton color="error">
                  <LocationOnOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("sharedEdit")}>
                <IconButton
                //   color="secondary"
                // onClick={() => navigate(`/settings/device/${deviceId}`)}
                //  disabled={disableActions || deviceReadonly}
                >
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("sharedRemove")}>
                <IconButton
                  color="error"
                  onClick={() => setRemoving(true)}
                  //   disabled={disableActions || deviceReadonly}
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("reportReplay")}>
                <IconButton
                //    color="error"
                //  onClick={() => navigate("/replay")}
                //    disabled={disableActions || !position}
                >
                  <InfoOutlinedIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Draggable>
      )}
      <RemoveDialog
        open={removing}
        endpoint="devices"
        itemId={deviceId}
        onResult={(removed) => handleRemove(removed)}
      />
    </div>
  );
}

export default Good;
