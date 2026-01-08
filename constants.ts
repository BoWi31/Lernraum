
import { Subject, LearningStep, NotebookTask } from './types';

export const GLOSSARY: Record<string, string> = {
  "Absolutismus": "Die Zeit, in der ein König ganz allein über alles bestimmt hat (Alleinherrschaft).",
  "Republik": "Ein Land, in dem das Volk oder gewählte Politiker regieren - es gibt keinen König mehr.",
  "Wohlfahrtsausschuss": "Eine Gruppe von Revolutionsführern, die im Notfall alle Macht übernahm.",
  "Guillotine": "Eine Hinrichtungsmaschine mit einem schweren Fallbeil. Sie galt als 'humane' Tötung.",
  "Terror": "Systematische Gewalt gegen politische Gegner, um Angst zu verbreiten.",
  "Code Civil": "Ein modernes Gesetzbuch von Napoleon, das Freiheit und Gleichheit festschrieb.",
  "Staatsstreich": "Die gewaltsame Übernahme der Macht im Staat durch das Militär.",
  "Denunziation": "Das Anzeigen oder Verraten von Mitmenschen aus niederen Motiven.",
  "Tugend": "Eine moralisch gute Eigenschaft. Robespierre wollte ein Volk voller 'tugendhafter' Bürger.",
  "Privilegien": "Sonderrechte, die früher nur der Adel und die Kirche hatten (z.B. keine Steuern).",
  "Demokratie": "Eine Regierungsform, bei der die Macht vom Volk ausgeht (Wahlen, Mitbestimmung).",
  "Grundgesetz": "Das wichtigste Gesetzbuch in Deutschland. Es enthält unsere Grundrechte.",
  "Gewaltenteilung": "Die Aufteilung der Macht im Staat auf drei Bereiche, damit niemand zu viel Macht hat.",
  "Menschenrechte": "Rechte, die jeder Mensch auf der Welt hat, einfach weil er ein Mensch ist.",
  "Legislative": "Die gesetzgebende Gewalt (z.B. der Bundestag). Hier werden Gesetze gemacht.",
  "Exekutive": "Die ausführende Gewalt (z.B. die Regierung oder Polizei). Sie führt Gesetze aus.",
  "Judikative": "Die rechtsprechende Gewalt (die Gerichte). Sie prüfen, ob Gesetze eingehalten werden.",
  "Wahlen": "Hier entscheidet das Volk, wer das Land regieren soll.",
  "Menschenwürde": "Die Vorstellung, dass jeder Mensch wertvoll ist und mit Respekt behandelt werden muss."
};

const FEEDBACK_TASK: NotebookTask = { 
  id: 'feedback-task', 
  type: 'bonus', 
  label: 'Feedback', 
  task: 'Fülle den Feedbackbogen zum geschafften Lernraum aus.' 
};

const CREATE_TASKS_GESCHICHTE = (level: string): NotebookTask[] => {
  if (level === 'Leicht') {
    return [
      { id: 'g-l-1', type: 'pflicht', label: 'AFB I', task: 'Wer war Maximilian Robespierre? Erkläre es in einem Satz.' },
      { id: 'g-l-2', type: 'pflicht', label: 'AFB II', task: 'Zeichne eine Guillotine und erkläre kurz, warum sie als "gerecht" galt.' },
      { id: 'g-l-3', type: 'kreativ', label: 'AFB III', task: 'Male ein Bild: Wie stellst du dir die Stimmung in Paris 1793 vor?' },
      FEEDBACK_TASK
    ];
  } else if (level === 'Mittel') {
    return [
      { id: 'g-m-1', type: 'pflicht', label: 'AFB I', task: 'Nenne drei Gründe, warum die Menschen in Paris 1793 wütend waren.' },
      { id: 'g-m-2', type: 'pflicht', label: 'AFB II', task: 'Erkläre den Zusammenhang zwischen dem Krieg gegen das Ausland und dem Terror im Inneren.' },
      { id: 'g-m-3', type: 'kreativ', label: 'AFB III', task: 'Stell dir vor, du bist ein einfacher Bürger. Schreibe einen Tagebucheintrag über deine Angst vor Denunziation.' },
      FEEDBACK_TASK
    ];
  } else {
    return [
      { id: 'g-s-1', type: 'pflicht', label: 'AFB I', task: 'Definiere den Begriff "Tugend" im Sinne von Robespierre.' },
      { id: 'g-s-2', type: 'pflicht', label: 'AFB II', task: 'Analysiere das "Gesetz der Verdächtigen". Wer konnte alles zum Feind der Revolution werden?' },
      { id: 'g-s-3', type: 'kreativ', label: 'AFB III', task: 'Beurteile Robespierres Zitat: "Der Terror ist nichts anderes als die schlagfertige, strenge und unbeugsame Gerechtigkeit." Hat er recht?' },
      FEEDBACK_TASK
    ];
  }
};

