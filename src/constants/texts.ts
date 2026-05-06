import { Level, Language, TextLength, Theme } from '../types';

export const DICTIONARY: Record<Language, Record<Level, string[]>> = {
  [Language.ENGLISH]: {
    [Level.BEGINNER]: [
      "a s d f j k l ;", "as df jk l;", "asdf jkl;", "fds a lk j", "fada jada kala lada",
      "sad fad gad had", "ask dad add", "alas a lass", "fall gall hall", "dash bash gash",
      "jess less mess", "leaf deaf beef", "seed deed feed", "star bar car", "sky is blue"
    ],
    [Level.INTERMEDIATE]: [
      "The quick brown fox jumps over the lazy dog.",
      "Practice makes perfect in every single way.",
      "Typing fast requires focus and relaxed hands.",
      "Keep your eyes on the screen, not the keys.",
      "Accuracy is the foundation of high speed typing.",
      "The moon shines brightly over the silent forest.",
      "Success comes to those who wait and work hard.",
      "Explore the vast reaches of the digital cosmos.",
      "A journey of a thousand miles begins with a step.",
      "Every cloud has a silver lining if you look closely."
    ],
    [Level.ADVANCED]: [
      "Quantum mechanics is a fundamental theory in physics that provides a description of nature.",
      "The industrial revolution was a transition to new manufacturing processes in the world.",
      "Programming is the process of creating a set of instructions for computers to follow.",
      "Artificial intelligence represents the simulation of human thinking by powerful machines.",
      "Sustainability involves meeting needs without compromising the future generations.",
      "Cryptography is the practice and study of techniques for secure communication.",
      "Photosynthesis is a process used by plants to convert light energy into chemical energy.",
      "Thermodynamics is a branch of physics that deals with heat and temperature.",
      "The deep ocean remains one of the least explored places on our entire planet.",
      "Global connectivity has transformed how we share information across all borders."
    ]
  },
  [Language.SPANISH]: {
    [Level.BEGINNER]: [
      "a s d f j k l ñ", "as df jk lñ", "asdf jklñ", "fds a lk j", "fada ñala lada jada",
      "casa masa tasa pasa", "papa mama dama rama", "sala gala pala mala", "beso peso yeso",
      "luna tuna cuna duna", "sol mar pan sal", "rojo azul verde", "gran dia hoy", "hola amigo"
    ],
    [Level.INTERMEDIATE]: [
      "El veloz murciélago hindú comía feliz cardillo y escabeche.",
      "La práctica constante es la clave para mejorar tu velocidad.",
      "Mantén una postura correcta frente al computador siempre.",
      "Escribir sin mirar el teclado es un arte que requiere paciencia.",
      "La precisión es más importante que la rapidez al empezar.",
      "El sol se oculta tras las montañas al final de la tarde.",
      "Nuevos desafíos te esperan en cada nivel de este juego.",
      "La música retro nos transporta a una época dorada de arcade.",
      "Un pequeño esfuerzo diario produce grandes resultados.",
      "La curiosidad es el motor que impulsa el conocimiento humano."
    ],
    [Level.ADVANCED]: [
      "La nanotecnología es la manipulación de la materia a escala atómica.",
      "El descubrimiento de la penicilina cambió el rumbo de la medicina.",
      "La fotosíntesis convierte dióxido de carbono en compuestos orgánicos.",
      "El quijote de la mancha es la primera novela moderna universal.",
      "La biodiversidad es esencial para el equilibrio de los ecosistemas.",
      "La astrofísica estudia la estructura y evolución de las galaxias.",
      "El genoma humano contiene toda la información genética de nuestra especie.",
      "La inteligencia emocional es fundamental para las relaciones sociales.",
      "La arquitectura sostenible busca reducir el impacto ambiental hoy.",
      "El desarrollo de software requiere lógica y mucha creatividad."
    ]
  },
  [Language.FRENCH]: {
    [Level.BEGINNER]: [
      "q s d f j k l m", "qs df jk lm", "qsdf jklm", "fds q lk j", "fada kala lada jada",
      "chat noir blanc gris", "petit grand fort", "belle fille gars", "pomme poire fruit",
      "bleu rouge vert jaune", "mer ciel sol air", "bon jour soir", "ici la bas la", "ami mon ton son"
    ],
    [Level.INTERMEDIATE]: [
      "Portez ce vieux vieux vin au juge blond qui fume.",
      "La patience est la cle de tout apprentissage durable.",
      "Ecrire rápidamente demande de la concentration et du calme.",
      "Le succes est le fruit d'un travail quotidien et acharne.",
      "La precision est la base de toute grande performance.",
      "Le soleil se couche doucement derriere les montagnes.",
      "La musique retro nous rappelle les vieux jeux d'arcade.",
      "Un petit effort chaque jour mene a de grands resultats.",
      "La curiosite aide a apprendre de nouvelles choses.",
      "Le respect de la nature est vital pour notre planet."
    ],
    [Level.ADVANCED]: [
      "L'existentialisme est un courant philosophique et litteraire important.",
      "La revolution francaise a marque un tournant majeur dans l'histoire.",
      "La climatologie etudie les variations du climat sur le long terme.",
      "L'intelligence artificielle transforme de nombreux secteurs aujourd'hui.",
      "La preservation de l'environnement est l'un des plus grands defis.",
      "L'astronomie nous aide a comprendre nos origines dans l'univers.",
      "Le developpement durable est crucial pour les generations futures.",
      "La biodiversite est la richesse biologique de notre planete Terre.",
      "Les neurosciences explorent le funcionamiento du cerveau humain.",
      "L'architecture moderne allie l'esthetique a la fonctionnalite."
    ]
  },
  [Language.GERMAN]: {
    [Level.BEGINNER]: [
      "a s d f j k l ö", "as df jk lö", "asdf jklö", "fds a lk j", "fada kala lada jada",
      "haus maus raus laus", "brot rot tot not", "blau grau schlau", "hier ist gut heute",
      "tag und nacht hell", "baum blatt grün", "hand fuss kopf", "eins zwei drei", "fisch im wasser"
    ],
    [Level.INTERMEDIATE]: [
      "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.",
      "Übung macht den Meister, besonders beim schnellen Tippen.",
      "Fokus und Entspannung sind der Schlüssel zur hohen Präzision.",
      "Die richtige Haltung am Computer verhindert langfristige Schmerzen.",
      "Genauigkeit geht vor Schnelligkeit bei jedem neuen Buchstaben.",
      "Der Wald ist schoen und sehr tief im Winter.",
      "Viel Glueck bei deiner Reise in die Arcadenwelt.",
      "Ein kleiner Schritt ist besser als gar keiner.",
      "Digitalisierung veraendert unser Leben jeden Tag.",
      "Lerne fliessend zu schreiben mit viel Konzentration."
    ],
    [Level.ADVANCED]: [
      "Die Quantenphysik beschreibt das Verhalten von Materie und Energie im atomaren Bereich.",
      "Die industrielle Revolution veränderte die Lebensbedingungen der Menschen fundamental.",
      "Die Nachhaltigkeit ist ein Handlungsprinzip zur Ressourcen-Nutzung für die Zukunft.",
      "Künstliche Intelligenz ist ein Teilgebiet der Informatik, das sich mit Automatisierung befasst.",
      "Die Photosynthese wandelt Lichtenergie in chemische Energie für Pflanzen um.",
      "Kryptographie ist die Wissenschaft der Verschlüsselung von geheimen Informationen.",
      "Die Astronomie erforscht das Universum und alle Himmelskörper darin.",
      "Das menschliche Gehirn ist das komplexeste Organ in unserem gesamten Körper.",
      "Ökologische Landwirtschaft schützt die Umwelt und fördert die Gesundheit.",
      "Softwareentwicklung erfordert logisches Denken und viel kreative Problemlösung."
    ]
  }
};

