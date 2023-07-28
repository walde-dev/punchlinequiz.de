/* eslint-disable @typescript-eslint/no-misused-promises */
import { InputHTMLAttributes, useEffect, useState } from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  addAlbum,
  addArtist,
  addPunchline,
  addSong,
  getAlbums,
  getArtists,
  getRandomPunchline,
  getSongs,
} from "~/lib/api";
import Dropdown from "~/components/Dropdown";
import { ArtistModel, SongModel } from "prisma/zod";
import { z } from "zod";

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
    answer: string;
    solutions: string;
  }

  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { data: songs, refetch: refetchSongs } = useQuery(
    ["getSongs"],
    getSongs,
    {
      // staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const { data: artists, refetch: refetchArtists } = useQuery(
    ["getArtists"],
    getArtists,
    {
      // staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const {
    mutate: addPunchlineMutation,
    isLoading: addPunchlineMutationLoading,
  } = useMutation(["addPunchline"], addPunchline, {
    onError: (error) => {
      if (error instanceof Error) setError(error.message);
    },
    onSuccess: () => {
      reset();
    },
  });

  const {
    data: randomPunchline,
    isLoading,
    refetch,
  } = useQuery(["getRandomPunchline"], getRandomPunchline);

  const onSubmit = (data: FormValues) => {
    if (!artists) return console.log("Artists not found");
    if (!songs) return console.log("Songs not found");

    const artistId = artists?.find(
      (artist) => artist.solved === selectedArtist
    )?.id;

    const songId = songs?.find((song) => song.solved === selectedSong)?.id;

    if (!artistId) return console.log("Artist not found");
    if (!songId) return console.log("Song not found");

    try {
      addPunchlineMutation({
        artistId,
        songId,
        solutions: data.solutions,
        solved: data.punchline,
        answer: data.answer,
      });
    } catch (error) {
      console.log(error);
    }
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
        <span className="text-gray-400">Seperate by using ; </span>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="solutions">Solutions</label>
        <input
          id="solutions"
          type="text"
          className="input"
          {...register("solutions", { required: true })}
        />
        <span className="text-gray-400">Seperate by using ; </span>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="unsolved">Answer</label>
        <input
          id="unsolved"
          type="text"
          className="input"
          {...register("answer", { required: true })}
        />
        <span className="text-gray-400">Seperate by using ; </span>
      </div>
      {!!artists && (
        <>
          <label htmlFor="artist">Artist</label>
          <Dropdown
            items={artists?.map((artist) => {
              return artist.solved;
            })}
            selectedItem={selectedArtist}
            setSelectedItem={setSelectedArtist}
          />
        </>
      )}
      {!!songs && selectedArtist && (
        <>
          <label htmlFor="songs">Song</label>
          <Dropdown
            items={songs
              ?.filter((song) =>
                song.Artist?.some((artist) => artist.solved === selectedArtist)
              )
              .map((song) => {
                return song.solved;
              })}
            selectedItem={selectedSong}
            setSelectedItem={setSelectedSong}
          />
        </>
      )}
      <button
        disabled={addPunchlineMutationLoading}
        type="submit"
        className="rounded-md bg-gray-800 px-4 py-2 disabled:opacity-50"
      >
        {addPunchlineMutationLoading ? "Adding..." : "Add"}
      </button>
      <span className="text-sm text-red-500">{error}</span>
    </form>
  );
}

function ArtistForm() {
  interface FormValues {
    name: string;
    solutions: string;
  }

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate: addArtistMutation, isLoading: addArtistMutationLoading } =
    useMutation(["addArtist"], addArtist, {
      onError: (error) => {
        if (error instanceof Error) setError(error.message);
      },
    });

  const onSubmit = (data: FormValues) => {
    try {
      addArtistMutation({
        solved: data.name,
        solutions: data.solutions,
      });
    } catch (error) {
      console.log(error);
    }
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
      <button
        disabled={addArtistMutationLoading}
        type="submit"
        className="rounded-md bg-gray-800 px-4 py-2 disabled:opacity-50"
      >
        {addArtistMutationLoading ? "Adding..." : "Add"}
      </button>
      <span className="text-sm text-red-500">{error}</span>
    </form>
  );
}