const CREATE_TASKS_POLITIK = (level: string): NotebookTask[] => {
  if (level === 'Leicht') {
    return [
      { id: 'p-l-1', type: 'pflicht', label: 'AFB I', task: 'Was bedeutet der Begriff Politik? Schreibe eine kurze Definition.' },
      { id: 'p-l-2', type: 'pflicht', label: 'AFB II', task: 'Nenne drei Orte aus deinem Alltag, an denen Politik eine Rolle spielt.' },
      { id: 'p-l-3', type: 'kreativ', label: 'AFB III', task: 'Was würdest du sofort an deiner Schule ändern, wenn du der Chef wärst?' },
      FEEDBACK_TASK
    ];
  } else if (level === 'Mittel') {
    return [
      { id: 'p-m-1', type: 'pflicht', label: 'AFB I', task: 'Was steht in Artikel 1 des Grundgesetzes? Schreibe den Satz auf.' },
      { id: 'p-m-2', type: 'pflicht', label: 'AFB II', task: 'Erkläre die drei Säulen der Gewaltenteilung und warum wir sie brauchen.' },
      { id: 'p-m-3', type: 'kreativ', label: 'AFB III', task: 'Diskutiere mit einem Partner: Warum sind Regeln und Gesetze im Internet (z.B. TikTok/Insta) wichtig?' },
      FEEDBACK_TASK
    ];
  } else {
    return [
      { id: 'p-s-1', type: 'pflicht', label: 'AFB I', task: 'Erkläre den Begriff "Menschenwürde" mit eigenen Worten.' },
      { id: 'p-s-2', type: 'pflicht', label: 'AFB II', task: 'Vergleiche eine Demokratie mit einer Alleinherrschaft (Diktatur). Was sind die Hauptunterschiede?' },
      { id: 'p-s-3', type: 'kreativ', label: 'AFB III', task: 'Entwirf ein Plakat für eine Wahl: Mit welchen Themen würdest du junge Menschen für Politik begeistern?' },
      FEEDBACK_TASK
    ];
  }
};

