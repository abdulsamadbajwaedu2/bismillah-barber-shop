// ===== EDIT THIS FILE to change shop details, prices, team and images =====
const SHOP_CONFIG = {
  name: "Bismillah Barber Shop",
  owner: "Muhammad Arfan",
  address: "ADD ACTUAL SHOP ADDRESS",
  phone: "ADD ACTUAL PHONE NUMBER",          // e.g. "+92 300 1234567"
  whatsapp: "ADD REAL WHATSAPP NUMBER",      // digits with country code, e.g. "923001234567"
  openingHours: "ADD ACTUAL OPENING HOURS",
  mapEmbedUrl: "",                           // paste Google Maps "Embed a map" src URL
  heroImage: "",                             // e.g. "assets/images/hero.jpg"
  aboutImage: "",                            // e.g. "assets/images/shop.jpg"
  ownerProfile: { photo: "", experience: "", skills: "", background: "" },
  social: { facebook: "", instagram: "", tiktok: "" },
  barbers: [
    { name: "Muhammad Arfan", role: "Owner & Senior Barber", photo: "", bio: "A member of the team focused on helping customers find a haircut and grooming style that suits their preferences." },
    { name: "Talha", role: "Barber", photo: "", bio: "A member of the barbering team providing men's haircut and grooming services." },
    { name: "Faiz", role: "Barber", photo: "", bio: "A member of the team helping customers maintain their preferred haircut and personal style." }
  ],
  categories: ["Haircuts", "Beard Grooming", "Hair and Personal Care", "Kids' Haircuts"],
  // Suggested placeholder prices (PKR) - not verified by the shop
  services: [
    { name: "Regular Haircut", price: 200, category: "Haircuts", icon: "✂️", desc: "Classic, neat cut tailored to you." },
    { name: "Modern Haircut", price: 300, category: "Haircuts", icon: "💈", desc: "Trendy styles with clean finishing." },
    { name: "Skin Fade", price: 400, category: "Haircuts", icon: "🪒", desc: "Smooth blended fade from skin level." },
    { name: "Beard Trimming", price: 150, category: "Beard Grooming", icon: "🧔", desc: "Tidy trim and shape-up." },
    { name: "Beard Styling", price: 200, category: "Beard Grooming", icon: "🪒", desc: "Defined lines and styled beard." },
    { name: "Haircut + Beard", price: 400, category: "Beard Grooming", icon: "💈", desc: "Haircut and beard grooming together." },
    { name: "Head Massage", price: 200, category: "Hair and Personal Care", icon: "💆", desc: "Relaxing head massage." },
    { name: "Hair Wash", price: 150, category: "Hair and Personal Care", icon: "🚿", desc: "Refreshing hair wash." },
    { name: "Hair Styling", price: 200, category: "Hair and Personal Care", icon: "✨", desc: "Styled for your occasion." },
    { name: "Kids' Haircut", price: 200, category: "Kids' Haircuts", icon: "👦", desc: "Gentle, neat haircuts for kids." }
  ],
  // Add real photos: set src to "assets/images/yourfile.jpg"
  gallery: [
    { src: "", alt: "Modern men's haircut", icon: "✂️" }, { src: "", alt: "Skin fade and taper fade", icon: "🪒" },
    { src: "", alt: "Beard trimming", icon: "🧔" }, { src: "", alt: "Professional barber tools", icon: "🧰" },
    { src: "", alt: "Hair clippers and scissors", icon: "✂️" }, { src: "", alt: "Barber chair and mirror", icon: "💺" },
    { src: "", alt: "Barbershop interior", icon: "🏪" }, { src: "", alt: "Hair styling in progress", icon: "💈" }
  ],
  testimonials: [
    { text: "Sample placeholder - replace with genuine customer feedback.", author: "Customer name" },
    { text: "Sample placeholder - replace with genuine customer feedback.", author: "Customer name" },
    { text: "Sample placeholder - replace with genuine customer feedback.", author: "Customer name" }
  ]
};
