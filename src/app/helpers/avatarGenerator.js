export function generateAvatar(username) {
    return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(username)}.svg`;
  }
  