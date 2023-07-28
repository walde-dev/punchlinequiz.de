import { useState } from "react";
import { Combobox } from "@headlessui/react";

export default function Dropdown({
  items,
  selectedItem,
  setSelectedItem,
}: {
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? items
      : items.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedItem} onChange={setSelectedItem}>
      <Combobox.Input
        className="input"
        onChange={(event) => setQuery(event.target.value)}
      />
      <Combobox.Options className="input">
        {filtered.map((item) => (
          <Combobox.Option
            className="rounded-lg py-2 outline-primary ring-primary transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-700"
            key={item}
            value={item}
          >
            {item}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
