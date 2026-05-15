export const avatarOptions = [
  {
    id: "sunrise",
    label: "Sunrise",
    initials: "AN",
    className: "avatar-sunrise"
  },
  {
    id: "lagoon",
    label: "Lagoon",
    initials: "LV",
    className: "avatar-lagoon"
  },
  {
    id: "violet",
    label: "Violet",
    initials: "VX",
    className: "avatar-violet"
  },
  {
    id: "ember",
    label: "Ember",
    initials: "EX",
    className: "avatar-ember"
  },
  {
    id: "ink",
    label: "Ink",
    initials: "IK",
    className: "avatar-ink"
  }
];

export function getAvatarById(id) {
  return avatarOptions.find((avatar) => avatar.id === id) || avatarOptions[0];
}
