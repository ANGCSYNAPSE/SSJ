"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { TextField } from "@/components/auth/TextField";
import { OTHER_CITY, citiesFor } from "@/lib/data/indiaCities";

export const selectClass =
  "h-9 w-full rounded-xl border-[1.5px] border-border bg-cream-light px-3 text-sm text-foreground outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

/**
 * The city, chosen from the cities of the state picked just before it. A place that is not in the list is typed in
 * under "Other". Until a state is chosen it is switched off and says so.
 */
export default function CityField({
  id,
  state,
  value,
  onChange,
  placeholder = "Your city",
}: {
  id: string;
  state: string;
  value: string;
  onChange: (city: string) => void;
  placeholder?: string;
}) {
  const cities = citiesFor(state);
  const [other, setOther] = useState(false);

  // A different state means a different list: start the choice again.
  useEffect(() => setOther(false), [state]);

  if (!state) {
    return (
      <select id={id} disabled className={selectClass} value="" onChange={() => undefined}>
        <option value="">Choose your state first</option>
      </select>
    );
  }
  // A state without a list (or an old saved value) is simply typed.
  if (cities.length === 0) {
    return <TextField id={id} icon={MapPin} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} autoComplete="address-level2" />;
  }

  const typed = other || (value !== "" && !cities.includes(value));

  return (
    <div className="flex flex-col gap-2">
      <select
        id={id}
        className={selectClass}
        value={typed ? OTHER_CITY : value}
        onChange={(e) => {
          if (e.target.value === OTHER_CITY) {
            setOther(true);
            onChange("");
          } else {
            setOther(false);
            onChange(e.target.value);
          }
        }}
      >
        <option value="">Select your city</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
        <option value={OTHER_CITY}>{OTHER_CITY}</option>
      </select>
      {typed && (
        <TextField id={`${id}-other`} icon={MapPin} placeholder="Type your city or town" value={value} onChange={(e) => onChange(e.target.value)} autoComplete="address-level2" />
      )}
    </div>
  );
}
