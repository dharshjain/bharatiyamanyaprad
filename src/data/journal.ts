export type Paper = {
  slug: string;
  title: string;
  authors: string[];
  pages: string;
  doi: string;
  category: string;
  abstract: string;
};

export type Issue = {
  volume: string;
  number: number;
  year: number;
  month: string;
  papers: Paper[];
};

export const currentIssue: Issue = {
  volume: "Vol. XI",
  number: 11,
  year: 2024,
  month: "May",
  papers: [
    {
      slug: "manuscript-cultures-of-western-india",
      title: "Manuscript Cultures of Western India: Scribes, Patrons and Palm Leaf",
      authors: ["Dr. Neerja A Gupta", "Dr. Kalpesh Trivedi"],
      pages: "1–24",
      doi: "10.5281/bm.2024.11.01",
      category: "Manuscript Studies",
      abstract:
        "A study of scribal workshops in Gujarat and Rajasthan between the twelfth and sixteenth centuries, reconstructing patronage networks through colophons preserved on palm leaf and early paper folios.",
    },
    {
      slug: "epigraphy-of-copper-plate-grants",
      title: "Reading Power: The Epigraphy of Copper Plate Grants in the Deccan",
      authors: ["Prof. R. Venkataraman"],
      pages: "25–48",
      doi: "10.5281/bm.2024.11.02",
      category: "Epigraphy",
      abstract:
        "Copper plate charters record more than land. This paper reads formulae, imprecations and royal genealogies as an administrative literature of the early medieval Deccan.",
    },
    {
      slug: "nalanda-and-the-idea-of-the-university",
      title: "Nalanda and the Idea of the University in Early India",
      authors: ["Dr. Ananya Bose", "Dr. Suresh Nair"],
      pages: "49–70",
      doi: "10.5281/bm.2024.11.03",
      category: "Intellectual History",
      abstract:
        "Revisiting monastic curricula, debate practice and library administration at Nalanda to ask what an Indic model of higher learning contributes to contemporary pedagogy.",
    },
    {
      slug: "sculpture-and-the-diasporic-eye",
      title: "Sculpture and the Diasporic Eye: Indian Art in Global Museums",
      authors: ["Dr. Meera Iyer"],
      pages: "71–92",
      doi: "10.5281/bm.2024.11.04",
      category: "Art & Archaeology",
      abstract:
        "How display conventions in European and American museums reshape the reception of temple sculpture among Indian residents, NRIs and PIOs alike.",
    },
    {
      slug: "language-memory-and-the-nri-self",
      title: "Language, Memory and the NRI Self",
      authors: ["Dr. Vikram Shah"],
      pages: "93–112",
      doi: "10.5281/bm.2024.11.05",
      category: "Cultural Studies",
      abstract:
        "A semiotic reading of household ritual, food and speech among second-generation Indian families, situating diasporic identity within a longer civilisational memory.",
    },
  ],
};

export const archives = [
  { volume: "Vol. XI", year: 2024, month: "May", papers: 5 },
  { volume: "Vol. IX", year: 2022, month: "May", papers: 7 },
  { volume: "Vol. VIII", year: 2020, month: "July", papers: 6 },
  { volume: "Vol. VII", year: 2019, month: "April–May", papers: 8 },
  { volume: "Vol. VI", year: 2018, month: "April–May", papers: 7 },
  { volume: "Vol. IV", year: 2017, month: "July", papers: 6 },
  { volume: "Vol. IV", year: 2016, month: "Annual", papers: 6 },
  { volume: "Vol. III", year: 2015, month: "Annual", papers: 5 },
  { volume: "Vol. II", year: 2014, month: "Annual", papers: 5 },
  { volume: "Vol. I", year: 2013, month: "June", papers: 6 },
];

export const board = [
  {
    name: "Dr. Neerja A Gupta",
    role: "Editor-in-Chief",
    institution: "Vice Chancellor, Sanchi University of Buddhist-Indic Studies",
    interests: ["Indic Studies", "Diaspora", "Cultural Theory"],
  },
  {
    name: "Prof. R. Venkataraman",
    role: "Associate Editor",
    institution: "Department of Epigraphy, University of Madras",
    interests: ["Epigraphy", "Deccan History"],
  },
  {
    name: "Dr. Ananya Bose",
    role: "Editorial Board",
    institution: "Centre for Historical Studies, Kolkata",
    interests: ["Buddhist Studies", "Intellectual History"],
  },
  {
    name: "Dr. Meera Iyer",
    role: "Editorial Board",
    institution: "Institute of Art History, Bengaluru",
    interests: ["Temple Art", "Museology"],
  },
  {
    name: "Dr. Kalpesh Trivedi",
    role: "Review Editor",
    institution: "Gujarat University, Ahmedabad",
    interests: ["Manuscriptology", "Sanskrit Poetics"],
  },
  {
    name: "Dr. Vikram Shah",
    role: "Editorial Board",
    institution: "School of Cultural Studies, Pune",
    interests: ["Semiotics", "Popular Culture"],
  },
];

export const categories = [
  { name: "Manuscript Studies", note: "Palm leaf, paper and scribal traditions" },
  { name: "Epigraphy", note: "Stone, copper plate and seal inscriptions" },
  { name: "Art & Archaeology", note: "Sculpture, temple form and excavation" },
  { name: "Intellectual History", note: "Śāstra, pedagogy and debate" },
  { name: "Cultural Studies", note: "Society, diaspora and popular culture" },
  { name: "Language & Literature", note: "Sanskrit, Prakrit and regional canons" },
];

export const contact = {
  editor: "Dr Neerja A Gupta",
  designation: "Vice Chancellor, Sanchi University of Buddhist-Indic Studies, Madhya Pradesh",
  address:
    "Principal, Bhavan's Arts and Commerce College, II Floor, Rituraj Appartment, Opp. Rupal Flats, Nr. St. Xavier's Loyola Hall, Navarangpura, Ahmedabad (Guj) 380009",
  telefax: "+91-79-27910213",
  phone: "+91-79-2560312 / 25600311",
  mobile: "+91-98250 12984",
  email: "drneerjaarun@gmail.com",
  website: "www.bharatiyamanyaprad.com",
  issn: "2321-8444",
};
