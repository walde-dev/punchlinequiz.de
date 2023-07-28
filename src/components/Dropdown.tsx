import { Fragment, forwardRef, useState } from "react";
import { Combobox } from "@headlessui/react";

// const Dropdown = r({
//   items,
//   selectedItem,
//   setSelectedItem,
//   innerRef,
// }: {
//   items: string[];
//   selectedItem: string;
//   setSelectedItem: (item: string) => void;
//   innerRef: React.RefObject<HTMLInputElement>;

interface Props {
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

const Dropdown = (props: Props) => {
  const [query, setQuery] = useState("");

  const filtered =
    query === "" || query === null || query === undefined
      ? props.items
      : props.items.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={props.selectedItem} onChange={props.setSelectedItem}>
      <Combobox.Button as="div">
        <Combobox.Input
          className="input w-full"
          onChange={(event) => setQuery(event.target.value)}
        />
      </Combobox.Button>

      <Combobox.Options className="input mt-2">
        {filtered.map((item) => (
          <Combobox.Option
            className="rounded-lg py-1 outline-primary ring-primary transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-700"
            key={item}
            value={item}
          >
            {item}
          </Combobox.Option>
        ))}
        {filtered.length === 0 && !!query && (
          <span className="block px-2 py-1 text-gray-400">
            No results found
          </span>
        )}
      </Combobox.Options>
    </Combobox>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
