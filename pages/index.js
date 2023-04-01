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
      const response = await fetch(`/api/create-vote?id=${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      setResults(result);
      setIsSubmitting(false);
      setHasVoted(true);
    } catch (error) {
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
            <h1>Fuck yeah!</h1>
            <section>
              <div>
                <p>
                Почему сосульки и леденцы не назвали наоборот?
                </p>

                <div>
                  {!hasVoted ? (
                    <Fragment>
                      {config.map((item, index) => {
                        const { name, id } = item;

                        return (
                          <button
                            key={index}
                            onClick={() => handleClick(id)}
                            disabled={isSubmitting || error}
                          >
                            <span>{name}</span>
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
                          <div key={index}>
                            <span
                              style={{
                                width: `${percent}%`,
                              }}
                            />
                            <span>{name}</span>
                            <span>{`${percent}%`}</span>
                          </div>
                        );
                      })}
                    </Fragment>
                  )}
                </div>
                {hasVoted ? <p>{`${results.total} votes`}</p> : null}
                {error ? <p>{error.message}</p> : null}
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
