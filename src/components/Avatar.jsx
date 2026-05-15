import { getAvatarById } from "../data/avatarOptions.js";

export default function Avatar({ avatarId, name = "", photoUrl = "", size = "medium" }) {
  const avatar = getAvatarById(avatarId);
  const fallbackInitials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span className={`avatar ${avatar.className} ${size}`} aria-hidden="true">
      {photoUrl ? <img src={photoUrl} alt="" /> : fallbackInitials || avatar.initials}
    </span>
  );
}
