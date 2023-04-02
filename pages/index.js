import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { Fragment, useEffect, useState } from "react";

const config = [
  {
    name: "Да",
    id: "yes",
  },
  {
    name: "Нет",
    id: "no",
  },
  {
    name: "Смешная третья опция",
    id: "funny_third",
  },
];

export default function Home() {
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  const handleClick = async (id) => {
    setIsSubmitting(true);
    try {
      console.log("try");
      const response = await fetch(`/api/create-poll?id=${id}`);
      if (!response.ok) {
        console.log(response.statusText);
        throw new Error(response.statusText);
      }
      const result = await response.json();
      setResults(result);
      setIsSubmitting(false);
      setHasVoted(true);
    } catch (error) {
      console.log("error.message");
      setIsSubmitting(false);
      setError({
        error: true,
        message: error.message,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Poll test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.page}>
          <div className={styles.poll}>
            <h1 className={styles.fuck}>Ω</h1>
            <section>
              <div>
                <p className={styles.question}>Почему сосульки и леденцы не назвали наоборот?</p>

                <div className={styles.buttons_wrap}>
                  {!hasVoted ? (
                    <Fragment>
                      {config.map((item, index) => {
                        const { name, id } = item;

                        return (
                          <button
                            key={index}
                            onClick={() => handleClick(id)}
                            disabled={isSubmitting || error}
                            className={styles.button}
                          >
                            <span className={styles.button_text}>{name}</span>
                            <span></span>
                          </button>
                        );
                      })}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {results.data.map((result, index) => {
                        const { percent, isMax } = result;
                        const name = config[index].name;

                        return (
                          <button
                            key={index}
                            className={styles.button_pressed}
                            
                          >
                            <span className={styles.button_text}>{name}</span>
                            <span>{`${percent}%`}</span>
                          </button>
                        );
                      })}
                    </Fragment>
                  )}
                </div>
                {hasVoted ? <p className={styles.question}>{`${results.total} votes`}</p> : null}
                {error ? <p className={styles.question}>{error.message}</p> : null}
              </div>
            </section>
          </div>
          <div className={styles.footer}>
            <a
              href="https://www.flaticon.com/free-icons/lollipop"
              title="lollipop icons"
            >
              Lollipop icons created by Smashicons - Flaticon
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
