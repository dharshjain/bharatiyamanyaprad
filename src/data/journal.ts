export type Publication = {
  title: string;
  volume: string;
  period: string;
  year: number;
  journal_name?: string;
  issue_no?: string;
  pages?: string;
  author?: string;
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
  "Bharatiya Manyaprad is a call to bring closer all Indians to one mental meadow irrespective of whether them being Indian residents, NRIs, or PIOs. Certain issues touch all of them with the same concern. Bharatiya Manyaprad receives financial assistance from ICHR, New Delhi. This is a recognized Peer-reviewed journal that is enlisted in the UGC CARE List and has established academic credibility in the field of research and scholarship.",
  "Bharatiya Manyaprad is a new International Journal of Indian Studies with ISSN Number (2321 – 8444), aiming to bring the best of cultural studies to a diverse academic and non-academic audience. We feature research articles and feature practices and conditions specific to contemporary popular culture, traditions, norms, societies, etc. Bharatiya Manyaprad shall include scholarly articles in English pertaining to the issues which are faced by Indians in any part of the world including India. It also invites books for review. It’s a platform for all those who want to share the issues which need attention and get things changed for betterment. It shall culminate into a dialogue bringing in a silent revolution amongst the people who are connected to India in any manner.",
  "Though it is a research journal still it shall include the restlessness of an Indian as s/he faces in society around the world. It is a multicultural journal inviting articles from all sectors of life. Bharatiya Manyaprad shall contain socio-cultural-psycho issues as faced by Indians throughout the world including India.",
  "Articles should borrow from semiotics, psychoanalysis, queer theory, and other academic disciplines associated with cultural studies and critical theory while remaining accessible to a general audience. Ideally, articles should surprise and entertain, presenting smart, pithy analyses of the familiar subject matter. Articles are liable to be published after peer review.",
];

export const heritageNote =
  "Prolonging the tradition of Bharatiyata, Bharatiya Manyaprad is an effort to initiate an incessant renaissance in the heritage of knowledge, wisdom, and culture that great Indian master spirits. The incipient perception must be carried forward with the belief that 'Bharat' is not just a nation but an ongoing civilization, not an accident of history but a design of destiny. The vitality of Indian culture and its self-renewing greatness has always constituted a living principle. Bharatiya Manyaprad is a mirror image of this belief. Started by Bhartiya Vidya Bhavan’s Ahmedabad Kendra, the journal invites Bharatiya wisdom across the borders.";

export const callForPapers = {
  volume: "Annual Vol XIV",
  year: "2027",
  deadline: "October 15th, 2026",
  theme: "Call for Papers 2027",
  intro:
    "Bharatiya Manyaprad receives financial assistance from ICHR, New Delhi. This is a recognized Peer-reviewed journal that is enlisted in the UGC CARE List and has established academic credibility in the field of research and scholarship.",
  themeNote:
    "We seeking submissions of not less than 3500 words. Submissions are accepted till October 15th, 2026. Article submissions should be preceded by a short personal and professional brief with the following editing requirements:",
  requirements: [
    "Language: English. However, Sanskrit or Hindi text can be supplemented as citations.",
    "Paper size: A4, Font size: Times New Roman 12, Spacing: 1.5 line, 12 pages maximum, 6 pages minimum.",
    'Page setup: margins 1" on the right, top, and bottom, and 1.5" on the left.',
    "Title of the article: Caps, bold, centred 14-point fonts.",
    "First name, last name, institutional affiliation (full address and e-mail).",
    "Text of the article: justified.",
    "References: the authors should be ordered alphabetically. Titles of books: italics. Titles of articles: quoted. The submissions should follow APA Style guidelines.",
    "Articles will be submitted as MS Word documents and sent as .rtf attachments via email to any of the editors as specified.",
    'Declaration of "Not published before".',
    "Submissions are accepted till October 15th, 2026.",
    "The undertaking of the originality by the author.",
  ],
  bookReview: [
    "Books are welcome for review.",
    "The first reference to the book should include the publisher, space, and the year of publication.",
    "A firsthand copy should be mailed along with a book review.",
  ],
  pdfUrl: "/Bharatiya Manyaprad- Call for Papers.pdf",
};

export const subscriptionRates = {
  india: {
    label: "India (₹)",
    annual: { individual: "₹ 600", institution: "₹ 900" },
    threeYears: { individual: "₹ 1200", institution: "₹ 1800" },
  },
  overseas: {
    label: "Overseas ($)",
    annual: { individual: "$ 21", institution: "$ 90" },
    threeYears: { individual: "$ 40", institution: "$ 170" },
  },
};

export const bankDetails = [
  { label: "Bank", value: "State Bank of India" },
  { label: "Branch", value: "Lal Darwaja, Ahmedabad" },
  { label: "Account holder", value: "Neerja Gupta" },
  { label: "Account number", value: "20092293840" },
  { label: "MICR code", value: "380002002" },
  { label: "IFSC code", value: "SBIN0000301" },
  { label: "UPI Number", value: "9825012984" },
];

export const quickLinks = [
  { label: "Editorial Board", to: "/editorial-board" as const },
  { label: "Call for Papers", to: "/call-for-papers" as const },
  { label: "Instructions to Authors", to: "/instructions-to-authors" as const },
  { label: "Submit Review Paper", to: "/submission" as const },
];

export const contact = {
  editor: "Dr Neerja Gupta",
  designation: "Former Vice Chancellor, Sanchi University of Buddhist-Indic Studies, Madhya Pradesh",
  address:
    "Principal, Bhavan's Arts and Commerce College, II Floor, Rituraj Appartment, Opp. Rupal Flats, Nr. St. Xavier's Loyola Hall, Navarangpura, Ahmedabad (Guj) 380009",
  telefax: "+91-79-27910213",
  phone: "+91-79-2560312 / 25600311",
  mobile: "+91 98250 12984",
  whatsapp: "+91 98250 12984",
  email: "bhartiyamanyaprad@gmail.com",
  website: "www.bharatiyamanyaprad.com",
  issn: "2321-8444",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61593040995393",
    instagram: "https://www.instagram.com/bharatiya_manyaprad/",
  },
};