const WIEDERHOLUNG_STEPS = (level: 'L' | 'M' | 'S'): LearningStep[] => [
  {
    id: 1, title: "Wiederholung: Der König", emoji: "👑",
    content: level === 'L' 
      ? ["Vor der Revolution gab es den Absolutismus.", "Der König entschied alles allein. Das Volk hatte keine Rechte."]
      : level === 'M'
      ? ["Erinnerst du dich? Im Absolutismus herrschte Ludwig XVI. allein über Frankreich.", "Er sah sich als Stellvertreter Gottes auf Erden."]
      : ["Das Ancien Régime basierte auf der unumschränkten Macht des Monarchen.", "Diese Alleinherrschaft nennen wir Absolutismus. Sie endete mit der Revolution."],
    quiz: level === 'S' ? {
      type: 'ordering',
      question: "Bringe die Machtverhältnisse in die richtige historische Reihenfolge (von alt nach neu):",
      order: ["Absolutismus (König herrscht allein)", "Konstitutionelle Monarchie (König + Verfassung)", "Republik (Volk herrscht ohne König)"]
    } : { type: 'multiple-choice', question: "Wie nannte man die Alleinherrschaft?", options: [{ text: "Absolutismus", isCorrect: true }, { text: "Demokratie", isCorrect: false }] }
  },
  {
    id: 2, title: "Wiederholung: Stände", emoji: "⚖️",
    content: level === 'L'
      ? ["Die Gesellschaft war in 3 Stände geteilt.", "Der 3. Stand (Bauern und Bürger) war arm und zahlte alle Steuern."]
      : level === 'M'
      ? ["Die Ständegesellschaft war sehr ungerecht.", "Adel und Klerus genossen Privilegien, während das Volk hungerte."]
      : ["Die Gesellschaft war streng hierarchisch gegliedert.", "Der 3. Stand trug die gesamte Steuerlast, besaß aber keinerlei politische Mitbestimmung."],
    quiz: { 
      type: 'drag-drop', 
      question: "Ordne die Merkmale der Stände korrekt zu:", 
      dragItems: [{id:'d1', text:'Steuerfreiheit'}, {id:'d2', text:'Hunger & harte Arbeit'}, {id:'d3', text:'Politisches Sagen'}, {id:'d4', text:'Keine Mitbestimmung'}], 
      dropZones: [
        {id:'z1', label:'1. & 2. Stand (Klerus/Adel)', correctItemId:'d1'}, 
        {id:'z2', label:'3. Stand (Bauern/Bürger)', correctItemId:'d2'}
      ] 
    }
  }
];

const TERROR_CONTENT = (level: 'L' | 'M' | 'S'): LearningStep[] => [
  {
    id: 4, title: level === 'L' ? "Vom Sieg zum Chaos" : "Die Wende 1793", emoji: "⚡",
    content: level === 'L' 
      ? ["Eigentlich wollten alle Freiheit. Doch 1793 herrscht Chaos.", "Es gibt Krieg gegen das Ausland und Hunger in Paris."]
      : level === 'M'
      ? ["Nach dem Sieg über den König war Frankreich nicht friedlich.", "Feinde von außen und Hungersnöte im Inneren bedrohten die Revolution."]
      : ["Trotz der Erklärung der Menschenrechte war die Republik instabil.", "Innere Aufstände und äußere Kriege radikalisierten die Jakobiner."],
    quiz: level === 'S' ? {
      type: 'matching',
      question: "Welche Bedrohung führte zu welcher Reaktion?",
      pairs: [
        {id:'p1', left:'Innere Aufstände', right:'Gesetz der Verdächtigen'},
        {id:'p2', left:'Äußerer Krieg', right:'Massenaushebung (Militär)'}
      ]
    } : { type: 'multiple-choice', question: "Was bedrohte die Revolution 1793?", options: [{ text: "Krieg und Hunger", isCorrect: true }, { text: "Zu viel Freizeit", isCorrect: false }] }
  },
  {
    id: 5, title: "Der Terror beginnt", emoji: "⚔️", imageType: 'guillotine',
    content: level === 'L'
      ? ["Ein Mann namens Robespierre übernimmt die Macht.", "Er nutzt die Guillotine, um alle Gegner zu töten."]
      : level === 'M'
      ? ["Maximilian Robespierre wollte die Revolution mit Gewalt retten.", "Jeder, der verdächtig war, landete unter der Guillotine."]
      : ["Der Wohlfahrtsausschuss unter Robespierre errichtete ein Terror-Regime.", "Terror wurde als notwendiges Mittel zur Erhaltung der 'Tugend' gerechtfertigt."],
    quiz: level === 'S' ? {
      type: 'drag-drop',
      question: "Robespierres Logik: Was gehört zusammen?",
      dragItems: [{id:'r1', text:'Tugend'}, {id:'r2', text:'Terror'}],
      dropZones: [
        {id:'rz1', label:'Das Ziel der Republik', correctItemId:'r1'},
        {id:'rz2', label:'Das Mittel zum Ziel', correctItemId:'r2'}
      ]
    } : { type: 'matching', question: "Was passt zusammen?", pairs: [{id:'p1', left:'Robespierre', right:'Anführer des Terrors'}, {id:'p2', left:'Guillotine', right:'Hinrichtungswerkzeug'}] }
  }
];

