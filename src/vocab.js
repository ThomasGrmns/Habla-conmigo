// Vocabulary for Habla Conmigo (Latin American Spanish).
// mode "say": one tap speaks the whole phrase. mode "word": tiles add to the sentence.
// A third item in a tile ("duele") makes it open that category instead of speaking.
// Icons: an emoji (resolved to OpenMoji), "x:HEX" for OpenMoji extras, "draw:…", "body:…", "back:…", "face:…" for drawn pictures.
// This is only the starting board (and what "Volver al tablero original" restores). The family edits everything inside the app.
module.exports = {
  cats: [
    { id: "necesito", name: "Necesito", icon: "🙋", k: "social", mode: "say", items: [
      ["✅", "Sí"], ["❌", "No"],
      ["🚰", "Tengo sed"], ["🍽️", "Tengo hambre"],
      ["draw:pipi", "Quiero hacer pipí"], ["💩", "Quiero hacer popó"],
      ["🤕", "Me duele…", "duele"],
      ["🥶", "Tengo frío"], ["🥵", "Tengo calor"],
      ["🛌", "Quiero acostarme"], ["🪑", "Quiero sentarme"],
      ["x:E305", "Necesito mi medicina"], ["🥱", "Estoy cansado"],
      ["🚿", "Quiero bañarme"], ["📺", "Quiero ver la tele"],
      ["draw:remote", "Necesito el control de la tele"], ["🌳", "Quiero salir afuera"],
      ["❤️", "Te quiero"], ["🙏", "Gracias"],
      ["😕", "No entiendo"],
      ["🛑", "Para, por favor"], ["👍", "Estoy bien"]
    ]},
    { id: "duele", name: "Me duele", icon: "🤕", k: "pain", mode: "say", items: [
      ["face:head", "Me duele la cabeza"], ["face:eyes", "Me duelen los ojos"],
      ["face:ears", "Me duelen los oídos"], ["face:mouth", "Me duelen los dientes"],
      ["face:neck", "Me duele la garganta"], ["body:chest", "Me duele el pecho"],
      ["body:belly", "Me duele el estómago"], ["back:back", "Me duele la espalda"],
      ["body:arm", "Me duele el brazo"], ["body:hand", "Me duele la mano"],
      ["body:leg", "Me duele la pierna"], ["body:knee", "Me duele la rodilla"],
      ["body:foot", "Me duele el pie"], ["body:all", "Me duele todo"]
    ]},
    { id: "personas", name: "Personas", icon: "👪", k: "person", mode: "word", items: [
      ["🧓", "yo"], ["👉", "tú"], ["👨‍🦳", "mi hermano"],
      ["👩‍🦳", "mi hermana"], ["🧑", "mi amigo"], ["x:E301", "el doctor"], ["x:E302", "la enfermera"]
    ]},
    { id: "empezar", name: "Quiero…", icon: "👉", k: "verb", mode: "word", items: [
      ["🫴", "Quiero"], ["🙅", "No quiero"], ["❗", "Necesito"], ["👍", "Me gusta"],
      ["👎", "No me gusta"], ["🤲", "Dame"], ["🚪", "abre"], ["🔒", "cierra"],
      ["draw:window-open", "la ventana abierta"], ["draw:window-closed", "la ventana cerrada"],
      ["draw:door-open", "la puerta abierta"], ["draw:door-closed", "la puerta cerrada"], ["💡", "prende"],
      ["🌑", "apaga"], ["➕", "más"], ["🔁", "otra vez"], ["🛑", "ya no"]
    ]},
    { id: "comida", name: "Comer y tomar", icon: "🍽️", k: "noun", mode: "word", items: [
      ["🚰", "agua"], ["☕", "café"], ["🍵", "té"], ["🥛", "leche"],
      ["🧃", "jugo"], ["draw:can", "Coca-Cola"], ["🍞", "pan"], ["🍎", "fruta"],
      ["🍌", "plátano"], ["🍲", "sopa"], ["🍪", "galletas"], ["🍳", "huevos"],
      ["🍚", "arroz"], ["🍗", "pollo"], ["🌮", "tacos"], ["🍽️", "comer"], ["🥤", "tomar"]
    ]},
    { id: "cosas", name: "Casa y cosas", icon: "🏠", k: "noun", mode: "word", items: [
      ["🛏️", "la cama"], ["draw:quilt", "la colcha"], ["🪑", "la silla"], ["x:E141", "el sillón"],
      ["📺", "la tele"], ["👓", "los lentes"], ["💡", "la luz"], ["🪟", "la ventana"],
      ["🌳", "afuera"], ["🏠", "la casa"], ["🎵", "música"], ["draw:sweater", "el suéter"],
      ["🧦", "los calcetines"]
    ]},
    { id: "sentir", name: "Me siento", icon: "🙂", k: "desc", mode: "word", items: [
      ["🙂", "bien"], ["🙁", "mal"], ["😀", "contento"], ["😢", "triste"],
      ["😟", "nervioso"], ["😠", "enojado"], ["😐", "aburrido"], ["🥱", "cansado"],
      ["💫", "mareado"], ["😕", "confundido"], ["😨", "asustado"], ["🤢", "con náuseas"]
    ]},
    { id: "preguntas", name: "Preguntas", icon: "❓", k: "quest", mode: "word", items: [
      ["❓", "¿Qué?"], ["📍", "¿Dónde?"], ["🗓️", "¿Cuándo?"], ["🧑", "¿Quién?"],
      ["🤔", "¿Por qué?"], ["⌚", "¿Qué hora es?"], ["📅", "¿Qué día es hoy?"], ["🚪", "¿Quién viene?"],
      ["💬", "¿Cómo estás?"]
    ]},
    { id: "tiempo", name: "Cuándo", icon: "🕒", k: "time", mode: "word", items: [
      ["⏱️", "ahora"], ["⏳", "después"], ["📅", "hoy"], ["🌅", "mañana"],
      ["⏮️", "ayer"], ["🌄", "en la mañana"], ["☀️", "en la tarde"], ["🌙", "en la noche"],
      ["🐢", "despacio"], ["⚡", "rápido"]
    ]}
  ],
  // Extra pictures offered in the picture picker when customizing.
  library: ["❓","⭐","🙋","🤕","👉","🍽️","🏠","🙂","🕒","🔔","❤️","draw:remote","draw:quilt","draw:sweater","draw:can","draw:pipi","💩","🚽","draw:window-open","draw:window-closed","draw:door-open","draw:door-closed","📞","📻","📱","📰","🧥",
    "👴","👵","🧓","👨","👩","🧑","👦","👧","👶","👨‍🦳","👩‍🦳","👨‍🦲","👩‍🦱","👨‍🦱","👪","🫂","💏",
    "x:E300","x:E301","x:E302","x:E303","x:E327","🧑‍🦽","x:E326","x:E324","x:E30F","x:E307","💊","🩹","x:E31D","x:E321","x:E320",
    "🐶","🐱","🐦","🐔","🐴","🐄","🌻","🌹","🌳","🌵","☀️","🌧️","🌈",
    "🌮","🌯","🫔","🫓","🍕","🍔","🥑","🍊","🥭","🍉","🍇","🍓","🍍","🥗","🥩","🐟","🍰","🍦","🍫","🍬","🍺","🍷","☕","🧉",
    "⛪","📿","📖","✝️","🏥","🏪","🏞️","🏖️","🚗","🚌","🚕","✈️",
    "⚽","⚾","🥊","🎸","🎺","🎶","🃏","♟️","🎲","📷","x:E142","x:E1CC","🕰️","🔑","💵","🧢","👞","🪥","🧼","🧻","🪒","🧴","👕","👖",
    "🎂","🎁","🎉","💐","💤","🗣️","👂","👁️","🦷","🫀","🧠","🖐️","🦶","🦵","💪"
  ]
};