function AlbumForm() {
  interface FormValues {
    name: string;
    solutions: string;
    artist: number;
  }

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      artist: 0,
    },
  });

  const [selectedArtist, setSelectedArtist] = useState("");

  const { mutate: addAlbumMutation, isLoading: addAlbumMutationLoading } =
    useMutation(["addAlbum"], addAlbum, {
      onError: (error) => {
        if (error instanceof Error) setError(error.message);
      },
      onSuccess: () => {
        reset();
      },
    });

  const { data: artists } = useQuery(["getArtists"], getArtists, {
    // staleTime: 1000 * 60 * 60 * 24,
  });

  const onSubmit = (data: FormValues) => {
    if (!artists) return console.log("Artists not found");

    const artistId = artists.find(
      (artist) => artist.solved === selectedArtist
    )?.id;

    if (!artistId) return console.log("Artist not found");
    try {
      addAlbumMutation({
        solved: data.name,
        solutions: data.solutions,
        artistId: artistId,
      });
    } catch (error) {
      console.log(error);
    }
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
      {!!artists && (
        <>
          <label htmlFor="artist">Artist</label>
          <Dropdown
            items={artists?.map((artist) => {
              return artist.solved;
            })}
            selectedItem={selectedArtist}
            setSelectedItem={setSelectedArtist}
          />
        </>
      )}
      <button
        disabled={addAlbumMutationLoading}
        type="submit"
        className="rounded-md bg-gray-800 px-4 py-2 disabled:opacity-50"
      >
        {addAlbumMutationLoading ? "Adding..." : "Add"}
      </button>
      <span className="text-sm text-red-500">{error}</span>
    </form>
  );
}

function SongForm() {
  interface FormValues {
    name: string;
    solutions: string;
    artist: number;
    album: number;
  }

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      artist: 0,
      album: 0,
    },
  });

  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");

  const { mutate: addSongMutation, isLoading: addSongMutationLoading } =
    useMutation(["addSong"], addSong, {
      onError: (error) => {
        if (error instanceof Error) setError(error.message);
      },
      onSuccess: () => {
        reset();
      },
    });

  const { data: artists } = useQuery(["getArtists"], getArtists, {
    // staleTime: 1000 * 60 * 60 * 24,
  });

  const { data: albums } = useQuery(["getAlbums"], getAlbums, {
    // staleTime: 1000 * 60 * 60 * 24,
  });

  const onSubmit = (data: FormValues) => {
    if (!artists) return console.log("Artists not found");
    if (!albums) return console.log("Albums not found");

    const artistId = artists.find(
      (artist) => artist.solved === selectedArtist
    )?.id;

    const albumId = albums.find((album) => album.solved === selectedAlbum)?.id;

    if (!artistId) return console.log("Artist not found");
    if (!albumId) return console.log("Album not found");

    try {
      addSongMutation({
        solved: data.name,
        solutions: data.solutions,
        artistId: artistId,
        albumId: albumId,
      });
    } catch (error) {
      console.log(error);
    }
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
      {!!artists && (
        <>
          <label htmlFor="artist">Artist</label>
          <Dropdown
            items={artists?.map((artist) => {
              return artist.solved;
            })}
            {...register("artist", { required: true })}
            selectedItem={selectedArtist}
            setSelectedItem={setSelectedArtist}
          />
        </>
      )}
      {!!albums && !!selectedArtist && (
        <>
          <label htmlFor="album">Albums</label>
          <Dropdown
            items={albums
              ?.filter((album) => {
                return album.Artist?.some(
                  (artist) => artist.solved === selectedArtist
                );
              })
              .map((album) => {
                return album.solved;
              })}
            {...register("album", { required: true })}
            selectedItem={selectedAlbum}
            setSelectedItem={setSelectedAlbum}
          />
        </>
      )}
      <button
        disabled={addSongMutationLoading}
        type="submit"
        className="rounded-md bg-gray-800 px-4 py-2 disabled:opacity-50"
      >
        {addSongMutationLoading ? "Adding..." : "Add"}
      </button>
      <span className="text-sm text-red-500">{error}</span>
    </form>
  );
}

function TableForm({ selectedForm }: { selectedForm: Tab }) {
  return (
    <div className="mt-8">
      {selectedForm === "punchline" && <PunchlineForm />}
      {selectedForm === "artist" && <ArtistForm />}
      {selectedForm === "song" && <SongForm />}
      {selectedForm === "album" && <AlbumForm />}
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

//getStaticProps

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getSongs"], getSongs);
  await queryClient.prefetchQuery(["getArtists"], getArtists);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
