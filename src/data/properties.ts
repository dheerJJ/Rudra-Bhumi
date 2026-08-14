import heroVilla from "@/assets/hero-villa.jpg";
import propertyVilla from "@/assets/property-villa.jpg";
import propertyPlot from "@/assets/property-plot.jpg";
import propertyApartment from "@/assets/property-apartment.jpg";
import propertyTower from "@/assets/property-tower.jpg";

export type PropertyCategory = "Villa" | "Plot" | "Rental" | "New Construction";

export type Property = {
  id: string;
  title: string;
  category: PropertyCategory;
  price: string;
  location: string;
  highlights: string[];
  description: string;
  images: { src: string; alt: string }[];
};

export const properties: Property[] = [
  {
    id: "kardhani-luxury-villa",
    title: "Signature 4 BHK Luxury Villa",
    category: "Villa",
    price: "₹1.85 Cr onwards",
    location: "Kardhani, Jhotwara, Jaipur",
    highlights: ["4 BHK", "3200 sq ft", "Private lawn", "Modular kitchen"],
    description:
      "A corner villa with double-height living, landscaped lawn and covered parking for two cars, minutes from Kardhani Market Road.",
    images: [
      { src: propertyVilla, alt: "Front elevation of a luxury villa in Kardhani, Jaipur" },
      { src: heroVilla, alt: "Villa exterior at twilight with warm lighting" },
      { src: propertyApartment, alt: "Spacious living room interior of the villa" },
    ],
  },
  {
    id: "kalwar-road-plots",
    title: "JDA Approved Residential Plots",
    category: "Plot",
    price: "₹30 Lakh onwards",
    location: "Kalwar Road, Jaipur",
    highlights: ["100–300 sq yd", "Wide 40 ft roads", "Clear title", "Loan assistance"],
    description:
      "Gated plotted development on a fast-appreciating corridor with electricity, water lines and boundary walls already in place.",
    images: [
      { src: propertyPlot, alt: "Residential plots with boundary markers on Kalwar Road, Jaipur" },
      { src: propertyTower, alt: "Upcoming residential development near the plot site" },
    ],
  },
  {
    id: "vaishali-furnished-apartment",
    title: "Fully Furnished 3 BHK Apartment",
    category: "Rental",
    price: "₹32,000 / month",
    location: "Vaishali Nagar, Jaipur",
    highlights: ["3 BHK", "Semi-gated society", "Covered parking", "Immediate possession"],
    description:
      "Bright, fully furnished apartment with modern interiors, ideal for families and working professionals relocating to Jaipur.",
    images: [
      { src: propertyApartment, alt: "Furnished living room of a 3 BHK apartment in Vaishali Nagar" },
      { src: propertyTower, alt: "Apartment tower exterior in Vaishali Nagar, Jaipur" },
    ],
  },
  {
    id: "jhotwara-new-tower",
    title: "New Construction 2 & 3 BHK Residences",
    category: "New Construction",
    price: "₹65 Lakh onwards",
    location: "Jhotwara, Jaipur",
    highlights: ["2 & 3 BHK", "Clubhouse", "Power backup", "Under construction"],
    description:
      "Pre-launch pricing on a modern residential tower with clubhouse, landscaped podium and dedicated visitor parking.",
    images: [
      { src: propertyTower, alt: "New residential tower under construction in Jhotwara, Jaipur" },
      { src: propertyApartment, alt: "Sample apartment interior of the new tower" },
      { src: propertyVilla, alt: "Landscaped surroundings of the new residential project" },
    ],
  },
];

export const featuredProperties = properties.slice(0, 3);
