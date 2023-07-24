import { type Punchline, punchlines } from "~/punchlines/lines";
import classNames from "classnames";
import { UseFormRegister, useForm } from "react-hook-form";
import { use, useEffect, useState } from "react";
import { sanitizeString } from "~/lib/helpers";

export default function Home() {
  //random int from punchlines array
  const [punchline, setPunchline] = useState(0);

  useEffect(() => {
    setPunchline(Math.floor(Math.random() * punchlines.length));
  }, []);

  return (
    <div className="mt-36 flex w-full max-w-5xl flex-1 flex-col">
      {punchlines[punchline] && (
        <Quote
          punchline={punchlines[punchline]!}
          getNextLine={() =>
            setPunchline((punchline) => {
              return punchline === punchlines.length - 1 ? 0 : punchline + 1;
            })
          }
        />
      )}
    </div>
  );
}

export interface FormValues {
  answer: string;
  artist: string;
  song: string;
  album: string;
}

export function Quote({
  punchline,
  getNextLine,
}: {
  punchline: Punchline;
  getNextLine: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [submittedAnswer, setSubmittedAnswer] = useState<{
    answer: string;
    artist: string;
    song: string;
    album: string;
  }>({
    answer: "",
    artist: "",
    song: "",
    album: "",
  });
  const [correct, setCorrect] = useState<{
    answer: boolean;
    artist: boolean;
    song: boolean;
    album: boolean;
  }>({
    answer: false,
    artist: false,
    song: false,
    album: false,
  });

  const onSubmit = (data: FormValues) => {
    //check which input was submitted

    if (data.answer && !correct.answer) {
      setSubmittedAnswer((submittedAnswer) => {
        return {
          ...submittedAnswer,
          answer: data.answer,
        };
      });
      //check if answer is correct
      const isAnswerCorrect = punchline.solutions.some((word, index) => {
        return sanitizeString(word) === sanitizeString(data.answer);
      });

      setCorrect((correct) => {
        return {
          ...correct,
          answer: isAnswerCorrect,
        };
      });

      const input = document.getElementById("answer_input");
      if (input) {
        if (isAnswerCorrect) {
          input.classList.add("border-primary");
          input.classList.remove("border-red-500", "border-white/60");
        } else {
          input.classList.add("border-red-500");
          input.classList.remove("border-white/60");
          input.classList.add("animate-shake");
          setTimeout(() => {
            input.classList.remove("border-red-500", "animate-shake");
          }, 1000);
        }
      }
    }

    if (data.artist && !correct.artist) {
      setSubmittedAnswer((submittedAnswer) => {
        return {
          ...submittedAnswer,
          artist: data.artist,
        };
      });
      const isArtistCorrect = punchline.artist.solutions.some((word, index) => {
        return sanitizeString(word) === sanitizeString(data.artist);
      });
      setCorrect((correct) => {
        return {
          ...correct,
          artist: isArtistCorrect,
        };
      });

      const input = document.getElementById("artist_input");
      if (input) {
        if (isArtistCorrect) {
          input.classList.add("border-primary");
          input.classList.remove("border-red-500", "border-white/60");
        } else {
          input.classList.add("border-red-500");
          input.classList.remove("border-white/60");
          input.classList.add("animate-shake");
          setTimeout(() => {
            input.classList.remove("border-red-500", "animate-shake");
          }, 1000);
        }
      }
    }

    if (data.song && !correct.song) {
      setSubmittedAnswer((submittedAnswer) => {
        return {
          ...submittedAnswer,
          song: data.song,
        };
      });
      const isSongCorrect = punchline.song.solutions.some((word, index) => {
        return sanitizeString(word) === sanitizeString(data.song);
      });
      setCorrect((correct) => {
        return {
          ...correct,
          song: isSongCorrect,
        };
      });

      const input = document.getElementById("song_input");
      if (input) {
        if (isSongCorrect) {
          input.classList.add("border-primary");
          input.classList.remove("border-red-500", "border-white/60");
        } else {
          input.classList.add("border-red-500");
          input.classList.remove("border-white/60");
          input.classList.add("animate-shake");
          setTimeout(() => {
            input.classList.remove("border-red-500", "animate-shake");
          }, 1000);
        }
      }
    }

    if (data.album && !correct.album) {
      setSubmittedAnswer((submittedAnswer) => {
        return {
          ...submittedAnswer,
          album: data.album,
        };
      });
      const isAlbumCorrect = punchline.album.solutions.some((word, index) => {
        return sanitizeString(word) === sanitizeString(data.album);
      });
      setCorrect((correct) => {
        return {
          ...correct,
          album: isAlbumCorrect,
        };
      });

      const input = document.getElementById("album_input");
      if (input) {
        if (isAlbumCorrect) {
          input.classList.add("border-primary");
          input.classList.remove("border-red-500", "border-white/60");
        } else {
          input.classList.add("border-red-500");
          input.classList.remove("border-white/60");
          input.classList.add("animate-shake");
          setTimeout(() => {
            input.classList.remove("border-red-500", "animate-shake");
          }, 1000);
        }
      }
    }
  };

  const answer = watch("answer");

  return (
    <div className="relative">
      <div className="relative flex flex-col space-y-6 rounded-3xl border border-primary/50 p-8 font-quote">
        {punchline.unsolved.map((word, index) => (
          <p key={index} className="inline-block text-5xl">
            {word}{" "}
            {index === punchline.unsolved.length - 1 && (
              <span
                className={` ${
                  correct.answer
                    ? "underline decoration-primary"
                    : !!submittedAnswer && "underline decoration-red-500"
                }`}
              >
                {!!submittedAnswer.answer
                  ? correct.answer
                    ? punchline.solved
                    : submittedAnswer.answer
                  : "_____"}
              </span>
            )}
          </p>
        ))}
        {correct.answer && (
          <div className="absolute bottom-0 right-0 translate-y-full pt-2 font-sans text-lg">
            <span className="">
              {correct.artist ? punchline.artist.solved : "_____"} -{" "}
              {correct.song ? punchline.song.solved : "_____"},{" "}
              {correct.album ? punchline.album.solved : "_____"} -{" "}
              {punchline.year}
            </span>
          </div>
        )}
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-full transform"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.795 9.18754C12.4162 13.2825 9.31875 17.5088 9.31875 24.57C9.73875 24.4388 10.1062 24.4388 10.4738 24.4388C13.8075 24.4388 17.0362 26.6963 17.0362 30.765C17.0362 34.9913 14.3325 37.6163 10.4738 37.6163C5.48625 37.6163 2.625 33.6263 2.625 26.46C2.625 16.485 7.21875 9.31879 15.8025 4.35754L18.795 9.18754ZM37.17 9.18754C30.7913 13.2825 27.6938 17.5088 27.6938 24.57C28.1138 24.4388 28.4812 24.4388 28.8487 24.4388C32.1825 24.4388 35.4113 26.6963 35.4113 30.765C35.4113 34.9913 32.7075 37.6163 28.8487 37.6163C23.8875 37.6163 21.0263 33.6263 21.0263 26.46C21.0263 16.485 25.62 9.31879 34.2037 4.35754L37.1963 9.18754H37.17Z"
            fill="#FAFAFA"
          />
        </svg>
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/4 transform"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.795 9.18754C12.4162 13.2825 9.31875 17.5088 9.31875 24.57C9.73875 24.4388 10.1062 24.4388 10.4738 24.4388C13.8075 24.4388 17.0362 26.6963 17.0362 30.765C17.0362 34.9913 14.3325 37.6163 10.4738 37.6163C5.48625 37.6163 2.625 33.6263 2.625 26.46C2.625 16.485 7.21875 9.31879 15.8025 4.35754L18.795 9.18754ZM37.17 9.18754C30.7913 13.2825 27.6938 17.5088 27.6938 24.57C28.1138 24.4388 28.4812 24.4388 28.8487 24.4388C32.1825 24.4388 35.4113 26.6963 35.4113 30.765C35.4113 34.9913 32.7075 37.6163 28.8487 37.6163C23.8875 37.6163 21.0263 33.6263 21.0263 26.46C21.0263 16.485 25.62 9.31879 34.2037 4.35754L37.1963 9.18754H37.17Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 flex flex-col items-center justify-center space-y-4"
      >
        <InputField
          register={register}
          correct={correct.answer}
          answer={answer}
          name="answer"
          placeholder="Wie geht die Line weiter?"
        />
        {!!errors && (
          <span className="text-lg text-red-400">{errors.answer?.message}</span>
        )}

        {correct.answer && (
          <InputField
            register={register}
            correct={correct.artist}
            answer={answer}
            name="artist"
            placeholder="Wer hat diese Line gerappt?"
          />
        )}

        {correct.answer && correct.artist && (
          <InputField
            register={register}
            correct={correct.song}
            answer={answer}
            name="song"
            placeholder="Wie heißt der Song?"
          />
        )}

        {correct.answer && correct.artist && correct.song && (
          <InputField
            register={register}
            correct={correct.album}
            answer={answer}
            name="album"
            placeholder="Wie heißt das Album?"
          />
        )}

        {correct.answer && correct.artist && correct.song && correct.album && (
          <div className="mt-24 text-2xl">
            <span className="text-primary">Richtig!</span>
          </div>
        )}
      </form>

      {correct.answer && (
        <button
          className="mt-24 text-2xl"
          onClick={() => {
            setCorrect({
              answer: false,
              artist: false,
              song: false,
              album: false,
            });
            setSubmittedAnswer({
              answer: "",
              artist: "",
              song: "",
              album: "",
            });
            setValue("answer", "");
            setValue("artist", "");
            setValue("song", "");
            setValue("album", "");
            getNextLine();
          }}
        >
          Nächste Line <span className="text-primary">→</span>
        </button>
      )}
    </div>
  );
}

export function InputField({
  register,
  correct,
  answer,
  name,
  placeholder,
}: {
  register: UseFormRegister<FormValues>;
  correct: boolean;
  answer: string;
  name: keyof FormValues;
  placeholder?: string;
}) {
  return (
    <div
      className={classNames(
        "flex w-full flex-row items-center justify-center space-x-2 rounded-lg border border-white/60 bg-transparent transition-all duration-500 ease-in-out "
      )}
      id={name + "_input"}
    >
      <input
        className={classNames(
          "flex flex-1 rounded-lg  bg-transparent py-2 text-center text-xl focus:outline-none"
        )}
        {...register(name, {
          required: true,
          validate: (value) => {
            if (value.length > 50) {
              return "Maximale Länge überschritten";
            }
            return true;
          },
        })}
        type="text"
        placeholder={placeholder}
        disabled={correct}
      />{" "}
      <div className="px-4">
        {correct ? (
          <span className="text-xl text-primary">Richtig!</span>
        ) : (
          <button
            type="submit"
            disabled={!answer || correct}
            className="w-full text-xl font-medium opacity-100 transition-all duration-500 ease-in disabled:opacity-0"
          >
            <span className="text-primary">→</span>
          </button>
        )}
      </div>
    </div>
  );
}
