import React from "react";
import { useDataExtensionApi } from "../../../hooks/useDataExtensionApi";

function FieldConfiguration() {
  const { prodDataExtension } = useDataExtensionApi();
  return <div>{prodDataExtension.name}</div>;
}

export default FieldConfiguration;
