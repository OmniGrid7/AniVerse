import { useEffect, useState } from "react";
import { avatarOptions } from "../data/avatarOptions.js";
import Avatar from "./Avatar.jsx";

const emptyProfile = {
  fullName: "",
  email: "",
  favoriteAnime: "",
  role: "Reader",
  bio: "",
  avatarId: "sunrise",
  photoUrl: ""
};

export default function SignupView({ profile, saveProfile, profileRank, profilePostCount }) {
  const [form, setForm] = useState(() => ({ ...emptyProfile, ...(profile || {}) }));
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (profile) {
      setForm({ ...emptyProfile, ...profile });
    }
  }, [profile]);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  function updatePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({
        ...current,
        photoUrl: reader.result
      }));
    };
    reader.readAsDataURL(file);
  }

  function submitProfile(event) {
    event.preventDefault();

    const nextProfile = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      favoriteAnime: form.favoriteAnime.trim(),
      role: form.role,
      bio: form.bio.trim(),
      avatarId: form.avatarId || "sunrise",
      photoUrl: form.photoUrl || ""
    };

    saveProfile(nextProfile);
    setStatus("Profile saved. You can now publish anime articles.");
    window.setTimeout(() => setStatus(""), 4000);
  }

  return (
    <section className="signup-layout" aria-labelledby="signupTitle">
      <div className="signup-copy">
        <p className="eyebrow">User profile</p>
        <h2 id="signupTitle">{profile ? "Change Your Sign In Details" : "Create Your Reader Profile"}</h2>
        <p>Save your details once, choose an avatar, then use the same identity when reading and adding articles. Your rank grows as you publish more posts.</p>

        {profile && (
          <div className="profile-card">
            <div className="profile-card-head">
              <Avatar avatarId={profile.avatarId} name={profile.fullName} photoUrl={profile.photoUrl} size="large" />
              <div>
                <h3>Saved profile</h3>
                <span className="rank-pill">{profileRank.label}</span>
              </div>
            </div>
            <p><strong>Name: </strong>{profile.fullName}</p>
            <p><strong>Email: </strong>{profile.email}</p>
            <p><strong>Favorite anime: </strong>{profile.favoriteAnime || "Not added"}</p>
            <p><strong>Role: </strong>{profile.role}</p>
            <p><strong>Articles posted: </strong>{profilePostCount}</p>
            <p><strong>Next promotion: </strong>{profileRank.next}</p>
            <p>{profile.bio || "No bio yet."}</p>
          </div>
        )}
      </div>

      <form className="signup-form" onSubmit={submitProfile}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input id="fullName" name="fullName" type="text" maxLength="60" required placeholder="Your name" value={form.fullName} onChange={updateField} />
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" maxLength="90" required placeholder="you@example.com" value={form.email} onChange={updateField} />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="favoriteAnime">Favorite anime</label>
            <input id="favoriteAnime" name="favoriteAnime" type="text" maxLength="80" placeholder="Your favorite title" value={form.favoriteAnime} onChange={updateField} />
          </div>

          <div className="field">
            <label htmlFor="role">Profile type</label>
            <select id="role" name="role" value={form.role} onChange={updateField}>
              {["Reader", "Writer", "Reviewer", "Community Editor"].map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="bio">Short bio</label>
          <textarea id="bio" name="bio" maxLength="360" placeholder="Tell readers what kind of anime articles you like to write..." value={form.bio} onChange={updateField} />
        </div>

        <div className="field">
          <label htmlFor="profilePhoto">Profile photo</label>
          <div className="upload-row">
            <Avatar avatarId={form.avatarId} name={form.fullName} photoUrl={form.photoUrl} size="large" />
            <div>
              <input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" onChange={updatePhoto} />
              {form.photoUrl && (
                <button className="ghost-link compact-action" type="button" onClick={() => setForm((current) => ({ ...current, photoUrl: "" }))}>
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="field">
          <label>Profile avatar</label>
          <div className="avatar-picker" role="radiogroup" aria-label="Choose profile avatar">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar.id}
                className={`avatar-choice ${form.avatarId === avatar.id ? "active" : ""}`}
                type="button"
                role="radio"
                aria-checked={form.avatarId === avatar.id}
                onClick={() => setForm((current) => ({ ...current, avatarId: avatar.id }))}
              >
                <Avatar avatarId={avatar.id} name={avatar.label} />
                <span>{avatar.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button className="primary-btn" type="submit">{profile ? "Update Profile" : "Create Profile"}</button>
        </div>

        <div className="status" role="status">{status}</div>
      </form>
    </section>
  );
}
