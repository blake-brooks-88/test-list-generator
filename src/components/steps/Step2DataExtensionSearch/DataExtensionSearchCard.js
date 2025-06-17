import React, { useEffect, useState } from "react";
import { useDataExtensionApi } from "../../../hooks/useDataExtensionApi";
import { useProgress } from "../../../hooks/useProgress";
import Button from "../../common/Button";
import Loader from "../../common/icons/Loader";
import MagnifyingGlass from "../../common/icons/MagnifyingGlass";
import Error from "../../common/messages/Error";
import Success from "../../common/messages/Success";

function DataExtensionSearchCard() {
  const { loading, error, selectedDe, fetchDe } = useDataExtensionApi();
  const [searchTerm, setSearchTerm] = useState(null);
  const { setCanProceedToNextStep } = useProgress();

  useEffect(() => {
    if (selectedDe) {
      setCanProceedToNextStep(true);
      setSearchTerm(selectedDe.externalKey);
    } else {
      setCanProceedToNextStep(false);
    }
  }, [selectedDe]);

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    fetchDe(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="flex flex-col border rounded-lg border-secondary-200 bg-white p-8">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          className="flex-[1] p-3 rounded-xl border border-secondary-300 font-mono"
          placeholder="Data Extension External Key..."
          onChange={handleInput}
          value={searchTerm}
          onKeyUp={handleKeyPress}
        />
        <Button
          onClick={searchTerm && searchTerm.length > 0 ? handleSearch : null}
          content="Search"
          icon={<MagnifyingGlass />}
          iconPosition={`left`}
          buttonColor={`bg-gradient-to-br from-primary-600 to-primary-600`}
          textColor={`text-secondary-100`}
        />
      </div>
      {selectedDe ? (
        <>
          <p className="mb-2">Data Extension Found:</p>
          <Success>
            <p className={`text-lg -mt-1 font-semibold`}>{selectedDe?.name}</p>
            <p className={`font-mono`}>{selectedDe?.externalKey}</p>
            <p className={`text-success-600 text-xs`}>
              {selectedDe?.fields.length}
              {selectedDe?.fields.length > 1 ? ` fields` : ` field`}
              {selectedDe?.sendableDeField ? " • Sendable" : null}
            </p>
          </Success>
        </>
      ) : null}
      {error ? <Error>{error}</Error> : null}
    </div>
    //46F82D8F-B4AA-4BD4-8151-F751448C6608
    //SERVER_ERROR
    //NOT_FOUND
  );
}

export default DataExtensionSearchCard;
