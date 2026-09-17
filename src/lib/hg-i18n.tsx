"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
export type Lang = "pt" | "en";

const LangCtx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof pt;
} | null>(null);

const pt = {
  nav: {
    menu: "Menu",
    close: "Fechar",
    links: [
      { id: "obras", label: "Obras" },
      { id: "artistas", label: "Artistas" },
      { id: "servicos", label: "Serviços" },
      { id: "faq", label: "FAQ" },
      { id: "contacto", label: "Contacto" },
    ],
    tagline: "Tatuagem & Piercing — Porto, desde 2010",
    langLabel: "PT",
  },
  cursor: { view: "Ver" },
  preloader: {
    tagline: "TATTOO & PIERCING — PORTO",
  },
  hero: {
    label: "( Estúdio de Tatuagem & Piercing )",
    city: "Porto, PT",
    est: "EST. 2010",
    since: "desde 2010",
    sub: "No coração do Porto, transformamos pele em obra de arte há mais de uma década. Tatuagem autoral, piercing de precisão — e walk-ins sempre bem-vindos.",
    ctaPrimary: "Marcar sessão",
    ctaSecondary: "Ver obras",
    scroll: "Desliza",
    vertical: "TATTOO — PIERCING — PORTO",
  },
  ticker: {
    items: [
      "WALK-INS BEM-VINDOS",
      "TATUAGEM AUTORAL",
      "PIERCING DE PRECISÃO",
      "MARCAÇÕES ABERTAS",
      "PORTO · EST. 2010",
    ],
    items2: [
      "HEARTGALLERY",
      "PAULO RUI",
      "MARCUS",
      "GUEST ARTISTS",
      "TATUAGEM",
      "PIERCING",
    ],
  },
  manifesto: {
    label: "( Manifesto )",
    statementA: "A tua pele é",
    statementEm: "a galeria.",
    statementB: "Nós apenas expomos.",
    p1: "O HeartGallery nasceu em 2010, numa rua que bate ao ritmo do Porto. O nome diz tudo: cada pele é uma galeria e cada tatuagem, uma peça única que ninguém mais vai vestir. Trabalhamos devagar, com agulha fina e conversa longa — porque uma peça boa não se apressa, sente-se.",
    p2: "Do realismo preto & cinzento à linha fina mais delicada, do azulejo português à joalharia de piercing — tudo passa pela mesma obsessão: higiene impecável, material certificado e um estúdio onde qualquer pessoa entra e se sente em casa. Isso é o coração da coisa.",
    stats: [
      { n: "15+", label: "anos de estúdio" },
      { n: "2", label: "tatuadores residentes" },
      { n: "100%", label: "estéril & certificado" },
      { n: "∞", label: "peças únicas" },
    ],
    imageCaption: "O estúdio — Rua Mártires da Liberdade, Porto",
  },
  gallery: {
    label: "( Obras )",
    headingA: "Cada peça",
    headingEm: "uma obra.",
    headingB: "",
    intro: "Uma amostra do que sai das nossas agulhas — realismo, blackwork, fine line, azulejo português e a curadoria de piercing mais bonita do Porto.",
    filters: {
      all: "Tudo",
      tattoo: "Tatuagem",
      piercing: "Piercing",
    },
    styleLabel: "Estilo",
    styleAll: "Todos os estilos",
    credit: "Peça única — não se repete",
    count: "peças",
    lightboxClose: "Fechar",
    lightboxPrev: "Anterior",
    lightboxNext: "Seguinte",
  },
  artists: {
    label: "( Artistas )",
    headingA: "As mãos",
    headingEm: "por trás",
    headingB: "da agulha.",
    intro: "Uma equipa pequena de propósito — poucas mãos, muita atenção.",
    resident: "Residente",
    manager: "Gerência",
    guests: "Convidados",
    members: [
      {
        name: "Paulo Rui",
        role: "Tatuagem & Piercing",
        bio: "O coração do estúdio desde o primeiro dia. Realismo preto & cinzento na tatuagem, precisão obsessiva no piercing — e a joalharia mais bonita da casa.",
        tags: ["Realismo P&B", "Piercing", "Curadoria de jóia"],
      },
      {
        name: "Marcus",
        role: "Tatuagem",
        bio: "Traço firme, imaginação fértil. Do blackwork mais pesado às linhas que parecem desenhadas a tinta-da-china — cada sessão é uma conversa com a pele.",
        tags: ["Blackwork", "Fine line", "Ornamental"],
      },
      {
        name: "Taciana",
        role: "Gerência",
        bio: "A força por trás do balcão e do café bem passado. Organiza as marcações, acolhe os nervosos de primeira viagem e mantém o estúdio a funcionar como relojoaria.",
        tags: ["Marcações", "Orçamentos", "Café"],
      },
      {
        name: "+ Guests",
        role: "Convidados",
        bio: "Recebemos tatuadores convidados de todo o mundo ao longo do ano — datas e estilos anunciados sempre no Instagram. Fica atento: as vagas voam.",
        tags: ["Internacional", "Datas no IG", "Vagas limitadas"],
      },
    ],
    cta: "Trabalhar com o estúdio → DM",
  },
  services: {
    label: "( Serviços )",
    headingA: "Do rascunho",
    headingEm: "à cura.",
    headingB: "",
    intro: "Quatro formas de atravessar a nossa porta — todas com o mesmo padrão de higiene, material certificado e carinho.",
    items: [
      {
        n: "01",
        title: "Tatuagem autoral",
        desc: "Traz a ideia — um desenho, uma foto, um sentimento — e transformamos-na numa peça feita à tua medida. Esboço incluído; alterações até te sentires 100% confortável. Marcação por DM do Instagram ou email.",
        tags: ["Consulta incluída", "Esboço personalizado", "Sessões à medida"],
      },
      {
        n: "02",
        title: "Piercing",
        desc: "Perfuração segura com agulha esterilizada de uso único e joalharia premium em titânio e ouro — da curadoria de orelha mais bonita do Porto ao teu primeiro furo. Orientação de cuidados incluída.",
        tags: ["Agulha de uso único", "Titânio & ouro", "Cuidados pós"],
      },
      {
        n: "03",
        title: "Walk-ins",
        desc: "Sem marcação, sem esperar semanas: todos os dias há desenhos do dia à espera de pele. Passa pelo estúdio, escolhe a tua peça e sais tatuado — por ordem de chegada, sujeito a disponibilidade.",
        tags: ["Sem marcação", "Desenhos do dia", "Porto no teu ritmo"],
      },
      {
        n: "04",
        title: "Guest artists",
        desc: "Ao longo do ano recebemos tatuadores convidados com estilos que não encontras cá todos os dias. As datas são anunciadas no Instagram e as vagas esgotam rápido — segue-nos para não perderes.",
        tags: ["Datas no Instagram", "Estilos convidados", "Vagas limitadas"],
      },
    ],
  },
  faq: {
    label: "( Perguntas frequentes )",
    headingA: "Antes",
    headingEm: "da agulha.",
    headingB: "",
    items: [
      {
        q: "Como marco uma tatuagem ou piercing?",
        a: "O caminho mais rápido é uma mensagem no Instagram (@heartgallerytattoopiercing) ou um email para heartgallerytattoo@gmail.com. Conta-nos a ideia, a zona do corpo e o tamanho aproximado — respondemos com disponibilidade e orçamento. Piercings também podem ser feitos sem marcação, se houver disponibilidade no dia.",
      },
      {
        q: "Quanto custa a minha peça?",
        a: "Depende do tamanho, da zona do corpo, do detalhe e do tempo de sessão. Tatuagens pequenas têm valor mínimo definido no dia; peças grandes são orçamentadas por sessão. Envia-nos a tua ideia e devolvemos um valor claro, sem surpresas — o esboço e a consulta estão sempre incluídos.",
      },
      {
        q: "Dói?",
        a: "Sinceramente: um pouco, sim — mas aguentável para quase tudo e todos. A dor varia com a zona (costelas e pés pedem mais respiração profunda; braços e coxas são mais amigos). As nossas sessões têm pausas sempre que precisares e a conversa boa também é anestésico.",
      },
      {
        q: "Qual é a idade mínima?",
        a: "Tatuamos e fazemos piercing a maiores de 18 anos. Entre os 16 e os 17 anos é possível com autorização escrita do encarregado de educação, que tem de estar presente no dia com documento de identificação de ambos. Traz sempre um documento com foto.",
      },
      {
        q: "Como cuido da minha tatuagem nova?",
        a: "No dia, entregamos-te as instruções e o plástico adequado. Regra de ouro: lavar com água morna e sabão neutro, hidratar com uma fina camada de creme recomendado, não arrancar crostas e evitar sol e piscinas nas primeiras semanas. Qualquer dúvida durante a cura — manda-nos mensagem, respondemos sempre.",
      },
      {
        q: "Como funcionam os walk-ins?",
        a: "Simples: apareces ao estúdio e escolhes entre os desenhos disponíveis no dia — pequenos a médios, prontos a tatuarse. É por ordem de chegada e sujeito à agenda dos artistas, por isso chega cedo. É a forma perfeita de sair do estúdio com uma surpresa boa debaixo da pele.",
      },
    ],
  },
  contact: {
    label: "( Marcações )",
    headingA: "Vamos deixar",
    headingEm: "marca.",
    headingB: "",
    sub: "Conta-nos a ideia e transformamo-la em pele. Respondemos ao DM e ao email todos os dias úteis — ou aparece ao estúdio e falamos com um café.",
    name: "Nome *",
    namePh: "O teu nome",
    email: "Email *",
    emailPh: "oteu@email.com",
    message: "A tua ideia *",
    messagePh: "Descreve a peça — zona do corpo, tamanho, estilo, referências…",
    send: "Enviar ideia",
    sending: "A enviar",
    successTitle: "Ideia recebida.",
    successText:
      "Obrigado! A equipa responde em breve — normalmente no próprio dia útil. Se for urgente, o Instagram é o caminho mais rápido.",
    sendAnother: "Enviar outra ideia",
    tryAgain: "— por favor tenta novamente.",
    infoTitle: "O estúdio",
    address: "Rua Mártires da Liberdade 132A",
    addressCity: "4050-359 Porto, Portugal",
    hoursTitle: "Horário",
    hoursValue: "Seg — Sáb · 11:00 — 19:00",
    hoursNote: "Walk-ins por ordem de chegada",
    follow: "Seguir",
    emailLabel: "Email",
    igLabel: "Instagram",
    fbLabel: "Facebook",
    booking: "Marcações & orçamentos",
    bookingVia: "Instagram DM ou email",
    igCtaLabel: "A forma mais rápida",
    igCtaTitle: "Marcar por Instagram",
    igCtaText: "Manda-nos DM com a tua ideia — é assim que a maioria das marcações acontece.",
    mapTitle: "Como chegar",
  },
  footer: {
    marquee: [
      "HEARTGALLERY",
      "♥",
      "PORTO",
      "♥",
      "TATTOO",
      "♥",
      "PIERCING",
      "♥",
      "EST. 2010",
      "♥",
    ],
    rights: "HeartGallery Tattoo Piercing®",
    madeBy: "Criação e desenvolvimento",
    backToTop: "Voltar ao topo",
    tagline: "A tua pele é a galeria.",
  },
};

