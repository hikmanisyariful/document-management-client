import style from "./ToggleSwitch.module.css";
import { useState } from "react";

export default function ToggleSwitch({
  checked = false,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (e: boolean) => Promise<boolean> | Promise<void> | void;
  disabled?: boolean;
}) {
  const [checkState, setCheckState] = useState(checked);

  return (
    <div className={style.switchContainer}>
      <label className={style.switch}>
        <input
          disabled={disabled}
          type="checkbox"
          checked={checkState}
          onChange={({ target: { checked } }) => {
            setCheckState(checked);
            onChange(checked)?.then((res) => {
              if (typeof res === "boolean") setCheckState(res);
            });
          }}
        />
        <span className={style.slider} aria-disabled={disabled}></span>
      </label>
    </div>
  );
}
