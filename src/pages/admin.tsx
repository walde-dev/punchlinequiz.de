/* eslint-disable @typescript-eslint/no-misused-promises */
import { InputHTMLAttributes, useState } from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { useAllSongs } from "~/api";
import Dropdown from "~/components/Dropdown";

type Tab = "punchline" | "artist" | "song" | "album";

export default function Admin() {
  const Tabs: Tab[] = ["punchline", "artist", "song", "album"];
  const [selectedForm, setSelectedForm] = useState<Tab>("punchline");

  return (
    <div className="mt-24">
      <span className="text-3xl font-semibold ">Add new value to table</span>
      <div className="mt-8 flex flex-row items-center justify-center space-x-2">
        {Tabs.map((tab) => (
          <TabButton
            key={tab}
            selected={tab === selectedForm}
            onClick={() => setSelectedForm(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabButton>
        ))}
      </div>
      <TableForm selectedForm={selectedForm} />
    </div>
  );
}

function PunchlineForm() {
  interface FormValues {
    punchline: string;
    solutions: string;
    artist: number;
    song: number;
    album: number;
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const { data: songs } = useAllSongs();

  const onSubmit = (data: FormValues) => {
    const solutions = data.solutions.split(",").map((s) => s.trim());
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2">
        <label htmlFor="punchline">Punchline</label>
        <input
          id="punchline"
          type="text"
          className="input"
          {...register("punchline", { required: true })}
        />
        <span className="text-gray-400">Seperate by using comma </span>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="solutions">Solutions</label>
        <input
          id="solutions"
          type="text"
          className="input"
          {...register("solutions", { required: true })}
        />
        <span className="text-gray-400">Seperate by using comma </span>
      </div>
      {/* <Dropdown
        items={songs?.map((song) => {
          return { id: song.id, name: song.name };
        })}
      /> */}
      <button type="submit" className="rounded-md bg-gray-800 px-4 py-2">
        Add
      </button>
    </form>
  );
}

function BasicForm() {
  interface FormValues {
    name: string;
    solutions: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const solutions = data.solutions.split(",").map((s) => s.trim());
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="input"
          {...register("name", { required: true })}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="solutions">Solutions</label>
        <input
          id="solutions"
          type="text"
          className="input"
          {...register("solutions", { required: true })}
        />
        <span className="text-gray-400">Seperate by using comma </span>
      </div>
      <button type="submit" className="rounded-md bg-gray-800 px-4 py-2">
        Add
      </button>
    </form>
  );
}

function TableForm({ selectedForm }: { selectedForm: Tab }) {
  return (
    <div className="mt-8">
      {selectedForm === "punchline" && <PunchlineForm />}
      {selectedForm === "artist" && <BasicForm />}
      {selectedForm === "song" && <BasicForm />}
      {selectedForm === "album" && <BasicForm />}
    </div>
  );
}

function TabButton({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-4 py-2 transition-all duration-300 ease-in-out ${
        selected ? "bg-gray-800" : ""
      }`}
    >
      {children}
    </button>
  );
}
