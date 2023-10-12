import style from "./ToggleSwitch.module.css";
import { useEffect, useState } from "react";

export default function ToggleSwitch({
  checked = false,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (e: boolean) => void;
  disabled?: boolean;
}) {
  const [checkState, setCheckState] = useState(checked);

  useEffect(() => {
    if (checked) {
      setCheckState(true);
    }
  }, [checked]);

  return (
    <div className={style.switchContainer}>
      <label className={style.switch}>
        <input
          disabled={disabled}
          type="checkbox"
          checked={checkState}
          onChange={({ target: { checked } }) => {
            setCheckState(checked);
            onChange(checked);
          }}
        />
        <span className={style.slider} aria-disabled={disabled}></span>
      </label>
    </div>
  );
}
