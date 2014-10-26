# The Waiting List - Bist du noch zu retten?

Demo: [http://stekhn.github.io/organspenden-game](http://stekhn.github.io/organspenden-game)


#### Elevator Pitch

Organspende - als Thema längst durch? Die Zahl der Organspender ist so niedrig wie noch nie, ein Grund dafür ist der Skandal um die Organverteilung im Jahr 2012. The waiting list greift das Problem als interaktives Newsgame auf - und macht das sperrige Thema damit spannend wie noch nie.


#### Type of the project

Web app, Newsgame


#### MVP

Das Minimalziel war eine Web-App, die zumindest das erste Level mit nur einem Organ spielbar darstellt. Damit ist die Grundlogik erklärt - dass ich als Spieler mit der Organverteilung Menschenleben rette, aber nie alle retten kann, da es nie genug Organe gibt.


#### Target Group

Die Zielgruppe sind vor allem diejenigen, die sich bislang nicht für Organspende interessiert haben, weil ihnen das Thema zu sperrig war. In zweiter Linie Menschen ohne Organspendeausweis bzw. ohne Wissen über den Ausweis oder Entscheidung zu einer Organspende.


#### Use Case

The waiting list ist angelegt als kurzes Spiel zwischendurch, was ich in meiner Facebook- oder Twitter-Timeline finde und in meiner Kaffeepause in drei Minuten durchspielen kann. Es soll keine vertiefenden Informationen bieten, sondern durch den Spielansatz einen extrem leichten Zugang zum Thema verschaffen.


#### Challenges & Solutions

Inhaltlich: Das sehr komplexe Thema der Organspende auf eine einfache Spiellogik herunterbrechen. Es gibt sehr viele Variablen, wonach Organe verteilt werden, warum jemand auf der Warteliste steht oder nicht. Gelöst werden konnte das nur durch maximale Vereinfachung. Die sehr umfangreichen Zahlen von Eurotransplant wurden stark vereinfacht und gerundet, Zusatz-Infos auf das Nötigste beschränkt.
Aus diesem komplexen Thema eine Game-Logik zu entwickeln war ebenso schwierig - schließlich verteilt in der Realität der Computer die Organe. Aber nur wenn ich selbst sehe, wie jemand stirbt, weil ich keine Organe mehr habe, hat so ein Spiel den nötigen und wichtigen Impact. Also wurde auch hier vereinfacht.


#### Scalability

Das Spiel kann in der weiteren Entwicklung noch weitaus komplexere Parameter mit einbeziehen. Ein Beispiel dafür sind Ereignisse, die der Spieler nicht steuern kann, wie einen Spendenskandal. Er unterbricht das Spiel und löst als Folge aus, dass der Spieler weniger Organe bekommt. Mit einer Spendenkampagne kann er dann gegensteuern - sieht aber, dass diese nur bedingt etwas bringt.  Andere Ereignisse können der medizinische Fortschritt sein (weniger Spendenorgane, durch bessere Behandlung von z.B. Schlaganfallpatienten) oder die Bezahlung der Ärzte bei Organentnahmen (mehr Spendenorgane, da z.B. in Kroatien höhere Honorare gezahlt werden und so ein Anreiz besteht, mit den Patienten die Option der Organspende besser zu besprechen).

Auch die bestehende Warteliste könnte noch besser implementiert werden - so dass optisch stärker herauskommt, wie lang die Liste noch ist. Das könnte mit einer ausgeklügelteren Zeitlogik kombiniert werden, so dass der Nutzer mehrere Wochen durchspielen kann.


#### Team

- Steffen Kühne (Programmierer) @stehkn
- Sonja Kowarschick (Programmiererin) @sonschi
- Hakan Tanriverdi (Journalist) @hakantee
- Lina Timm (Journalistin) @luisante
- Gero Wortmann (Designer)