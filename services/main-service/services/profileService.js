const db = require('../db/mysql');

const insertProfile = async (profile) => {
  const query = `
    INSERT INTO profile (
      profile_id, profile_name, profile_description, profile_email,
      profile_phone, profile_website, profile_address, profile_logo, profile_banner
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    profile.profile_id,
    profile.profile_name,
    profile.profile_description,
    profile.profile_email,
    profile.profile_phone,
    profile.profile_website,
    profile.profile_address,
    profile.profile_logo,
    profile.profile_banner
  ];

  const [result] = await db.execute(query, values);
  return result;
};

const getAllProfiles = async () => {
    const query = 'SELECT * FROM profile';
    const [rows] = await db.execute(query);
    return rows;
 }

const getProfile = async (profileId) => {
    const query = 'SELECT * FROM profile WHERE profile_id = ?';
    const [rows] = await db.execute(query, [profileId]);
    return rows[0];
}

const updateProfile = async (profileId, profile) => {
    const query = `
        UPDATE profile SET
            profile_name = ?,
            profile_description = ?,
            profile_email = ?,
            profile_phone = ?,
            profile_website = ?,
            profile_address = ?,
            profile_logo = ?,
            profile_banner = ?
        WHERE profile_id = ?
    `;

    const values = [
        profile.profile_name,
        profile.profile_description,
        profile.profile_email,
        profile.profile_phone,
        profile.profile_website,
        profile.profile_address,
        profile.profile_logo,
        profile.profile_banner,
        profileId
    ];

    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
}

const deleteProfile = async (profileId) => {
    const query = 'DELETE FROM profile WHERE profile_id = ?';
    const [result] = await db.execute(query, [profileId]);
    return result.affectedRows > 0;
}

module.exports = { insertProfile , getAllProfiles, getProfile, updateProfile, deleteProfile };