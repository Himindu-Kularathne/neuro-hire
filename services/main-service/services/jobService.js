const db = require("../db/mysql");

const insertJobWithSkills = async (jobData) => {
  const {
    profile_id,
    job_name,
    experience,
    education_required,
    skills_required,
  } = jobData;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Insert job
    const insertJobQuery = `
        INSERT INTO job ( profile_id, job_name, experience, education_required)
        VALUES ( ?, ?, ?, ?)
      `;
    const [result] = await conn.execute(insertJobQuery, [
      profile_id,
      job_name,
      experience,
      education_required,
    ]);

    // Insert skills
    const insertSkillQuery = `INSERT INTO job_skills (job_id, skill_name) VALUES (?, ?)`;

    for (const skill of skills_required) {
      await conn.execute(insertSkillQuery, [result.insertId, skill]);
    }

    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const getAllJobs = async (profileId) => {
  const query = `
      SELECT j.job_id, j.profile_id, j.job_name, j.experience, j.education_required,
             GROUP_CONCAT(js.skill_name) AS skills_required
      FROM job j
      LEFT JOIN job_skills js ON j.job_id = js.job_id
      WHERE j.profile_id = ?
      GROUP BY j.job_id
    `;

  const [rows] = await db.execute(query, [profileId]);
  return rows;
};

const updateJob = async (jobId, jobData) => {
  const { job_name, experience, education_required, skills_required } = jobData;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Update job
    const updateJobQuery = `
        UPDATE job
        SET job_name = ?, experience = ?, education_required = ?
        WHERE job_id = ?
      `;
    await conn.execute(updateJobQuery, [
      job_name,
      experience,
      education_required,
      jobId,
    ]);

    // Delete existing skills
    const deleteSkillsQuery = `DELETE FROM job_skills WHERE job_id = ?`;
    await conn.execute(deleteSkillsQuery, [jobId]);

    // Insert new skills
    const insertSkillQuery = `INSERT INTO job_skills (job_id, skill_name) VALUES (?, ?)`;

    for (const skill of skills_required) {
      await conn.execute(insertSkillQuery, [jobId, skill]);
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const deleteJob = async (jobId) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Delete job
    const deleteJobQuery = `DELETE FROM job WHERE job_id = ?`;
    await conn.execute(deleteJobQuery, [jobId]);

    // Delete associated skills
    const deleteSkillsQuery = `DELETE FROM job_skills WHERE job_id = ?`;
    await conn.execute(deleteSkillsQuery, [jobId]);

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const getJob = async (jobId) => {
  const query = `
      SELECT j.job_id, j.profile_id, j.job_name, j.experience, j.education_required,
             GROUP_CONCAT(js.skill_name) AS skills_required
      FROM job j
      LEFT JOIN job_skills js ON j.job_id = js.job_id
      WHERE j.job_id = ?
      GROUP BY j.job_id
    `;

  const [rows] = await db.execute(query, [jobId]);
  return rows[0];
};

module.exports = {
  insertJobWithSkills,
  getAllJobs,
  updateJob,
  deleteJob,
  getJob,
};
