import { useState } from "react";
import { Listbox } from "@headlessui/react";

export default function Dropdown({ items }: { items: { id: number; name: string }[] }) {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  if (!selectedItem) return null;

  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      <Listbox.Button>{selectedItem.name}</Listbox.Button>
      <Listbox.Options>
        {items.map((item) => (
          <Listbox.Option key={item.id} value={item}>
            {item.id} - {item.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
