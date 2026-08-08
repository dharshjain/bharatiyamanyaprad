export type Publication = {
  title: string;
  volume: string;
  period: string;
  year: number;
};

/** The published volumes, exactly as listed on the journal's publication page. */
export const publications: Publication[] = [
  {
    title: "Bharatiya Manyaprad Vol XI May 2024",
    volume: "Vol. XI",
    period: "May 2024",
    year: 2024,
  },
  {
    title: "Bharatiya Manyaprad Vol IX May 2022",
    volume: "Vol. IX",
    period: "May 2022",
    year: 2022,
  },
  {
    title: "Bharatiya Manyaprad Vol VIII July 2020",
    volume: "Vol. VIII",
    period: "July 2020",
    year: 2020,
  },
  {
    title: "Bharatiya Manyaprad Vol VII April-May 2019",
    volume: "Vol. VII",
    period: "April–May 2019",
    year: 2019,
  },
  {
    title: "Bharatiya Manyaprad Vol VI April-May 2018",
    volume: "Vol. VI",
    period: "April–May 2018",
    year: 2018,
  },
  {
    title: "Bharatiya Manyaprad Vol IV July 2017",
    volume: "Vol. IV",
    period: "July 2017",
    year: 2017,
  },
  { title: "Bharatiya Manyaprad Vol IV 2016", volume: "Vol. IV", period: "2016", year: 2016 },
  { title: "Bharatiya Manyaprad 2015", volume: "Annual", period: "2015", year: 2015 },
  { title: "Bharatiya Manyaprad 2014", volume: "Annual", period: "2014", year: 2014 },
  { title: "Bharatiya Manyaprad 2013", volume: "Annual", period: "2013", year: 2013 },
  {
    title: "International Journal of Indian Studies June 2013",
    volume: "Inaugural",
    period: "June 2013",
    year: 2013,
  },
];

export const notices = [
  "Bharatiya Manyaprad received financial support from the Indian Council of Historical Research (ICHR).",
  "Bharatiya Manyaprad comes under the aegis of Bhartiya Vidya Bhawan and Gujarat University, Ahmedabad (Gujarat).",
  "Bharatiya Manyaprad has been included by the International E-library www.libgenesis.org and volumes have been uploaded on the website.",
];

export const aboutParagraphs = [
  "BHARATIYA MANYAPRAD is a call to bring closer all Indians at one mental meadow irrespective of them being Indian residents, NRIs or PIOs. Certain issues touch all of them with the same concern.",
  "Bharatiya Manyaprad is an International Journal of Indian Studies aiming to bring the best of cultural studies to a diverse academic and non-academic audience. We feature research articles and features practices and conditions specific to contemporary popular culture, traditions, norms and societies. It shall include scholarly articles pertaining to the issues faced by Indians in any part of the world including India. It also invites books for review. It is a platform for all those who want to share issues which need attention and get things changed for the betterment. In fact it shall culminate into a dialogue bringing in a silent revolution amongst the people who are connected to India in any manner.",
  "Though it is a research journal, it shall still include the restlessness of an Indian as s/he faces the society around the world. It is a multicultural journal inviting articles from all sectors of life. Bharatiya Manyaprad shall contain socio-cultural-psycho issues as faced by Indians throughout the world including India.",
  "Articles should borrow from semiotics, psychoanalysis, queer theory and other academic disciplines associated with cultural studies and critical theory, while remaining accessible to a general audience. Ideally, articles should surprise and entertain, presenting smart, pithy analysis of familiar subject matter. Articles are liable to be published after peer review.",
];

export const heritageNote =
  "Prolonging the tradition of Bharatiyata, Bharatiya Manyaprad is an effort to initiate an incessant renaissance in the heritage of knowledge, wisdom and culture of the great Indian master spirits. The incipient perception must be carried forward with the belief that 'Bharat' is not just a nation but an ongoing civilization, not an accident of history but a design of destiny. Started by Bharatiya Vidya Bhavan's Ahmedabad Kendra, the journal invites Bharatiya wisdom across the borders.";

export const callForPapers = {
  volume: "Annual Vol X / No. 1",
  theme: "Azadi Ka Amrit Mahotsav",
  intro:
    "Bharatiya Manyaprad receives financial assistance from ICHR, New Delhi. This is a recognized peer-reviewed journal enlisted in the UGC CARE List, with established academic credibility in the field of research and scholarship.",
  themeNote:
    "Bharatiya Manyaprad invites proposals for papers (including photo features) based on the Indian freedom struggle and the freedom fighters of India. We are currently seeking submissions of not less than 3500 words. Article submissions should be preceded by a short personal and professional brief.",
  requirements: [
    "Language: English. Sanskrit or Hindi text may be supplemented as citations.",
    "Paper size A4, Times New Roman 12 pt, 1.5 line spacing, 12 pages maximum and 6 pages minimum.",
    'Page setup: margins 1" on right, top and bottom, and 1.5" on left.',
    "Title of the article: caps, bold, centered, 14 pt.",
    "First name, last name, institutional affiliation (full address and e-mail).",
    "Text of the article: justified.",
    "References: authors ordered alphabetically. Titles of books in italics; titles of articles quoted.",
    "Submissions should follow APA Style guidelines.",
    "Articles submitted as MS Word documents, sent as .rtf attachment via email to any of the editors specified.",
    'Declaration of "Not published before" and an undertaking of originality by the author.',
  ],
  bookReview: [
    "Books are welcome for review.",
    "The first reference to the book should include the publisher, place and year of publication.",
    "A first-hand copy should be mailed along with the book review.",
  ],
};

export const subscriptionRates = {
  india: { label: "India (₹)", individual: "600", institution: "900" },
  overseas: { label: "Overseas ($)", individual: "$ 21", institution: "$ 90" },
};

export const bankDetails = [
  { label: "Name of the bank", value: "UCO Bank" },
  { label: "Branch", value: "Khanpur, Ahmedabad" },
  { label: "Account holder", value: "Bharatiya Manyaprad" },
  { label: "Account number", value: "08060210001516" },
  { label: "MICR code", value: "380028005" },
  { label: "IFS code", value: "UCBA0000806" },
];

export const quickLinks = [
  { label: "Editorial Board", to: "/editorial-board" as const },
  { label: "Call for Papers", to: "/call-for-papers" as const },
  { label: "Instructions to Authors", to: "/instructions-to-authors" as const },
  { label: "Submit Review Paper", to: "/submission" as const },
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