const POLITIK_STEPS = (level: 'L' | 'M' | 'S'): LearningStep[] => [
  {
    id: 101, title: "Was ist Politik?", emoji: "🌍",
    content: level === 'L'
      ? ["Politik bedeutet alles, was mit Regeln und Entscheidungen zu tun hat.", "Wir überlegen: Wie wollen wir zusammenleben?"]
      : level === 'M'
      ? ["Alles, was mit Regeln, Entscheidungen und dem Zusammenleben der Menschen zu tun hat, nennen wir Politik.", "Politik klärt: Was ist erlaubt? Wer entscheidet? Wie lösen wir Streit?"]
      : ["Politik ist das Aushandeln von Regeln für das Gemeinwesen.", "Zentrale Aspekte sind verbindliche Entscheidungen und das Lösen gesellschaftlicher Konflikte."],
    quiz: level === 'S' ? {
      type: 'ordering',
      question: "Ordne den politischen Prozess: Wie entsteht eine Lösung?",
      order: ["Problem wird erkannt", "Meinungen werden ausgetauscht", "Entscheidung (Gesetz) wird getroffen"]
    } : { type: 'multiple-choice', question: "Worum geht es in der Politik?", options: [{ text: "Um Regeln und Zusammenleben", isCorrect: true }, { text: "Nur um Hausaufgaben", isCorrect: false }] }
  },
  {
    id: 103, title: "Was ist Demokratie?", emoji: "🗳️",
    content: level === 'L'
      ? ["In einer Demokratie darf jeder seine Meinung sagen.", "Das Volk bestimmt mit. Es gibt freie Wahlen."]
      : level === 'M'
      ? ["Demokratie heißt: Das Volk herrscht. Merkmale sind: mehrere Parteien, Minderheitenschutz und faire Entscheidungen.", "Niemand darf benachteiligt werden."]
      : ["Demokratie basiert auf Volkssouveränität und Pluralismus.", "Kernmerkmale sind freie Wahlen, Meinungsfreiheit und der Schutz von Minderheiten vor der Mehrheit."],
    quiz: level === 'S' ? {
      type: 'matching',
      question: "Ordne die demokratischen Prinzipien zu:",
      pairs: [
        {id:'pp1', left:'Pluralismus', right:'Vielzahl von Meinungen/Parteien'},
        {id:'pp2', left:'Souveränität', right:'Die Macht liegt beim Volk'},
        {id:'pp3', left:'Rechtsstaat', right:'Regierung muss Gesetze befolgen'}
      ]
    } : { type: 'matching', question: "Was gehört zur Demokratie?", pairs: [{id:'pp1', left:'Wahlen', right:'Das Volk bestimmt mit'}, {id:'pp2', left:'Meinungsfreiheit', right:'Jeder darf sprechen'}] }
  },
  {
    id: 104, title: "Gewaltenteilung", emoji: "🏛️", imageType: 'law',
    content: level === 'L'
      ? ["Damit niemand allein wie ein 'König' herrscht, wird die Macht aufgeteilt.", "Es gibt 3 Säulen: Gesetze machen, Regieren und Gerichte."]
      : level === 'M'
      ? ["Macht wird aufgeteilt in: Gesetzgebung (Parlament), Regierung (Ausführende) und Gerichte (Richter).", "Dies verhindert Machtmissbrauch durch gegenseitige Kontrolle."]
      : ["Die Gewaltenteilung ist ein Grundpfeiler des Rechtsstaats.", "Sie unterscheidet zwischen Legislative (Gesetze), Exekutive (Ausführung) und Judikative (Rechtsprechung)."],
    quiz: { 
      type: 'drag-drop', 
      question: "Ordne die Staatsgewalten korrekt zu:", 
      dragItems: [{id:'g1', text:'Bundestag'}, {id:'g2', text:'Polizei / Regierung'}, {id:'g3', text:'Amtsgericht'}], 
      dropZones: [
        {id:'gz1', label:'Legislative (Gesetze)', correctItemId:'g1'},
        {id:'gz2', label:'Exekutive (Ausführung)', correctItemId:'g2'},
        {id:'gz3', label:'Judikative (Recht)', correctItemId:'g3'}
      ] 
    }
  },
  {
    id: 105, title: "Menschenrechte", emoji: "📜",
    content: level === 'L'
      ? ["Das Grundgesetz schützt uns alle. Artikel 1 sagt: Die Würde des Menschen ist unantastbar.", "Jeder Mensch ist wertvoll."]
      : level === 'M'
      ? ["Menschenrechte gelten für alle: Recht auf Leben, Freiheit und Schule.", "Jeder Mensch muss respektiert werden, egal woher er kommt."]
      : ["Die Menschenrechte sind universell und unantastbar.", "Artikel 1 GG stellt die Menschenwürde als oberstes Gut über alles andere staatliche Handeln."],
    quiz: level === 'S' ? {
      type: 'multiple-choice',
      question: "Was bedeutet 'unantastbar' in Artikel 1 GG?",
      options: [
        { text: "Der Staat darf die Würde niemals verletzen.", isCorrect: true },
        { text: "Man darf Menschen nicht berühren.", isCorrect: false },
        { text: "Das Gesetz gilt nur für Politiker.", isCorrect: false }
      ]
    } : { type: 'multiple-choice', question: "Welcher Artikel ist besonders wichtig?", options: [{ text: "Artikel 1 (Würde)", isCorrect: true }, { text: "Artikel 99 (Pause)", isCorrect: false }] }
  }
];

