// Glossary data - single source of truth for all formats
// Used by: /glossary page, /api/glossary, /glossary.json, JSON-LD schema

export interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation?: string;
  arabicScript?: string;
  tifinagh?: string;
  category: string;
  definition: string;
  context?: string;
  related?: string[];
  seeAlso?: string[]; // links to other glossary terms by id
}

export interface GlossaryCategory {
  id: string;
  title: string;
  description?: string;
  terms: GlossaryTerm[];
}

export const glossaryData: GlossaryCategory[] = [
  {
    id: "desert-types",
    title: "Desert Types",
    description: "Morocco contains three distinct desert landscapes, each with different terrain and character.",
    terms: [
      {
        id: "erg",
        term: "Erg",
        pronunciation: "urg",
        arabicScript: "عرق",
        category: "desert-types",
        definition: "A sand dune desert characterized by rolling dunes formed by wind-deposited sand. Morocco's two major ergs are Erg Chebbi near Merzouga and Erg Chigaga near M'Hamid.",
        context: "When most visitors imagine the Sahara, they picture an erg—the classic golden dunes.",
        related: ["Sahara", "Merzouga", "M'Hamid", "Erg Chebbi", "Erg Chigaga"],
        seeAlso: ["hammada", "reg"],
      },
      {
        id: "hammada",
        term: "Hammada",
        pronunciation: "ha-MAH-da",
        arabicScript: "حمادة",
        category: "desert-types",
        definition: "A stone or rock plateau desert, characterized by barren, hard, rocky surfaces with minimal sand. The Agafay Desert near Marrakech is a hammada.",
        context: "Unlike the dunes of an erg, a hammada offers stark, lunar landscapes of ochre rock stretching to the horizon.",
        related: ["Agafay", "stone desert", "rock desert"],
        seeAlso: ["erg", "reg"],
      },
      {
        id: "reg",
        term: "Reg",
        pronunciation: "reg",
        arabicScript: "رق",
        category: "desert-types",
        definition: "A gravel plain desert, covered with small stones and pebbles rather than sand or large rocks. Also called serir in some regions.",
        context: "Much of Morocco's desert terrain is technically reg—the flat, gravelly expanses between mountain ranges.",
        seeAlso: ["erg", "hammada"],
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "Traditional Moroccan building types and architectural elements.",
    terms: [
      {
        id: "riad",
        term: "Riad",
        pronunciation: "ree-YAD",
        arabicScript: "رياض",
        category: "architecture",
        definition: "A traditional Moroccan house or palace with an interior garden or courtyard. The name derives from the Arabic word for garden (ryad). Riads are built inward, with rooms arranged around a central open space, often featuring a fountain, trees, or tiles.",
        context: "Most riads in the medinas have been converted to guesthouses, offering an intimate alternative to hotels.",
        related: ["Moroccan architecture", "courtyard house", "traditional accommodation"],
        seeAlso: ["dar", "medina"],
      },
      {
        id: "dar",
        term: "Dar",
        pronunciation: "dar",
        arabicScript: "دار",
        category: "architecture",
        definition: "A traditional Moroccan townhouse, similar to a riad but typically smaller and without a garden—featuring a simple courtyard with a light well instead.",
        context: "The distinction between dar and riad is often blurred in tourism marketing, with many dars called riads.",
        seeAlso: ["riad"],
      },
      {
        id: "kasbah",
        term: "Kasbah",
        pronunciation: "KAZ-bah",
        arabicScript: "قصبة",
        category: "architecture",
        definition: "A fortified stronghold or citadel, typically built of pisé (rammed earth). Kasbahs served as the residences of local chieftains and as defensive structures along trade routes.",
        context: "The kasbahs of the Draa Valley and Dades Gorge date from the 17th-19th centuries, built to protect caravan routes.",
        related: ["fortress", "citadel", "pisé", "rammed earth"],
        seeAlso: ["ksar", "pise"],
      },
      {
        id: "ksar",
        term: "Ksar",
        pronunciation: "k-SAR",
        arabicScript: "قصر",
        category: "architecture",
        definition: "A fortified village, larger than a kasbah, consisting of multiple dwellings surrounded by defensive walls. Plural: ksour.",
        context: "Ait Benhaddou is Morocco's most famous ksar, a UNESCO World Heritage site.",
        related: ["fortified village", "Ait Benhaddou", "ksour"],
        seeAlso: ["kasbah"],
      },
      {
        id: "medina",
        term: "Medina",
        pronunciation: "meh-DEE-na",
        arabicScript: "مدينة",
        category: "architecture",
        definition: "The old walled city center, characterized by narrow winding streets, traditional architecture, and car-free zones. Morocco's imperial cities—Fes, Marrakech, Meknes, and Rabat—each have historic medinas.",
        context: "Fes el-Bali is the world's largest car-free urban area and one of the best-preserved medieval cities.",
        related: ["old city", "walled city", "Fes el-Bali", "historic quarter"],
        seeAlso: ["derb", "souk"],
      },
      {
        id: "derb",
        term: "Derb",
        pronunciation: "derb",
        arabicScript: "درب",
        category: "architecture",
        definition: "A narrow alley or lane within a medina, often dead-ending at a cluster of houses.",
        context: "Medina addresses typically reference the derb name rather than street numbers.",
        seeAlso: ["medina"],
      },
      {
        id: "pise",
        term: "Pisé",
        pronunciation: "pee-ZAY",
        category: "architecture",
        definition: "Rammed earth construction technique using compacted layers of soil, clay, and straw. The traditional building material for kasbahs and ksour in southern Morocco.",
        context: "Pisé buildings require constant maintenance; without repair, they dissolve back into the earth within decades.",
        related: ["rammed earth", "adobe", "earth construction"],
        seeAlso: ["kasbah", "ksar"],
      },
    ],
  },
  {
    id: "commerce-craft",
    title: "Commerce & Craft",
    description: "Traditional markets, workshops, and artisanal techniques.",
    terms: [
      {
        id: "souk",
        term: "Souk",
        pronunciation: "sook",
        arabicScript: "سوق",
        category: "commerce-craft",
        definition: "A traditional market or bazaar, typically organized by trade or product type. Souks may be permanent structures within a medina or weekly open-air markets in rural areas.",
        context: "Marrakech's souks are organized by craft: the souk of dyers, the souk of metalworkers, the souk of leather goods.",
        related: ["market", "bazaar", "marketplace"],
        seeAlso: ["medina", "fondouk"],
      },
      {
        id: "fondouk",
        term: "Fondouk",
        pronunciation: "fon-DOOK",
        arabicScript: "فندق",
        category: "commerce-craft",
        definition: "A historic caravanserai or merchants' inn, typically featuring a central courtyard surrounded by two stories of rooms and storage. Many now serve as artisan workshops.",
        context: "Fes has over 100 historic fondouks, some dating to the 13th century.",
        related: ["caravanserai", "khan", "merchants' inn"],
        seeAlso: ["souk"],
      },
      {
        id: "zellige",
        term: "Zellige",
        pronunciation: "zel-LEEJ",
        arabicScript: "زليج",
        category: "commerce-craft",
        definition: "Traditional Moroccan mosaic tilework made from hand-cut geometric pieces of glazed terracotta. Each piece is individually chiseled and assembled face-down to create intricate patterns.",
        context: "Zellige work requires years of apprenticeship. The craft is centered in Fes, where master craftsmen (maâlems) maintain techniques unchanged for centuries.",
        related: ["mosaic", "tilework", "Islamic geometric art", "Moroccan tiles"],
        seeAlso: ["maalem"],
      },
      {
        id: "tadelakt",
        term: "Tadelakt",
        pronunciation: "TAD-el-akt",
        arabicScript: "تدلاكت",
        category: "commerce-craft",
        definition: "A traditional waterproof lime plaster, polished with flat stones and treated with olive oil soap. Originally used in hammams, now popular for bathrooms and feature walls.",
        context: "Authentic tadelakt uses lime from the Marrakech region and requires specialized application techniques.",
        related: ["lime plaster", "Moroccan plaster", "waterproof finish"],
      },
      {
        id: "khettara",
        term: "Khettara",
        pronunciation: "khe-TAR-ah",
        arabicScript: "خطارة",
        category: "commerce-craft",
        definition: "An ancient underground irrigation system using gravity-fed tunnels to channel water from mountain aquifers to agricultural areas. Similar to Persian qanats. Some date back over 1,000 years.",
        context: "The khettaras of the Tafilalt oasis once numbered over 300; today fewer than 30 remain functional.",
        related: ["qanat", "irrigation", "underground canal", "foggara"],
      },
    ],
  },
  {
    id: "people-culture",
    title: "People & Culture",
    description: "Ethnic groups, languages, and cultural traditions.",
    terms: [
      {
        id: "amazigh",
        term: "Amazigh",
        pronunciation: "ah-mah-ZEEG",
        tifinagh: "ⴰⵎⴰⵣⵉⵖ",
        arabicScript: "أمازيغ",
        category: "people-culture",
        definition: "The indigenous people of North Africa, also known as Berbers. The name means 'free people' in Tamazight. Amazigh culture predates Arab arrival by millennia.",
        context: "Approximately 40% of Moroccans are ethnically Amazigh, with the highest concentrations in the Atlas Mountains and Rif.",
        related: ["Berber", "indigenous North African", "Imazighen"],
        seeAlso: ["tamazight", "tifinagh"],
      },
      {
        id: "tamazight",
        term: "Tamazight",
        pronunciation: "tam-ah-ZEEGT",
        tifinagh: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
        category: "people-culture",
        definition: "The family of Amazigh languages spoken across North Africa. In Morocco, the three main variants are Tashelhit (south), Tamazight (central Atlas), and Tarifit (Rif). Recognized as an official language of Morocco since 2011.",
        related: ["Berber language", "Tashelhit", "Tarifit", "Amazigh language"],
        seeAlso: ["amazigh", "tifinagh"],
      },
      {
        id: "tifinagh",
        term: "Tifinagh",
        pronunciation: "tif-in-AH",
        tifinagh: "ⵜⵉⴼⵉⵏⴰⵖ",
        category: "people-culture",
        definition: "The traditional alphabet used to write Amazigh languages, with origins dating back over 2,000 years. A modernized version was adopted for official use in Morocco in 2003.",
        context: "You'll see Tifinagh script on government buildings and road signs alongside Arabic and French.",
        related: ["Berber alphabet", "Amazigh script", "Libyco-Berber"],
        seeAlso: ["tamazight", "amazigh"],
      },
      {
        id: "gnaoua",
        term: "Gnaoua",
        pronunciation: "g-NOW-ah",
        arabicScript: "كناوة",
        category: "people-culture",
        definition: "A spiritual music tradition with roots in sub-Saharan African and Sufi practices. Gnaoua ceremonies (lilas) use hypnotic bass rhythms, metal castanets (qraqeb), and call-and-response singing.",
        context: "The Essaouira Gnaoua Festival each June is the largest celebration of this tradition.",
        related: ["Gnawa", "spiritual music", "trance music", "African diaspora"],
        seeAlso: ["lila", "maalem"],
      },
      {
        id: "lila",
        term: "Lila",
        pronunciation: "LEE-la",
        arabicScript: "ليلة",
        category: "people-culture",
        definition: "An all-night Gnaoua ceremony combining music, dance, and spiritual healing. Literally 'night' in Arabic. Each lila progresses through a sequence of ritual songs invoking different spirits (mluk).",
        context: "Authentic lilas are private spiritual ceremonies, not tourist performances.",
        related: ["Gnaoua ceremony", "spiritual healing", "trance ritual"],
        seeAlso: ["gnaoua", "maalem"],
      },
      {
        id: "maalem",
        term: "Maâlem",
        pronunciation: "mah-ah-LEM",
        arabicScript: "معلم",
        category: "people-culture",
        definition: "A master craftsman or musician. In Gnaoua tradition, a maâlem leads the spiritual ceremonies. In craft, a maâlem has completed formal apprenticeship and mastered their trade.",
        context: "The title carries significant respect—it denotes not just skill but transmission of traditional knowledge.",
        related: ["master craftsman", "master musician", "guild master"],
        seeAlso: ["gnaoua", "zellige"],
      },
      {
        id: "moussem",
        term: "Moussem",
        pronunciation: "MOO-sem",
        arabicScript: "موسم",
        category: "people-culture",
        definition: "A religious festival or pilgrimage, typically honoring a local saint (marabout). Moussems combine religious devotion with markets, music, and social gathering.",
        context: "The Imilchil Marriage Moussem in the High Atlas is one of Morocco's most famous, where young people traditionally chose marriage partners.",
        related: ["festival", "pilgrimage", "saint's day", "religious gathering"],
      },
    ],
  },
  {
    id: "geography",
    title: "Geography",
    description: "Mountains, valleys, and regional terminology.",
    terms: [
      {
        id: "high-atlas",
        term: "High Atlas",
        arabicScript: "الأطلس الكبير",
        category: "geography",
        definition: "Morocco's highest mountain range, running southwest to northeast for approximately 1,000 kilometers. Includes Jebel Toubkal (4,167m), the highest peak in North Africa.",
        context: "The High Atlas separates the Mediterranean climate of the north from the Saharan climate of the south.",
        related: ["Atlas Mountains", "Toubkal", "mountain range"],
        seeAlso: ["jebel", "middle-atlas", "anti-atlas"],
      },
      {
        id: "middle-atlas",
        term: "Middle Atlas",
        arabicScript: "الأطلس المتوسط",
        category: "geography",
        definition: "The northernmost of Morocco's Atlas ranges, characterized by cedar forests, lakes, and Amazigh villages. Lower and wetter than the High Atlas.",
        context: "The Middle Atlas is home to the endangered Barbary macaque and the cedar forests of Azrou.",
        related: ["Atlas Mountains", "Azrou", "Ifrane"],
        seeAlso: ["high-atlas"],
      },
      {
        id: "anti-atlas",
        term: "Anti-Atlas",
        arabicScript: "الأطلس الصغير",
        category: "geography",
        definition: "The southernmost Atlas range, older and more eroded than the High Atlas. Known for dramatic rock formations, ancient granites, and almond groves.",
        context: "The Anti-Atlas contains some of the oldest exposed rock on Earth, dating back over 2 billion years.",
        related: ["Atlas Mountains", "Tafraoute", "geological formations"],
        seeAlso: ["high-atlas"],
      },
      {
        id: "draa-valley",
        term: "Draa Valley",
        pronunciation: "drah",
        arabicScript: "وادي درعة",
        category: "geography",
        definition: "Morocco's longest river valley, stretching from the Atlas Mountains toward the Sahara. The Draa River feeds a chain of oases and palm groves, with kasbahs and ksour lining its banks.",
        context: "The valley was historically a key caravan route for trans-Saharan trade in gold, salt, and slaves.",
        related: ["Draa River", "palm oasis", "caravan route"],
        seeAlso: ["kasbah", "ksar", "oasis"],
      },
      {
        id: "jebel",
        term: "Jebel",
        pronunciation: "JEB-el",
        arabicScript: "جبل",
        category: "geography",
        definition: "Mountain or hill. Used in place names throughout Morocco: Jebel Toubkal, Jebel Saghro, Jebel Siroua.",
        context: "The Arabic term; the Amazigh equivalent is 'Adrar.'",
        related: ["mountain", "Adrar", "peak"],
      },
      {
        id: "oued",
        term: "Oued",
        pronunciation: "wed",
        arabicScript: "واد",
        category: "geography",
        definition: "A river or riverbed, often dry except during rainy season. Also spelled 'wadi.'",
        context: "Most Moroccan oueds are seasonal—raging torrents in spring, bone-dry wadis in summer.",
        related: ["wadi", "river", "riverbed", "seasonal river"],
      },
      {
        id: "oasis",
        term: "Oasis",
        arabicScript: "واحة",
        category: "geography",
        definition: "A fertile area in the desert sustained by groundwater or river water. Moroccan oases typically feature date palms, irrigation channels, and fortified villages (ksour).",
        context: "The Tafilalt oasis near Erfoud is one of the largest in Morocco, with over a million palm trees.",
        related: ["palm grove", "date palms", "Tafilalt", "Zagora"],
        seeAlso: ["khettara", "ksar"],
      },
    ],
  },
  {
    id: "food-drink",
    title: "Food & Drink",
    description: "Traditional Moroccan cuisine and culinary terms.",
    terms: [
      {
        id: "tagine",
        term: "Tagine",
        pronunciation: "tah-JEEN",
        arabicScript: "طاجين",
        category: "food-drink",
        definition: "Both a conical clay cooking vessel and the slow-cooked stew prepared in it. The cone-shaped lid returns condensation to the dish, allowing cooking with minimal liquid.",
        context: "Regional variations are significant: Marrakech favors sweet-savory combinations; Fes uses more preserved lemons and olives.",
        related: ["Moroccan stew", "clay pot cooking", "slow cooking"],
      },
      {
        id: "harira",
        term: "Harira",
        pronunciation: "ha-REE-ra",
        arabicScript: "حريرة",
        category: "food-drink",
        definition: "A tomato-based soup with chickpeas, lentils, and herbs, traditionally served to break the fast during Ramadan. Recipes vary by region and family.",
        context: "During Ramadan, harira is served at sunset with dates, chebakia (honey pastries), and hard-boiled eggs.",
        related: ["Ramadan soup", "Moroccan soup", "iftar"],
      },
      {
        id: "couscous",
        term: "Couscous",
        pronunciation: "KOOS-koos",
        arabicScript: "كسكس",
        category: "food-drink",
        definition: "Steamed semolina granules, traditionally hand-rolled and served with vegetables and meat. Friday couscous after midday prayers is a Moroccan institution.",
        context: "Authentic couscous is steamed three times over a simmering stew; instant couscous is a pale imitation.",
        related: ["seksu", "semolina", "Friday lunch"],
      },
      {
        id: "msemen",
        term: "Msemen",
        pronunciation: "m-SEH-men",
        arabicScript: "مسمن",
        category: "food-drink",
        definition: "A pan-fried flatbread made by folding and stretching dough into thin layers, creating a flaky, slightly chewy texture. Served for breakfast with honey or cheese.",
        related: ["Moroccan flatbread", "rghaif", "meloui", "breakfast bread"],
      },
      {
        id: "pastilla",
        term: "Pastilla",
        pronunciation: "pas-TEE-ya",
        arabicScript: "بسطيلة",
        category: "food-drink",
        definition: "A layered pie of thin warqa pastry filled with pigeon or chicken, almonds, eggs, and spices, dusted with cinnamon and powdered sugar. A signature dish of Fes.",
        context: "The sweet-savory combination—meat with sugar and cinnamon—reflects medieval Andalusian influence.",
        related: ["bastilla", "b'stilla", "pigeon pie", "Fassi cuisine"],
      },
      {
        id: "atay",
        term: "Atay",
        pronunciation: "ah-TAI",
        arabicScript: "أتاي",
        category: "food-drink",
        definition: "Moroccan mint tea, made with Chinese gunpowder green tea, fresh spearmint, and generous sugar. Poured from height to create a frothy top.",
        context: "Refusing tea is considered impolite. The ritual of preparation and serving is as important as the drink itself.",
        related: ["Moroccan mint tea", "whiskey Berber", "nana mint"],
      },
    ],
  },
];

// Helper function to get all terms as flat array
export function getAllTerms(): GlossaryTerm[] {
  return glossaryData.flatMap(category => category.terms);
}

// Helper function to get term by ID
export function getTermById(id: string): GlossaryTerm | undefined {
  return getAllTerms().find(term => term.id === id);
}

// Helper function to search terms
export function searchTerms(query: string): GlossaryTerm[] {
  const q = query.toLowerCase();
  return getAllTerms().filter(term => 
    term.term.toLowerCase().includes(q) ||
    term.definition.toLowerCase().includes(q) ||
    term.related?.some(r => r.toLowerCase().includes(q))
  );
}
