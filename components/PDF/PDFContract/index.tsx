import {
    Document,
    Font,
    Page,
    Image,
    View,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";
import { ICompany } from "../../../models/company";
import { IDealMemo } from "../../../models/deal-memo";
import { IPerson } from "../../../models/person";
import { IVenue } from "../../../models/venue";
import { IWorkplace } from "../../../models/workplace";
import ListItem from "../Components/ListItem";

export interface PDFContractProps {
    bandName: string;
    bandCompany: ICompany;
    bandResponsiblePerson?: IPerson;
    loproCompany: ICompany;
    loproPerson: IPerson;
    venue: IVenue;
    dealMemo: IDealMemo;
    workplace: IWorkplace;
    performance?: string;
    duration?: string;
    information?: string;
    amount?: number;
}

export default function PDFContract({
    bandName,
    bandCompany,
    bandResponsiblePerson,
    loproCompany,
    loproPerson,
    venue,
    dealMemo,
    workplace,
    performance,
    duration,
    information,
    amount,
}: PDFContractProps) {
    Font.registerHyphenationCallback((word) => [word]);

    const createDateString = (date: Date): string => {
        const month = date.getMonth() + 1;
        const dateMonth = month > 9 ? month : `0${month}`;
        return `${date.getDate()}.${dateMonth}.${date.getFullYear()}`;
    };

    const dateStr = createDateString(new Date());
    const dealDateStr = createDateString(new Date(dealMemo.date));

    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 45,
            fontSize: 12,
            fontFamily: "Helvetica",
        },
        title: {
            fontSize: 18,
            textAlign: "center",
            textDecoration: "underline",
            fontWeight: "bold",
            fontFamily: "Helvetica-Bold",
        },
        headlines: {
            fontSize: 14,
            textDecoration: "underline",
            fontWeight: "bold",
            fontFamily: "Helvetica-Bold",
        },
        big: {
            fontWeight: "bold",
            textAlign: "justify",
            fontFamily: "Helvetica-Bold",
        },
        address: {
            textAlign: "justify",
        },
        addressView: {
            marginTop: 12,
            marginBottom: 12,
        },
        text: {
            textAlign: "justify",
        },
        image: {
            marginHorizontal: 15,
            width: 200,
            textAlign: "center",
        },
        pageNumber: {
            position: "absolute",
            fontSize: 10,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
        },
        view: {
            marginTop: 12,
            marginBottom: 12,
        },
        addressIt: {
            textAlign: "justify",
            fontStyle: "italic",
        },
    });

    const doc = (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.title}>KONZERTVERTRAG</Text>
                <View style={styles.view}>
                    <Text style={styles.big}>
                        zwischen Vertragspartner (VP1):
                    </Text>
                    {/* Is band company */}
                    <View style={styles.addressView}>
                        <Text
                            style={styles.address}
                            render={() =>
                                `${bandName} \n ${bandCompany.address.street} ${bandCompany.address.streetNumber} ${bandCompany.address.addressSuffix} \n ${bandCompany.address.zipCode} ${bandCompany.address.city}`
                            }
                        />
                    </View>
                    <Text style={styles.big}>vertreten durch:</Text>
                    <Text
                        style={styles.addressIt}
                        render={() =>
                            `${workplace.name}, ${workplace.address.street} ${workplace.address.streetNumber}, ${workplace.address.zipCode} ${workplace.address.city}`
                        }
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.big}>und Vertragspartner (VP2):</Text>
                    {/* Is local promoter */}
                    <View style={styles.addressView}>
                        <Text
                            style={styles.address}
                            render={() =>
                                `${loproCompany.name} \n ${loproCompany.address.street} ${loproCompany.address.streetNumber} ${loproCompany.address.addressSuffix} \n ${loproCompany.address.zipCode} ${loproCompany.address.city}`
                            }
                        />
                    </View>
                    <Text style={styles.big}>vertreten durch:</Text>
                    <Text
                        style={styles.addressIt}
                        render={() =>
                            `${loproPerson.firstName} ${loproPerson.lastName}, ${loproPerson.contact.mobilePhone}, ${loproPerson.contact.email}`
                        }
                    ></Text>
                </View>

                <Text style={styles.text}>
                    Künstlersozialkassen-Nummer von „VP2“ (bitte eintragen -
                    falls bekannt):
                </Text>

                {/* ADD VAT AND KSK => add entry to company */}

                <View style={styles.view}>
                    <Text style={styles.big}>
                        gilt folgendes als vereinbart:
                    </Text>
                </View>

                <View style={styles.view}>
                    <Text style={styles.headlines}>1. Engagement</Text>
                    <View style={styles.view}>
                        <Text
                            style={styles.big}
                            render={() =>
                                `Gegenstand dieses Vertrages ist die Durchführung eines Konzertes von örtlichen Veranstalter (VP2) mit der Gruppe/Künstler ${bandName} (VP1) am ${dealDateStr} in der Location '${venue.name}' zu den hier aufgeführten Bedingungen:`
                            }
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Diese Vereinbarung stellt eine schriftliche
                            Bestätigung der bereits getroffenen Vereinbarungen
                            dar und dient dazu, sämtliche den Auftritt des
                            Künstlers (VP1) betreffende Fragen im Voraus
                            verbindlich zu klären. VP1 stellt die
                            Tourneeproduktion, Backline, Künstlertransport,
                            Tourneepersonal. VP2 als örtlicher Veranstalter
                            trägt sämtliche vor Ort anfallenden Kosten und die
                            Kosten der Bühnenanweisung, wie u.a. Hallenmiete
                            inkl. Nebenkosten, P.A. & Licht, Hotel, Catering,
                            Werbung, Sicherungs- und Ordnungsdienst, Gema, KSK,
                            Versicherungsprämie für den in seinen Bereich
                            fallenden Versicherungsschutz, Steuern und Abgaben
                            seines Bereiches. Hierfür trägt er auch die
                            alleinige Haftung und stellt VP1 von jeder Haftung
                            frei. Details regeln die Bühnenanweisung von VP1 und
                            weitere Punkte in diesem Vertrag. Eine räumliche und
                            zeitliche Exklusivität wurde nicht vereinbart.
                        </Text>
                    </View>
                    <View style={styles.addressView}>
                        <Text>Es handelt sich um folgendes Programm:</Text>
                        <Text
                            style={[styles.address, styles.big]}
                            render={() => `Auftrittszeit: ${performance}`}
                        />
                        <Text
                            style={[styles.address, styles.big]}
                            render={() => `Spieldauer: ${duration}`}
                        />
                        <Text
                            style={[styles.address, styles.big]}
                            render={() =>
                                information ? `Info: ${information}` : ""
                            }
                        />
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        2. Honorar / Produktionskosten
                    </Text>
                    <View style={styles.view}>
                        <Text
                            style={styles.text}
                            render={() =>
                                `Als Honorar ist vereinbart: VP1 erhält ${dealMemo.deal}`
                            }
                        ></Text>
                    </View>
                </View>
                <View style={styles.view} break>
                    <Text style={styles.headlines}>3. Abrechnung</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Die Fixgage sowie eine etwaige Eintritts
                            Einnahmenbeteiligung ist im Anschluss nach Erhalt
                            der Rechnungen per Banküberweisung auf folgendes
                            Konto zu überweisen.
                        </Text>
                    </View>
                    <View style={styles.addressView}>
                        <Text
                            style={styles.address}
                            render={() =>
                                `Kontoinh.: ${bandCompany.bank.accountHolder}`
                            }
                        />
                        <Text
                            style={styles.address}
                            render={() => `Bank: ${bandCompany.bank.bankName}`}
                        />
                        <Text
                            style={styles.address}
                            render={() => `IBAN: ${bandCompany.bank.iban}`}
                        />
                        <Text
                            style={styles.address}
                            render={() => `BIC: ${bandCompany.bank.bic}`}
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Bei einer Eintritts Einnahmenbeteiligung der
                            Künstler (VP1) hat der Vertreter der Künstler das
                            Recht, jederzeit Kartensätze, Vorverkauf und
                            Abendkasse, sowie die Auflistung der örtlichen
                            Kosten zu überprüfen und zu überwachen. Kosten die
                            nicht vorzuweisen sind, werden nicht anerkannt.
                            Sollte der lokale Veranstalter die Eintrittskarten
                            nicht über den Tournee-Veranstalter bezogen haben,
                            so sind die Original-Lieferscheine der Druckerei vor
                            Einlass dem Tour-Manager vorzulegen. Die
                            Eintrittskarten müssen unbedingt durchnummeriert
                            sein!!! Sollten die gedruckten Tickets an
                            Vorverkaufsstellen ausgeliefert worden sein, so sind
                            diese mit einem Lieferschein am Veranstaltungstag zu
                            belegen. Nicht retournierte Tickets gelten als
                            verkauft.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        4. Anmeldungen, GEMA, KSK und Steuern
                    </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 ist verpflichtet die Veranstaltung der GEMA zu
                            melden. Sämtliche aus der Veranstaltung anfallenden
                            Steuern, Abgaben und GEMA sind zu 100% von VP2 zu
                            zahlen.
                        </Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Für die Meldung und Abführung der KSK-Beiträge ist
                            der Veranstalter (VP2) verantwortlich. Der KSK
                            Beitrag ist nicht Bestandteil des Honorars von VP1.
                        </Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 verpflichtet sich, das Konzert bei den
                            zuständigen Behörden fristgemäß anzumelden und alle
                            notwendigen Genehmigungen einzuholen.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>5. Technik / Personal</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Der Veranstalter stellt die Ton- und Lichttechnik
                            und das zur Bedienung selbiger nötige Fachpersonal
                            laut anliegender Bühnenanweisung (Technikrider). VP2
                            gewährleistet, dass der für die Produktion
                            verantwortliche Techniker spätestens 8-10 Tage vor
                            der Veranstaltung den Ansprechpartner von VP1
                            kontaktiert zum Zwecke der gegenseitigen Absprache.
                        </Text>
                    </View>
                    <View style={styles.view}>
                        <Text
                            style={styles.text}
                            render={() =>
                                `Ansprechpartner VP1:${workplace.name}, ${bandResponsiblePerson?.firstName} ${bandResponsiblePerson?.lastName}, ${bandResponsiblePerson?.contact.email}`
                            }
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 stellt ab Aufbaubeginn für den Backline Auf-und
                            Abbau mindestens zwei nüchterne, kräftige und
                            volljährige Helfer, die das Equipment selbständig
                            vom LKW/Sprinter zur Bühne und nach Konzertende von
                            der Bühne zum LKW/Sprinter befördern, sowie der Crew
                            für Auf-, Um- und Abbauten zur Verfügung stehen.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>6. Bühne</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 stellt eine überdachte Bühne entsprechend
                            beiliegender Bühnenanweisung. Die Bühne muss stabil,
                            eben und sauber sein und die Spielfläche muss
                            horizontal gerade (!!) ausgerichtet sein.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        7. Anreise / Zufahrt / Parken
                    </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 schickt spätestens 8 Tage vor VA eine genaue
                            Wegbeschreibung sowie evtl.
                            Zufahrtberechtigungsscheine an VP1. VP2
                            gewährleistet in logistischer Hinsicht, dass VP1
                            nach Ankunft jederzeit seine Fahrzeuge beladen und
                            das VA-Gelände verlassen kann. VP2 stellt VP1 ab
                            Ankunft kostenlos ausreichend Parkmöglichkeiten in
                            unmittelbarer Nähe des Auftrittsortes zur Verfügung.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>8. Übernachtung</Text>
                    <View style={styles.view}>
                        <Text
                            style={styles.text}
                            render={() =>
                                `VP2 stellt und trägt die Kosten für Übernachtung mit Frühstück für ${amount} Personen.`
                            }
                        />
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>9. Catering</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 stellt Catering für Künstler (VP1) und deren
                            Crew laut anliegender Cateringanweisung, bzw.
                            Festival-Catering.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        10. Künstlerische Freiheit
                    </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Die Art der Darbietung und Gestaltung liegt
                            ausschließlich bei dem Künstler (VP1). Der
                            Künstler(VP1) ist nur an die durch diesen Vertrag
                            vereinbarten Regelungen gebunden.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        11. Vereinigungen, Sponsoring, Präsentation
                    </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Handelt es sich bei VP2 um eine Partei, eine Firma,
                            einen Verband, einen eingetragenen Verein oder um
                            eine parteienähnliche Organisation etc., so ist dies
                            vor Vertragsabschluss ausdrücklich bekanntzugeben.
                            Die Beteiligung jedweder Sponsoren oder
                            Präsentatoren oder sonstiger Werbeträger bedarf der
                            schriftlichen Absprache mit der Gruppe. Jegliche
                            Werbemittel wie Banner, Plakate, Fahnen und
                            dergleichen im unmittelbaren Bühnenbereich sind
                            grundsätzlich nicht gestattet. VP2 gewährleistet
                            zudem, dass VP1 während seines Auftrittes in der
                            Bühnenrückwand ein Backdrop mit seinem Bandlogo (4m
                            x 3m) hängen kann.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        12. Organisation und Sicherheit
                    </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 sorgt für einen ungehinderten organisatorischen
                            Ablauf der gesamten Veranstaltung und ist
                            verantwortlich für die Sicherheit und die Erfüllung
                            sämtlicher diesbezüglicher behördlicher Auflagen.
                            VP2 haftet ab Aufbaubeginn bis Abbauende in voller
                            Höhe für etwaige Körper- und Sachschäden
                            (Instrumente, Anlage, KFZ etc.), die durch ihn oder
                            Dritte auf Seiten von VP1 entstehen. VP2 stellt
                            ausreichend nüchterne Ordner zur Sicherung des
                            Backstage-, Bühnen-, Mischpult- und
                            Eingangsbereichs. Je nach Größe der Veranstaltung
                            ist VP2 verpflichtet, den Mischpultplatz sowie die
                            Bühne zusätzlich durch das Aufstellen von
                            Absperrgittern zu schützen. VP2 gewährleistet
                            ausserdem ausreichenden, durch sein
                            Sicherheitspersonal bewachten bzw. abgesperrten
                            Platz unmittelbar hinter/neben der Bühne für den
                            Auf-/Abbau der Instrumente von Künstler. Ab
                            Eintreffen von VP1 am Veranstaltungsort stellt VP2
                            diesem eine durch sein Sicherheitspersonal bewachte
                            bzw. abschließbare, beheizbare und beleuchtete
                            Garderobe zur Verfügung, zu der nur VP1 und von VP1
                            bevollmächtigte Personen Zutritt erlangen. Diese
                            muss neben 4 weißen Bühnenhandtüchern mit mindestens
                            einem Spiegel ausgestattet sein und darf von außen
                            nicht einsehbar sein. VP2 haftet für sämtliche
                            Wertgegenstände von VP1, die sich in dem gesicherten
                            Raum befinden. Es wird empfohlen, dass VP2 für die
                            Veranstaltung eine Haftpflichtversicherung für
                            Personenschäden und Sachschäden sowie ein
                            Veranstaltungshaftpflicht abschließt. VP2 stellt
                            Künstler (VP1) von jeder Haftung frei. Die Haftung
                            von Künstler beschränkt sich allein auf die durch
                            ihn selbst oder durch die in seinem Auftrag
                            handelnden Personen direkt verursachten Schäden im
                            Sinne des § 823 (1) BGB, sofern diese binnen 5 Tagen
                            nach dem Konzert VP1 schriftlich mitgeteilt werden.
                        </Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 trägt dafür Sorge, dass keine Waffen oder
                            waffenähnlichen Gegenstände in den Veranstaltungsort
                            mitgebracht werden. Bei Störungen kann das Konzert
                            sofort abgebrochen werden. Die daraus resultierenden
                            Kosten gehen zu Lasten VP2. Bei
                            Konzertveranstaltungen besteht auf Grund der
                            Lautstärke die Gefahr von Hör- und
                            Gesundheitsschäden. Für etwaige auftretende
                            Folgenschäden ist VP1 nicht haftbar. VP2
                            verpflichtet sich, am Eingang vor Publikumseinlass
                            bis Veranstaltungsende ein Schild anzubringen,
                            welches Konzertbesucher auf diese Gefahren deutlich
                            hinweist.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>13. Werbung</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP2 verpflichtet sich, alle zumutbaren Maßnahmen zu
                            unternehmen, um das Konzert in der Öffentlichkeit zu
                            bewerben (Presse, Radio, Plakate, Internet, etc...)
                        </Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Bei Ankündigungen (Plakate, Flyer etc.) sind
                            ausschließlich die Fotos und der Originalschriftzug
                            von APRIL ART zu verwenden, welche VP1 in digitaler
                            Form VP2 zur Verfügung stellt. Die Verwendung
                            anderer Fotos oder Schriftzüge bedarf der vorherigen
                            Absprache.
                        </Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Plakate: "VP2" bestellt(e) folgende Stückzahl an
                            Postern:{" "}
                            <Text
                                style={styles.text}
                                render={() => dealMemo.posters}
                            />
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        14. Konzertausfall / Vertragsstrafe / pauschalierter
                        Schadensersatz
                    </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            14.1. Für jeden einzelnen Fall, dass infolge einer
                            dem Veranstalter (VP2) zurechenbaren schuldhaften
                            Handlung oder Unterlassung, insbesondere
                            Vertragsbruch, Rücktritt vom Vertrag, oder sonstiger
                            von Veranstalter (VP2) zu vertretender Umstände
                            (z.B. Abbruch des Konzerts wegen randalierender
                            Gäste etc.) das vereinbarte Konzert / eines der
                            vereinbarten Konzerte oder der Auftritt von Künstler
                            (VP1) nicht oder nur teilweise stattfindet,
                            verpflichtet sich Veranstalter (VP2) zur Zahlung
                            einer Vertragsstrafe in Höhe der vereinbarten
                            Honorar/Produktionskosten pro ausgefallenem
                            Konzert/Auftritt und leistet Schadensersatz für
                            entstandene Aufwendungen wie Nightliner/Hotel und
                            Aufwendung Dritter, die von VP1 beauftragt wurden.
                            Die Geltendmachung eines weitergehenden Schadens
                            wird durch die vorstehende Schadenspauschalierung
                            nicht ausgeschlossen.
                        </Text>
                    </View>
                    <View style={styles.view} break>
                        <Text style={styles.text}>
                            14.2. Fälle höherer Gewalt einschließlich Krankheit
                            der Künstler (VP1), behördlicher Maßnahmen, Streiks,
                            Betriebsstörungen, Ausfall bzw. Verspätung von
                            Verkehrsmitteln und alle sonstigen vom Künstler
                            (VP1) nicht zu vertretenden Umstände, die die
                            Gestellung des Künstlers (VP1) oder der Technik
                            unmöglich machen oder übermäßig erschweren,
                            entbinden den Künstler (VP1) von der Verpflichtung
                            zur Vertragserfüllung. Ansprüche jedweder Art können
                            daraus nicht hergeleitet werden. Sollte VP2 die
                            Veranstaltung selbstbestimmend oder auf Grund
                            behördlicher Anordnung absagen und VP1 sich bereits
                            auf der Anreise befinden, so verpflichtet sich VP2
                            zur Übernahme sämtlicher Kosten die VP1 durch die
                            An- und Abreise entstehen.
                        </Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Benennen die Künstler (VP1) oder Teile des Künstlers
                            für den Konzerttermin eine erst nach
                            Vertragsabschluss bekannt gewordene Verpflichtung
                            bei Film, Funk oder Fernsehen, ist VP2 verpflichtet,
                            die Künstler (VP1) zu genannten Zwecken aus diesem
                            Vertrag zu entlassen. Die Künstler sind in diesem
                            Fall verpflichtet, dies dem Veranstalter
                            schnellstmöglich anzuzeigen. Beide Parteien tragen
                            ihre bis dahin entstandene und noch entstehende
                            Kosten selbst und bemühen sich um einen
                            Ersatztermin.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>15. Merchandising</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP1 ist berechtigt, vor, während und nach dem
                            Konzert bandeigene Merchandising Artikel zu
                            verkaufen (CDs, T-Shirts etc.). VP2 teilt VP1
                            unmittelbar nach Ankunft den Kontakt zum
                            verantwortlichen Merchandise-Verkäufer mit, damit
                            VP1 sich mit ihm in Verbindung setzen kann. Sollte
                            es keinen zentralen Verkäufer geben, ist VP2
                            verpflichtet, für VP1 eine Verkaufsfläche mit zwei
                            Tischen (1x Verkaufstisch, 1x Tisch für Rückwand)
                            und einem Stuhl zur Verfügung, die VP1 kostenlos
                            nutzen darf. Die Verkaufsfläche muss trocken und gut
                            beleuchtet sein sowie über einen 220V Stromanschluss
                            verfügen. Sie sollte sich an einer stark
                            frequentierten Stelle befinden und darf nicht mehr
                            als 30 Meter von der Bühne entfernt sein.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        16. Video- und Tonaufnahmen sowie -Übertragungen
                    </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            VP1 ist berechtigt, seinen kompletten Auftritt per
                            Foto, Video- und Audiomitschnitt zu dokumentieren.
                            Video- und Tonaufnahmen sowie -Übertragungen durch
                            Dritte sind im Vorfeld mit der Gruppe schriftlich zu
                            vereinbaren.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>
                        17. Gästeliste / Freikarten / Presseakkreditierungen
                    </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Die Gästelistenkapazität wird wie folgt festgelegt
                            und dem Vertreter des Künstlers (VP1) mitgeteilt.
                            Sie umfasst aber mindestens 10 (i. W. zehn)
                            Gästelistenplätze. Zusätzlich erhält der Künstler
                            (VP1) die Möglichkeit: Fremdveranstalter, Vertreter
                            von Plattenfirmen, Medienpartner,
                            Endorsement-Partner u.a. auf die Gästeliste zu
                            setzen (unabhängig von der eigentlichen Kapazität).
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>18. Bühnenanweisung</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Die beiliegende Bühnenanweisung inklusive dem
                            Catering-/Technik-Rider und ggf. einer
                            Nightliner-Anweisung sind Bestandteil des Vertrages.
                            Die Kosten hieraus trägt VP2.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>19. Rechtsverhältnis</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>
                            Ein Rechtsverhältnis aus diesem Vertrag kommt nur
                            zwischen der VP1 und dem Veranstalter VP2 zustande,
                            nicht jedoch zwischen Veranstalter und Brainstorm
                            Music Marketing AG. Die Rechtsbeziehungen der
                            Vertragspartner unterliegen deutschem Recht. Jedwede
                            Korrespondenz bzgl. dieses Vertrages, wenn nicht
                            anders vereinbart, ist ausschließlich an die Adresse
                            von Brainstorm Music Marketing AG, Weidachstr. 13 in
                            87541 Bad Hindelang zu richten.
                        </Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headlines}>20. Allgemeines</Text>
                    <View style={styles.view}>
                        <ListItem>
                            VP2 versichert, dass er volljährig, geschäftsfähig
                            und berechtigt ist, die Vereinbarung zu
                            unterzeichnen.
                        </ListItem>
                        <ListItem>
                            Änderungen, Ergänzungen der Vereinbarung oder
                            Sondervereinbarungen werden nur wirksam, wenn sie
                            zwischen den Vertragspartnern schriftlich festgelegt
                            sind. Sollten Teile dieser Vereinbarung nichtig sein
                            oder rechtsunwirksam werden, so gilt der
                            Rechtsvertrag weiter. Die nichtigen oder
                            rechtsunwirksamen Teile der Vereinbarung sollen dann
                            so ausgelegt werden, dass im Ganzen der Sinn der
                            Vereinbarung erhalten bleibt.
                        </ListItem>
                        <ListItem>
                            Sollte der Vertrag nicht innerhalb von 21 Tagen nach
                            Erhalt beim örtlichen Veranstalter VP2
                            unterschrieben an VP1 zurückgeschickt worden sein,
                            so gelten alle von VP1 aufgeführten Vertragsdetails
                            von VP2 als akzeptiert.
                        </ListItem>
                        <ListItem>
                            Weitere Nebenabsprachen sind nicht getroffen worden.
                            Im Zweifel gelten die bei Konzerten üblichen
                            Gepflogenheiten.
                        </ListItem>
                        <ListItem>
                            Beide Vertragspartner verpflichten sich,
                            Stillschweigen gegenüber allen Dritten bzgl. Des
                            Inhalts dieser Vereinbarung zu wahren.
                        </ListItem>
                        <ListItem>
                            Der unterzeichnete Vertrag einschließlich der
                            unterschriebenen Bühnenanweisung und der
                            unterschriebenen Cateringliste als Bestandteile des
                            Vertrages, ein Stadtplan und ein Anfahrtsplan sind
                            Brainstorm Music Marketing AG bis zwei Wochen nach
                            Erhalt des Vertrag per Mail
                            (deville@brainstorm-music-marketing.de) oder per
                            Post unterschrieben zurück zu senden.
                        </ListItem>
                    </View>
                </View>
                <View style={{ marginTop: 50 }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "50%" }}>
                            <View
                                style={{
                                    borderBottom: "black",
                                    borderBottomWidth: 2,
                                    marginBottom: 31,
                                    width: "80%",
                                }}
                            >
                                <Text>Bad Hindelang, den {dateStr}</Text>
                            </View>
                            <Image
                                style={styles.image}
                                src={workplace.signature}
                            />
                            <View
                                style={{
                                    borderTop: "black",
                                    borderTopWidth: 2,
                                    width: "80%",
                                }}
                            >
                                <Text style={{ marginBottom: 12 }}>
                                    Unterschrift VP1 mit Stempel
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: "50%" }}>
                            <View
                                style={{
                                    borderBottomColor: "black",
                                    borderBottomWidth: 2,
                                    width: "80%",
                                }}
                            >
                                <Text style={{ left: 100 }}>, den</Text>
                            </View>
                            <View
                                style={{
                                    borderTop: "black",
                                    borderTopWidth: 2,
                                    marginTop: 160,
                                    marginBottom: 12,
                                    width: "80%",
                                }}
                            >
                                <Text>Unterschrift VP2 mit Stempel</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    fixed
                />
            </Page>
        </Document>
    );

    return <>{doc}</>;
}
