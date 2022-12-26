import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.scss';
import Survey from '../components/survey/survey';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Country survey</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Survey />
        </div>
      </main>
    </>
  );
}
