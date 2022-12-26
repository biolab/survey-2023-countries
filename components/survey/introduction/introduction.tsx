import styles from '@styles/survey/Introduction.module.scss';

export default function Introduction() {
  return (
    <div className={styles.introduction}>
      <h1>Moja sanjska država</h1>

      <p>
        Spoštovani, na Univerzi v Ljubljani želimo ugotoviti, kateri dejavniki
        so najbolj pomembni za srečno in zadovoljno življenje v Sloveniji. Del
        te raziskave uporablja rank lestvico nekaterih razvitih držav. In tu nam
        lahko pomagate vi. V spodnji anketi za pare držav prosimo označite
        državo iz para, v kateri bi raje živeli. Na koncu ankete vas bomo
        prosili še za nekaj demografskih podatkov ter predstavili – glede na
        vaše odgovore – v katerih državah bi vi najraje živeli. Odgovori so
        anonimni in prostovoljni. Za izpolnjevanje ankete boste porabili okoli
        pet minut.
      </p>

      <p>
        Začnimo s pari držav. Za spodnje parov držav prosimo označite, v kateri
        državi iz para bi raje prebivali. Vašo preferenco morate označite za vse
        pare. Vseh parov je 50, na vsaki strani vam bomo prikazali po 10 parov.
      </p>
    </div>
  );
}
