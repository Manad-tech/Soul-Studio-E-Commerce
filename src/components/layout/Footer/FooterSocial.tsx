import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
} from "react-icons/fa";

export default function FooterSocial() {
  return (
    <div className="flex gap-4">
      <FaInstagram className="cursor-pointer transition hover:text-var(--primary)" />
      <FaFacebookF className="cursor-pointer transition hover:text-var(--primary)" />
      <FaPinterestP className="cursor-pointer transition hover:text-var(--primary)" />
    </div>
  );
}
