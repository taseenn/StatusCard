import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  OutlinedInput,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTranslation } from "../common/components/LocalizationProvider";
import PageLayout from "../common/components/PageLayout";
import SettingsMenu from "./components/SettingsMenu";
import { useAdministrator, useRestriction } from "../common/util/permissions";
import useSettingsStyles from "./common/useSettingsStyles";

function PersonPage() {
  const classes = useSettingsStyles();

  const navigate = useNavigate();
  const t = useTranslation();

  const readonly = useRestriction("readonly");

  const user = useSelector((state) => state.session.user);
  const [attributes, setAttributes] = useState(user.attributes || {});

  return (
    <PageLayout
      menu={<SettingsMenu />}
      breadcrumbs={["settingsTitle", "sharedPreferences"]}
    >
      <Container maxWidth="xs" className={classes.container}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Personal Information</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <FormControl fullWidth>
              <TextField label={t("sharedName")} />
            </FormControl>
            <TextField fullWidth label="lastName" />
            <FormControl fullWidth>
              <TextField label="ID/Identification" />
            </FormControl>
            <TextField
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Login Information</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <FormControl fullWidth>
              <TextField
                label="Date of entry"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Reason For Addmission</InputLabel>
              <Select
                label="Reason For Addmission"
                value={attributes.selectedMapOverlay}
                onChange={(e) =>
                  setAttributes({
                    ...attributes,
                    selectedMapOverlay: e.target.value,
                  })
                }
              >
                <MenuItem value="">"""</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="caseNumber" />
            <TextField fullWidth label="Sentence Duration" />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Location</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <FormControl fullWidth>
              <TextField label="Cell" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Pavilion</InputLabel>
              <Select
                label="Pavilion"
                value={attributes.selectedMapOverlay}
                onChange={(e) =>
                  setAttributes({
                    ...attributes,
                    selectedMapOverlay: e.target.value,
                  })
                }
              >
                <MenuItem value=""> """"</MenuItem>
              </Select>
            </FormControl>
            <FormGroup>
              <Typography variant="h6">Special Conditions</Typography>
              <FormControlLabel control={<Checkbox />} label="highRisk" />
              <FormControlLabel
                control={<Checkbox />}
                label="requiresMedicalAttention"
              />
              <FormControlLabel control={<Checkbox />} label="isolation" />
            </FormGroup>
            <OutlinedInput
              multiline
              rows={4}
              fullWidth
              type="text"
              placeholder={t("sharesServer")}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
            />
          </AccordionDetails>
        </Accordion>

        <div className={classes.buttons}>
          <Button
            type="button"
            color="primary"
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            {t("sharedCancel")}
          </Button>
          <Button type="button" color="primary" variant="contained">
            {t("sharedSave")}
          </Button>
        </div>
      </Container>
    </PageLayout>
  );
}

export default PersonPage;
