import { type Punchline, punchlines } from "~/punchlines/lines";
import classNames from "classnames";
import { UseFormRegister, useForm } from "react-hook-form";
import { useState } from "react";

export default function Home() {
  const [punchline, setPunchline] = useState(0);

  return (
    <div className="mt-36 flex w-full max-w-5xl flex-1 flex-col">
      {punchlines[punchline] && (
        <Quote
          punchline={punchlines[punchline]}
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
  const onSubmit = (data: FormValues) => {
    setSubmittedAnswer(data.answer);
    //check if answer is correct
    const correct = punchline.solutions.some((word, index) => {
      return (
        word
          .toLocaleLowerCase()
          .replaceAll("-", "")
          .replaceAll("'", "")
          .replaceAll("`", "")
          .replaceAll(".", "")
          .replaceAll(" ", "") ===
        data.answer
          .toLocaleLowerCase()
          .replaceAll("-", "")
          .replaceAll("'", "")
          .replaceAll("`", "")
          .replaceAll(".", "")
          .replaceAll(" ", "")
      );
    });
    setLineCorrect(correct);
  };

  const answer = watch("answer");

  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [lineCorrect, setLineCorrect] = useState(false);

  console.log(answer);

  return (
    <div className="relative">
      <div className="relative flex flex-col space-y-6 rounded-3xl border border-primary/50 p-8 font-quote">
        {punchline.unsolved.map((word, index) => (
          <p key={index} className="inline-block text-5xl">
            {word}{" "}
            {index === punchline.unsolved.length - 1 && (
              <span
                className={`underline ${
                  lineCorrect ? "decoration-primary" : "decoration-red-500"
                }`}
              >
                {!!submittedAnswer
                  ? lineCorrect
                    ? punchline.solved
                    : submittedAnswer
                  : "_____"}
              </span>
            )}
          </p>
        ))}
        {lineCorrect && (
          <div className="absolute bottom-0 right-0 translate-y-full pt-2 font-sans text-lg">
            <span className="">
              {punchline.artist} - {punchline.song}, {punchline.album} -{" "}
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
            fill-rule="evenodd"
            clip-rule="evenodd"
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.795 9.18754C12.4162 13.2825 9.31875 17.5088 9.31875 24.57C9.73875 24.4388 10.1062 24.4388 10.4738 24.4388C13.8075 24.4388 17.0362 26.6963 17.0362 30.765C17.0362 34.9913 14.3325 37.6163 10.4738 37.6163C5.48625 37.6163 2.625 33.6263 2.625 26.46C2.625 16.485 7.21875 9.31879 15.8025 4.35754L18.795 9.18754ZM37.17 9.18754C30.7913 13.2825 27.6938 17.5088 27.6938 24.57C28.1138 24.4388 28.4812 24.4388 28.8487 24.4388C32.1825 24.4388 35.4113 26.6963 35.4113 30.765C35.4113 34.9913 32.7075 37.6163 28.8487 37.6163C23.8875 37.6163 21.0263 33.6263 21.0263 26.46C21.0263 16.485 25.62 9.31879 34.2037 4.35754L37.1963 9.18754H37.17Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 grid grid-cols-2 items-center justify-between space-x-3"
      >
        <input
          className={classNames(
            "flex flex-1 rounded-lg border border-white/60  bg-transparent py-2 text-center text-xl focus:outline-none"
          )}
          {...register("answer")}
          type="text"
          placeholder="Wie geht die Line weiter?"
          disabled={lineCorrect}
        />{" "}
        <div className="px-10">
          {lineCorrect ? (
            <span className="text-xl text-primary">Richtig!</span>
          ) : (
            <button
              type="submit"
              disabled={!answer || lineCorrect}
              className="w-full text-xl font-medium opacity-100 transition-all duration-500 ease-in disabled:opacity-0"
            >
              einreichen <span className="text-primary">→</span>
            </button>
          )}
        </div>
      </form>
      {lineCorrect && (
        <button
          className="mt-24 text-2xl"
          onClick={() => {
            setLineCorrect(false);
            setSubmittedAnswer("");
            setValue("answer", "");
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
  className,
  register,
}: {
  className?: string;
  register?: UseFormRegister<FormValues>;
}) {
  return (
    <input
      className={classNames(
        className,
        "flex flex-1 rounded-lg border border-white/60  bg-transparent py-2 text-center text-xl focus:outline-none"
      )}
      {...register}
      type="text"
      placeholder="Wie geht die Line weiter?"
    />
  );
}