export const SUBJECTS: Subject[] = [
  {
    id: 'geschichte', title: 'Geschichte', icon: '🏛️', color: '#3b82f6',
    grades: [{ id: '7', topics: [
      {
        id: 'fr-rev', title: 'Französische Revolution',
        lessons: [
          {
            id: 'terror', title: 'Der Terror 1793', description: 'Wiederholung & Schreckensherrschaft.', emoji: '⚔️',
            levels: [
              { id: 't1', name: 'Leicht', icon: '🟩', color: '#22c55e', steps: [...WIEDERHOLUNG_STEPS('L'), ...TERROR_CONTENT('L')], tasks: CREATE_TASKS_GESCHICHTE('Leicht') },
              { id: 't2', name: 'Mittel', icon: '🟦', color: '#3b82f6', steps: [...WIEDERHOLUNG_STEPS('M'), ...TERROR_CONTENT('M')], tasks: CREATE_TASKS_GESCHICHTE('Mittel') },
              { id: 't3', name: 'Schwer', icon: '🟥', color: '#ef4444', steps: [...WIEDERHOLUNG_STEPS('S'), ...TERROR_CONTENT('S')], tasks: CREATE_TASKS_GESCHICHTE('Schwer') }
            ]
          }
        ]
      }
    ]}]
  },
  {
    id: 'politik', title: 'Politik', icon: '🤝', color: '#10b981',
    grades: [{ id: '7', topics: [
      {
        id: 'grundlagen', title: 'Wiederholung: Grundlagen',
        lessons: [
          {
            id: 'was-ist-politik', title: 'Was ist Politik?', description: 'Regeln, Demokratie & Grundrechte.', emoji: '⚖️',
            levels: [
              { id: 'p1', name: 'Leicht', icon: '🟩', color: '#22c55e', steps: POLITIK_STEPS('L'), tasks: CREATE_TASKS_POLITIK('Leicht') },
              { id: 'p2', name: 'Mittel', icon: '🟦', color: '#3b82f6', steps: POLITIK_STEPS('M'), tasks: CREATE_TASKS_POLITIK('Mittel') },
              { id: 'p3', name: 'Schwer', icon: '🟥', color: '#ef4444', steps: POLITIK_STEPS('S'), tasks: CREATE_TASKS_POLITIK('Schwer') }
            ]
          }
        ]
      }
    ]}]
  }
];