const en: typeof pt = {
  nav: {
    menu: "Menu",
    close: "Close",
    links: [
      { id: "obras", label: "Works" },
      { id: "artistas", label: "Artists" },
      { id: "servicos", label: "Services" },
      { id: "faq", label: "FAQ" },
      { id: "contacto", label: "Contact" },
    ],
    tagline: "Tattoo & Piercing — Porto, since 2010",
    langLabel: "EN",
  },
  cursor: { view: "View" },
  preloader: {
    tagline: "TATTOO & PIERCING — PORTO",
  },
  hero: {
    label: "( Tattoo & Piercing Studio )",
    city: "Porto, PT",
    est: "EST. 2010",
    since: "since 2010",
    sub: "In the heart of Porto, we've been turning skin into art for over a decade. Author tattoos, precision piercing — and walk-ins always welcome.",
    ctaPrimary: "Book a session",
    ctaSecondary: "View works",
    scroll: "Scroll",
    vertical: "TATTOO — PIERCING — PORTO",
  },
  ticker: {
    items: [
      "WALK-INS WELCOME",
      "AUTHOR TATTOOS",
      "PRECISION PIERCING",
      "BOOKINGS OPEN",
      "PORTO · EST. 2010",
    ],
    items2: [
      "HEARTGALLERY",
      "PAULO RUI",
      "MARCUS",
      "GUEST ARTISTS",
      "TATTOO",
      "PIERCING",
    ],
  },
  manifesto: {
    label: "( Manifesto )",
    statementA: "Your skin is",
    statementEm: "the gallery.",
    statementB: "We just curate it.",
    p1: "HeartGallery was born in 2010, on a street that beats to Porto's rhythm. The name says it all: every skin is a gallery and every tattoo a one-of-a-kind piece nobody else will ever wear. We work slowly, with a fine needle and a long conversation — because good art isn't rushed, it's felt.",
    p2: "From black & grey realism to the most delicate fine line, from Portuguese tile motifs to piercing jewellery — everything passes through the same obsession: impeccable hygiene, certified materials and a studio where anyone walks in and feels at home. That's the heart of it.",
    stats: [
      { n: "15+", label: "years of studio" },
      { n: "2", label: "resident tattooers" },
      { n: "100%", label: "sterile & certified" },
      { n: "∞", label: "one-of-a-kind pieces" },
    ],
    imageCaption: "The studio — Rua Mártires da Liberdade, Porto",
  },
  gallery: {
    label: "( Works )",
    headingA: "Every piece,",
    headingEm: "an artwork.",
    headingB: "",
    intro: "A sample of what comes out of our needles — realism, blackwork, fine line, Portuguese tile and the most beautiful piercing curation in Porto.",
    filters: {
      all: "All",
      tattoo: "Tattoo",
      piercing: "Piercing",
    },
    styleLabel: "Style",
    styleAll: "All styles",
    credit: "One-of-a-kind — never repeated",
    count: "pieces",
    lightboxClose: "Close",
    lightboxPrev: "Previous",
    lightboxNext: "Next",
  },
  artists: {
    label: "( Artists )",
    headingA: "The hands",
    headingEm: "behind",
    headingB: "the needle.",
    intro: "A small team on purpose — fewer hands, more attention.",
    resident: "Resident",
    manager: "Management",
    guests: "Guests",
    members: [
      {
        name: "Paulo Rui",
        role: "Tattoo & Piercing",
        bio: "The heart of the studio since day one. Black & grey realism in tattooing, obsessive precision in piercing — and the finest jewellery curation in the house.",
        tags: ["B&G Realism", "Piercing", "Jewellery curation"],
      },
      {
        name: "Marcus",
        role: "Tattoo",
        bio: "Steady hand, fertile imagination. From the heaviest blackwork to lines that look ink-drawn — every session is a conversation with the skin.",
        tags: ["Blackwork", "Fine line", "Ornamental"],
      },
      {
        name: "Taciana",
        role: "Management",
        bio: "The force behind the counter and the well-made coffee. She runs the bookings, calms the first-timer nerves and keeps the studio running like clockwork.",
        tags: ["Bookings", "Quotes", "Coffee"],
      },
      {
        name: "+ Guests",
        role: "Guests",
        bio: "We host guest tattooers from all over the world throughout the year — dates and styles always announced on Instagram. Stay tuned: slots fly.",
        tags: ["International", "Dates on IG", "Limited slots"],
      },
    ],
    cta: "Work with the studio → DM",
  },
  services: {
    label: "( Services )",
    headingA: "From sketch",
    headingEm: "to healing.",
    headingB: "",
    intro: "Four ways to walk through our door — all with the same standard of hygiene, certified material and care.",
    items: [
      {
        n: "01",
        title: "Author tattoos",
        desc: "Bring the idea — a drawing, a photo, a feeling — and we'll turn it into a piece made to measure. Sketch included; revisions until you feel 100% comfortable. Booking via Instagram DM or email.",
        tags: ["Consultation included", "Custom sketch", "Tailored sessions"],
      },
      {
        n: "02",
        title: "Piercing",
        desc: "Safe piercing with single-use sterile needles and premium titanium & gold jewellery — from Porto's most beautiful ear curation to your very first hole. Aftercare guidance included.",
        tags: ["Single-use needle", "Titanium & gold", "Aftercare"],
      },
      {
        n: "03",
        title: "Walk-ins",
        desc: "No booking, no waiting weeks: every day there are day-of designs waiting for skin. Walk into the studio, pick your piece and leave tattooed — first come, first served, subject to availability.",
        tags: ["No booking", "Day-of designs", "Porto at your pace"],
      },
      {
        n: "04",
        title: "Guest artists",
        desc: "Throughout the year we host guest tattooers with styles you won't find here every day. Dates are announced on Instagram and slots sell out fast — follow us so you don't miss out.",
        tags: ["Dates on Instagram", "Guest styles", "Limited slots"],
      },
    ],
  },
  faq: {
    label: "( Frequently asked )",
    headingA: "Before",
    headingEm: "the needle.",
    headingB: "",
    items: [
      {
        q: "How do I book a tattoo or piercing?",
        a: "The fastest way is a message on Instagram (@heartgallerytattoopiercing) or an email to heartgallerytattoo@gmail.com. Tell us the idea, body area and approximate size — we reply with availability and a quote. Piercings can also be done without a booking, subject to same-day availability.",
      },
      {
        q: "How much will my piece cost?",
        a: "It depends on size, body area, detail and session time. Small tattoos have a minimum rate set on the day; large pieces are quoted per session. Send us your idea and we'll return a clear price, no surprises — sketch and consultation are always included.",
      },
      {
        q: "Does it hurt?",
        a: "Honestly: a bit, yes — but bearable for almost everything and everyone. Pain varies by area (ribs and feet ask for deep breaths; arms and thighs are friendlier). Our sessions have breaks whenever you need them, and good conversation works as an anaesthetic too.",
      },
      {
        q: "What's the minimum age?",
        a: "We tattoo and pierce anyone aged 18 or over. Between 16 and 17 it's possible with written parental consent, with the guardian present on the day, ID in hand, for both. Always bring a photo ID.",
      },
      {
        q: "How do I care for my fresh tattoo?",
        a: "On the day we hand you the instructions and proper wrapping. Golden rule: wash with lukewarm water and neutral soap, moisturise with a thin layer of the recommended cream, don't pick scabs and avoid sun and pools for the first weeks. Any doubt during healing — message us, we always reply.",
      },
      {
        q: "How do walk-ins work?",
        a: "Simple: show up at the studio and choose from the designs available that day — small to medium, ready to go. First come, first served and subject to the artists' schedule, so arrive early. It's the perfect way to leave the studio with a good surprise under your skin.",
      },
    ],
  },
  contact: {
    label: "( Bookings )",
    headingA: "Let's make",
    headingEm: "a mark.",
    headingB: "",
    sub: "Tell us your idea and we'll turn it into skin. We answer DMs and email every working day — or drop by the studio and let's talk over a coffee.",
    name: "Name *",
    namePh: "Your name",
    email: "Email *",
    emailPh: "you@email.com",
    message: "Your idea *",
    messagePh: "Describe the piece — body area, size, style, references…",
    send: "Send idea",
    sending: "Sending",
    successTitle: "Idea received.",
    successText:
      "Thank you! The team will reply soon — usually the same working day. If it's urgent, Instagram is the fastest way.",
    sendAnother: "Send another idea",
    tryAgain: "— please try again.",
    infoTitle: "The studio",
    address: "Rua Mártires da Liberdade 132A",
    addressCity: "4050-359 Porto, Portugal",
    hoursTitle: "Hours",
    hoursValue: "Mon — Sat · 11:00 — 19:00",
    hoursNote: "Walk-ins, first come first served",
    follow: "Follow",
    emailLabel: "Email",
    igLabel: "Instagram",
    fbLabel: "Facebook",
    booking: "Bookings & quotes",
    bookingVia: "Instagram DM or email",
    igCtaLabel: "The fastest way",
    igCtaTitle: "Book via Instagram",
    igCtaText: "Send us a DM with your idea — that's how most bookings happen.",
    mapTitle: "Find us",
  },
  footer: {
    marquee: [
      "HEARTGALLERY",
      "♥",
      "PORTO",
      "♥",
      "TATTOO",
      "♥",
      "PIERCING",
      "♥",
      "EST. 2010",
      "♥",
    ],
    rights: "HeartGallery Tattoo Piercing®",
    madeBy: "Design & development",
    backToTop: "Back to top",
    tagline: "Your skin is the gallery.",
  },
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem("hg-lang");
    if (stored === "pt" || stored === "en") {
      // defer to after paint — avoids synchronous setState in effect
      const id = requestAnimationFrame(() => setLangState(stored));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("hg-lang", l);
    document.documentElement.lang = l === "pt" ? "pt" : "en";
  }, []);

  const t = lang === "pt" ? pt : en;

  const value = useMemo(
    () => ({ lang, setLang, t }),
    [lang, setLang, t]
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
