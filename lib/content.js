export const REVIEWS = [
  ["“All done - thank you so much for getting it done so well and so quickly.”", "Mr David Breen", "Canonbury, London", 5],
  ["“Thank you so much Mr Omar. I appreciate an amazing work you have done to the bathroom. I'm loving it a lot more. God bless you and handy work.”", "Ms Ursula", "Battersea, London", 5],
  ["“Again massive thank you for your excellent job Omer, it is such a master piece!!”", "Ms Laure Caron", "Fulham, London", 5],
  ["“Hi Omar, looks fantastic. Well done. Really appreciate all your hard work. I will recommend you to my Dad, who should have some work coming up.”", "Mr Billy", "Brixton, London", 5],
  ["“Hi Omar, I have sent you the money. Thank you for the brilliant work!”", "Ms Hannah", "Stockwell, London", 5],
  ["“Tremendous job mate! Approved by the Mrs!!! Thanks again for all the hard work!!”", "Mr Arn", "Lambeth Bridge, London", 5],
];

export const HOME_BENEFITS = [
  ["Skilled and careful workmanship", "Reliable communication throughout"],
  ["Attention to the small details", "Professional, tidy approach"],
  ["Local service across London", "Solutions tailored to each home"],
  ["13+ years of experience in London", "Free on-site visit before every quote"],
];

export const STEPS = [
  ["01", "Tell Us About Your Project", "Get in touch easily via our online form or text us directly."],
  ["02", "Site Visit", "Free site visit to assess the job details on-site."],
  ["03", "Agree Scope & Price", "Clear, itemized transparent quote with no hidden extras."],
  ["04", "Get Your Home Improved", "Quality professional work delivered strictly on time."],
];

// 12 named areas, the same list the contact page's Service Areas section
// uses, split into pairs for the two-tag-per-row layout of "locations-row-1".
export const AREAS_HOME = ["Battersea", "Central London", "Chelsea", "Clapham Common", "Clapham Junction", "Clapham North", "Clapham South", "Oval", "Pimlico", "Stockwell", "Vauxhall", "Victoria"];
export const AREA_ROWS_HOME = Array.from({ length: Math.ceil(AREAS_HOME.length / 2) }, (_, i) => AREAS_HOME.slice(i * 2, i * 2 + 2));
export const AREA_HALVES_HOME = [AREAS_HOME.slice(0, 6), AREAS_HOME.slice(6, 12)];

export const ABOUT = [
  "Omar is an experienced, reliable handyman offering specialist renovation services across London. With a focus on precision, cleanliness, and clear communication, he helps homeowners turn ideas into finished spaces that feel like home.",
  "From kitchen remodels and bathroom fittings to bespoke carpentry and flooring, Omar brings a friendly, professional approach to every project. He works closely with clients to understand the brief, manage timelines, and deliver high-quality results that meet expectations.",
  "Whether you're refreshing a single room or planning a full renovation, Omar's goal is the same: to provide a stress-free experience, attention to detail, and a finish you'll love for years to come.",
];

export const FAQS = [
  ["How long does a typical renovation take?", "It depends on the scope, you will have a clear timeline agreed at the site visit, before any work begins."],
  ["Do you provide free consultations?", "Yes. Every project starts with a free site viewing so Omar can assess the job on site. You then get an itemised, transparent quote with no hidden extras."],
  ["Can I live in my home during the renovation?", "In most cases, yes. Work is kept contained to the area in hand and tidied at the end of each day. Where a kitchen or bathroom will be out of use for a short period, that is flagged in advance so you can plan around it."],
  ["What areas do you serve?", "Central London and the surrounding areas: Vauxhall, Oval, Pimlico, Victoria, Stockwell, Battersea, Clapham, Chelsea, Kennington and nearby. Get in touch if you are just outside, it is usually still possible."],
  ["Are all your portfolio photos genuine?", "Yes. Every photograph on this site is from a real project completed by Omar Decor, with no stock imagery and no renders."],
];

