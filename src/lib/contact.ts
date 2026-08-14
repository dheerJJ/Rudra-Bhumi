export const BUSINESS = {
  name: "Rudra Bhumi Realtors",
  tagline: "Aapka Sapna, Hamari Zimmedari",
  phonePrimary: "+919772002008",
  phonePrimaryDisplay: "97720 02008",
  phoneSecondary: "+919784701144",
  phoneSecondaryDisplay: "97847 01144",
  whatsapp: "919772002008",
  email: "rudrabhumirealtors@gmail.com",
  street: "2nd floor, Bhumika Chamber, Office no. 111-112, Kardhani Market Rd",
  locality: "Jhotwara, Jaipur",
  region: "Rajasthan",
  postalCode: "302012",
  country: "IN",
  instagram: "https://www.instagram.com/rudrabhumirealtors",
  facebook: "https://www.facebook.com/RudraBhumiRealtors",
  maps: "https://maps.google.com/?q=Rudra+Bhumi+Realtors+Jhotwara+Jaipur",
  hours: "Daily 8:00 am – 8:00 pm",
} as const;

export const telHref = (phone: string = BUSINESS.phonePrimary) => `tel:${phone}`;

export function whatsappHref(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  `Hello ${BUSINESS.name}, I found you online and would like to know more about your properties in Jaipur.`;

export function propertyWhatsappMessage(title: string, location: string, price: string) {
  return `Hello ${BUSINESS.name}, I am interested in "${title}" (${location}, ${price}). Please share more details and arrange a site visit.`;
}

export type InquiryDetails = {
  name: string;
  phone: string;
  email?: string | undefined;
  propertyType?: string | undefined;
  budget?: string | undefined;
  preferredLocation?: string | undefined;
  message?: string | undefined;
};

export function inquiryWhatsappMessage(details: InquiryDetails) {
  return [
    `New property inquiry — ${BUSINESS.name}`,
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    details.email ? `Email: ${details.email}` : null,
    details.propertyType ? `Property type: ${details.propertyType}` : null,
    details.budget ? `Budget: ${details.budget}` : null,
    details.preferredLocation ? `Preferred location: ${details.preferredLocation}` : null,
    details.message ? `Message: ${details.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function inquiryMailtoHref(details: InquiryDetails) {
  const subject = `Property inquiry from ${details.name}`;
  return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    inquiryWhatsappMessage(details)
  )}`;
}
