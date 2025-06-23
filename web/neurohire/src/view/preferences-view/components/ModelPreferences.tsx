// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

const ModelPreferences: React.FC = () => (
  <>
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Enable AI-assisted screening"
    />
    <FormControlLabel control={<Switch />} label="Use advanced ranking model" />
  </>
);

export default ModelPreferences;