export const PRIVACY = {
  title: "Privacy Policy",
  updated: "6 August 2026",
  intro: "Omar Decor is a sole trader based in Vauxhall, London. This policy explains what personal information we collect when you contact us about home improvement work, why we hold it, and what you can ask us to do with it.",
  sections: [
    ["Who we are", ["Omar Decor, a sole trader based in Vauxhall, London. You can reach us by email at hello@omardecor.co.uk or by phone on 07766 355099. For the purposes of UK data protection law, we are the data controller for the information described here."]],
    ["What we collect", ["When you send an enquiry through this site we collect your name, phone number, email address, the location of the property, and the description of the work you give us. We collect nothing else through the form.", "If you call or text us, we hold your number and the details of what you tell us about the job."]],
    ["Why we hold it", ["To arrange your free site visit, to prepare and agree a price with you, and to carry out and invoice the work. We also keep records of completed work for accounting and tax purposes, as we are required to.", "We do not use your details for marketing, and we do not sell or share them with third parties for their own purposes."]],
    ["How long we keep it", ["Enquiries that do not lead to work are deleted within twelve months. Records relating to completed work are kept for six years after the end of the tax year they relate to, in line with HMRC requirements."]],
    ["Photographs of work", ["Every photograph on this site is our own work. Where a project is photographed for the gallery, we ask the homeowner first, and no photograph is published that identifies an address or the people who live there."]],
    ["Cookies", ["This site uses only what is needed to make it work, plus a single record of whether you have dismissed the cookie notice, stored in your browser. There is no advertising or cross-site tracking. You can clear it at any time through your browser settings."]],
    ["Your rights", ["You can ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete it. Email hello@omardecor.co.uk and we will respond within one month. If you are not satisfied with our response, you can complain to the Information Commissioner's Office at ico.org.uk."]],
    ["Changes to this policy", ["If this policy changes, the updated version will be published on this page with a new date at the top."]],
  ],
};

export const TERMS = {
  title: "Terms & Conditions",
  updated: "6 August 2026",
  intro: "These terms cover home improvement and handyman work carried out by Omar Decor for private homeowners. They are written to set out plainly what happens at each stage, what is included in a price, and how changes are handled.",
  sections: [
    ["Quotes and site visits", ["Every project begins with a free site visit. We do not give a price without seeing the work in person.", "After the visit you receive an itemised quote. The price is agreed with you before any work starts, and it holds for 30 days from the date it is issued."]],
    ["What a quote includes", ["The quote sets out the work, the labour, and the materials we are supplying. Anything not listed is not included. Where you are supplying materials yourself, that is stated on the quote."]],
    ["Changes to the work", ["If you ask for additional work once we have started, or if something is found behind a wall or under a floor that could not be seen at the site visit, we stop and price the change with you before continuing. No additional work is carried out without your agreement."]],
    ["Access and preparation", ["We need access to the property for the agreed dates and access to water and power. Please clear the working area of furniture and belongings where you can. If access is not available on a booked day, we may need to rebook."]],
    ["Timings", ["A timeline is agreed at the site visit. We will tell you as soon as possible if a delivery, a supply problem or a hidden condition affects it. Dates are worked to in good faith and are not guaranteed against events outside our control."]],
    ["Payment", ["For larger projects, a deposit towards materials is agreed in the quote. The balance is due on completion, within 14 days of the invoice date. For smaller jobs, payment is due on completion.", "Payment is by bank transfer. Bank details appear on the invoice."]],
    ["Standard of work and putting things right", ["Work is carried out with reasonable skill and care. If something we have installed or finished is not right, tell us within 12 months of completion and we will return and put it right at no cost, provided the issue is due to our workmanship rather than wear, damage, or later work by others."]],
    ["Cancellation", ["You can cancel a booked job at no cost up to 7 days before the start date. Inside 7 days, any materials already bought specifically for your job are chargeable."]],
    ["Insurance and liability", ["We hold public liability insurance and can provide details on request. Our liability is limited to the cost of putting right the work we carried out. We are not liable for pre-existing defects in the property."]],
    ["Complaints", ["Speak to us first. Email hello@omardecor.co.uk or call 07766 355099 and we will discuss it with you directly and agree how to resolve it."]],
    ["Governing law", ["These terms are governed by the law of England and Wales."]],
  ],
};
