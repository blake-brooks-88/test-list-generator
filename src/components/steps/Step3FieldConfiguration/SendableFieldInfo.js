import React from "react";
import Info from "../../common/messages/Info";

function SendableFieldInfo({ sendableField }) {
  if (!sendableField) return null;

  return (
    <div className="mb-6">
      <Info>
        <div className="flex flex-col">
          <p className="font-semibold">Sendable Field Requirements</p>
          <p>
            "<span className="font-mono">{sendableField}</span>" is your
            sendable field and:
          </p>
          <ul>
            <li>
              <b>Cannot</b> be used for variance (would break targeting)
            </li>
            <li>
              <b>Must</b> be included in test data (required for sends)
            </li>
          </ul>
        </div>
      </Info>
    </div>
  );
}

export default SendableFieldInfo;
