const db = require("../db/mysql");

const insertJobWithSkills = async (jobData) => {
  const {
    profile_id,
    job_name,
    experience,
    education_required,
    skills_required,
    description,
  } = jobData;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Insert job
    const insertJobQuery = `
        INSERT INTO job ( profile_id, job_name, experience, education_required, description)
        VALUES ( ?, ?, ?, ?, ?)
      `;
    const [result] = await conn.execute(insertJobQuery, [
      profile_id,
      job_name,
      experience,
      education_required,
      description,
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
      SELECT j.job_id, j.profile_id, j.job_name, j.experience, j.education_required, j.description,
             GROUP_CONCAT(js.skill_name) AS skills_required
      FROM job j
      LEFT JOIN job_skills js ON j.job_id = js.job_id
      WHERE j.profile_id = ?
      GROUP BY j.job_id
    `;

  const [rows] = await db.execute(query, [profileId]);

  const parsedRows = rows.map((row) => ({
    ...row,
    skills_required: row.skills_required
      ? row.skills_required.split(",").map((skill) => skill.trim())
      : [],
  }));
  return parsedRows;
};

const updateJob = async (jobId, jobData) => {
  const {
    job_name,
    experience,
    education_required,
    skills_required,
    description,
  } = jobData;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Update job
    const updateJobQuery = `
      UPDATE job
      SET job_name = ?, experience = ?, education_required = ?, description = ?
      WHERE job_id = ?
    `;
    await conn.execute(updateJobQuery, [
      job_name,
      experience,
      education_required,
      description,
      jobId,
    ]);

    // Delete old skills
    const deleteSkillsQuery = `DELETE FROM job_skills WHERE job_id = ?`;
    await conn.execute(deleteSkillsQuery, [jobId]);

    // Insert new skills
    const insertSkillQuery = `INSERT INTO job_skills (job_id, skill_name) VALUES (?, ?)`;
    for (const skill of skills_required) {
      await conn.execute(insertSkillQuery, [jobId, skill]);
    }

    // Fetch updated job
    const [jobRows] = await conn.execute(
      `SELECT job_id, job_name, experience, education_required, description FROM job WHERE job_id = ?`,
      [jobId]
    );

    const [skillRows] = await conn.execute(
      `SELECT skill_name FROM job_skills WHERE job_id = ?`,
      [jobId]
    );

    await conn.commit();

    const updatedJob = {
      ...jobRows[0],
      skills_required: skillRows.map((row) => row.skill_name),
    };

    return updatedJob;
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
