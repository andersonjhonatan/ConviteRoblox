/**
 * Arquivo central de personalização do convite.
 * Para criar um novo tema, comece alterando os dados abaixo e os assets em public/.
 */
export const invitationConfig = {
  site: {
    url: "https://convite-roblox.jose-gomes-3350.chatgpt.site",
    title: "Convite Roblox — Miguel 8 anos",
    description: "Uma aventura interativa pelas ilhas para comemorar os 8 anos do Miguel.",
    locale: "pt_BR",
    themeColor: "#07101a",
    ogImage: "/roblox/island-1.png",
  },
  celebrant: {
    name: "Miguel",
    age: 8,
  },
  event: {
    startsAt: "2026-09-19T16:00:00-03:00",
    endsAt: "2026-09-19T20:00:00-03:00",
    timeZone: "America/Recife",
    venueName: "Arena Pixel Park",
    venueShortName: "Pixel Park",
    address: "Av. das Aventuras, 245 • Recife",
    mapsUrl: "https://maps.google.com/?q=Av.+das+Aventuras,+245,+Recife",
  },
  rsvp: {
    deadline: "12 de setembro de 2026",
    maxPartySize: 4,
    // Use somente números com DDI + DDD. Vazio abre o seletor de contatos do WhatsApp.
    whatsappNumber: "",
  },
  missions: [
    { id: 0, left: "16%", top: "31%", label: "Cristal da selva" },
    { id: 1, left: "40%", top: "58%", label: "Cristal da ponte" },
    { id: 2, left: "58%", top: "25%", label: "Cristal das nuvens" },
    { id: 3, left: "75%", top: "62%", label: "Cristal da vila" },
    { id: 4, left: "88%", top: "35%", label: "Cristal do portal" },
  ],
  assets: {
    avatarBoy: "/roblox/avatar-boy.png",
    avatarGirl: "/roblox/avatar-girl.png",
    avatarAlt: "/roblox/avatar-alt.png",
  },
} as const;

export type InvitationConfig = typeof invitationConfig;