export const THEME_DICTIONARY: Record<Theme, Record<Language, string[]>> = {
  [Theme.MARIO]: {
    [Language.ENGLISH]: [
      "Its-a me, Mario! Let us go to the castle.",
      "Super Mushroom will make you grow bigger.",
      "Jump over the green pipes to find secrets.",
      "Watch out for Goombas and Koopa Troopas.",
      "The Princess is in another castle, Mario.",
      "Collect one hundred coins for an extra life.",
      "Bowser has kidnapped Princess Peach again.",
      "Yoshi is waiting for you in the Dinosaur Land.",
      "Fire Flowers let you shoot fireballs at foes.",
      "Starman gives you temporary invincibility.",
      "Triple jump into the air to reach high places.",
      "Dont forget to grab the flagpole at the end.",
      "Toads are always helping the Mario Brothers.",
      "Luigi is ready for his own spooky adventure.",
      "Wahoo! We are flying into the clouds now."
    ],
    [Language.SPANISH]: [
      "¡Soy yo, Mario! Vamos hacia el castillo.",
      "El Super Champiñón te hará crecer mucho más.",
      "Salta sobre las tuberías verdes para hallar secretos.",
      "Ten cuidado con los Goombas y los Koopa Troopas.",
      "La Princesa está en otro castillo, Mario.",
      "Reúne cien monedas para una vida extra.",
      "Bowser ha secuestrado a la Princesa Peach otra vez.",
      "Yoshi te espera en la Tierra de los Dinosaurios.",
      "Las Flores de Fuego te permiten lanzar bolas de fuego.",
      "La Estrella te da invencibilidad por un tiempo.",
      "Haz un triple salto para alcanzar sitios altos.",
      "No olvides agarrar el banderín al final.",
      "Los Toads siempre ayudan a los hermanos Mario.",
      "Luigi está listo para su aventura fantasmal.",
      "¡Wahoo! Estamos volando por las nubes ahora."
    ],
    [Language.FRENCH]: [
      "C'est moi, Mario ! Allons au château.",
      "Le Super Champi vous fera grandir.",
      "Sautez sur les tuyaux verts pour des secrets.",
      "Attention aux Goombas et aux Koopa Troopas.",
      "La princesse est dans un autre château.",
      "Ramassez cent pièces pour une vie supplémentaire.",
      "Bowser a encore enlevé la princesse Peach.",
      "Yoshi vous attend au Pays des Dinosaures.",
      "Les Fleurs de Feu vous permettent de tirer.",
      "L'étoile vous rend invincible temporairement.",
      "Faites un triple saut pour aller plus haut.",
      "N'oubliez pas d'attraper le drapeau à la fin.",
      "Les Toads aident toujours les frères Mario.",
      "Luigi est prêt pour son aventure hantée.",
      "Wahoo ! Nous volons dans les nuages."
    ],
    [Language.GERMAN]: [
      "Ich bin's, Mario! Lass uns zum Schloss gehen.",
      "Superpilze lassen dich größer werden.",
      "Springe über die grünen Röhren, um Geheimnisse zu finden.",
      "Pass auf Gumbas und Koopa Troopas auf.",
      "Die Prinzessin ist in einem anderen Schloss, Mario.",
      "Sammle einhundert Münzen für ein Extraleben.",
      "Bowser hat Prinzessin Peach wieder entführt.",
      "Yoshi wartet im Dinosaurierland auf dich.",
      "Feuerblumen lassen dich Feuerbälle auf Gegner schießen.",
      "Der Stern macht dich vorübergehend unbesiegbar.",
      "Dreifachsprung in die Luft, um hohe Orte zu erreichen.",
      "Vergiss nicht, am Ende den Fahnenmast zu schnappen.",
      "Toads helfen den Mario-Brüdern immer.",
      "Luigi ist bereit für sein eigenes gruseliges Abenteuer.",
      "Wahoo! Wir fliegen jetzt in die Wolken."
    ]
  },
  [Theme.PACMAN]: {
    [Language.ENGLISH]: [
      "Waka waka waka! Eat those yellow dots fast.",
      "Power Pellets turn the ghosts blue and weak.",
      "Blinky is the red ghost that follows you.",
      "Pinky tries to get ahead of your movement.",
      "Inky is unpredictable and very dangerous.",
      "Clyde is the orange ghost that acts shy.",
      "The maze is filled with points and fruit.",
      "Cherry and strawberry give bonus score.",
      "Avoid the monsters until you eat a big pill.",
      "Speed up as you clear the whole game board.",
      "Teleport through the tunnels on the sides.",
      "High score is waiting for the best player.",
      "Ghost house is where they go to regenerate.",
      "Retro arcade games are the best to play.",
      "Insert coin to start your pixel adventure."
    ],
    [Language.SPANISH]: [
      "¡Waka waka waka! Come los puntos amarillos rápido.",
      "Las píldoras de poder debilitan a los fantasmas.",
      "Blinky es el fantasma rojo que te persigue.",
      "Pinky intenta adelantarse a tus movimientos.",
      "Inky es impredecible y muy peligroso.",
      "Clyde es el fantasma naranja que es tímido.",
      "El laberinto está lleno de puntos y frutas.",
      "La cereza y la fresa dan puntos extra.",
      "Evita a los monstruos hasta comer la píldora.",
      "Aumenta la velocidad al limpiar todo el tablero.",
      "Teletranspórtate por los túneles laterales.",
      "El récord espera al mejor jugador de todos.",
      "La casa de los fantasmas es para regenerarse.",
      "Los juegos de arcade retro son los mejores.",
      "Inserta una moneda para empezar la aventura."
    ],
    [Language.FRENCH]: [
      "Waka waka waka ! Mangez les points jaunes.",
      "Les Pastilles de Puissance affaiblissent les fantômes.",
      "Blinky est le fantôme rouge qui vous suit.",
      "Pinky essaie d'anticiper vos mouvements.",
      "Inky est imprévisible et très dangereux.",
      "Clyde est le fantôme orange qui est timide.",
      "Le labyrinthe est rempli de points et de fruits.",
      "La cerise et la fraise donnent des bonus.",
      "Évitez les monstres jusqu'à manger la pastille.",
      "Accélérez en nettoyant tout le plateau.",
      "Téléportez-vous par les tunnels latéraux.",
      "Le score record attend le meilleur joueur.",
      "La maison des fantômes sert à se régénérer.",
      "Les jeux d'arcade rétro sont les meilleurs.",
      "Insérez une pièce pour commencer l'aventure."
    ],
    [Language.GERMAN]: [
      "Waka waka waka! Iss die gelben Punkte schnell.",
      "Power-Pillen machen die Geister blau und schwach.",
      "Blinky ist der rote Geist, der dich verfolgt.",
      "Pinky versucht, deinen Bewegungen voraus zu sein.",
      "Inky ist unvorhersehbar und sehr gefährlich.",
      "Clyde ist der orangefarbene Geist, der schüchtern ist.",
      "Das Labyrinth ist voller Punkte und Früchte.",
      "Kirsche und Erdbeere geben Bonuspunkte.",
      "Meide die Monster, bis du eine große Pille isst.",
      "Werde schneller, während du das Spielfeld leerst.",
      "Teleportiere dich durch die Tunnel an den Seiten.",
      "Der Highscore wartet auf den besten Spieler.",
      "Im Geisterhaus regenerieren sie sich wieder.",
      "Retro-Arcade-Spiele machen am meisten Spaß.",
      "Münze einwerfen, um dein Pixel-Abenteuer zu starten."
    ]
  },
  [Theme.NONE]: {
    [Language.ENGLISH]: [],
    [Language.SPANISH]: [],
    [Language.FRENCH]: [],
    [Language.GERMAN]: []
  }
};

export function generateText(lang: Language, level: Level, length: TextLength, theme: Theme = Theme.NONE, subLevel: number = 0): string {
  let sourceTexts: string[] = [];

  if (theme === Theme.MARIO || theme === Theme.PACMAN) {
    sourceTexts = THEME_DICTIONARY[theme][lang] || THEME_DICTIONARY[theme][Language.ENGLISH];
  } else {
    sourceTexts = DICTIONARY[lang][level];
  }

  if (level === Level.BEGINNER && sourceTexts.length > 0) {
    // For beginner, we use the subLevel to pick specific strings to simulate "levels"
    const index = subLevel % sourceTexts.length;
    return sourceTexts[index];
  }

  // Pick N unique random texts based on length requested
  let count = 1;
  if (length === TextLength.MEDIUM) count = 2;
  if (length === TextLength.LONG) count = 3;

  const shuffled = [...sourceTexts].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  
  return selected.join(' ');
}
