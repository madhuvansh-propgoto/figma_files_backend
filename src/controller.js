const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const bcrypt=require('bcrypt');

exports.upsertUser = async (req, res) => {
  try {
    let {
      id,
      name,
      email,
      mobile_no,
      profile_url,
      created_by,
      updated_by,
      password
    } = req.body;

    // CREATE validation
    if (!id) {
      if (!name || !email || !mobile_no || !profile_url || !password) {
        return res.status(400).json({
          message: "name, email, mobile_no, profile_url and password are required"
        });
      }

      id = uuidv4();
    }

    const existingUser = await db('users').where({ id }).first();

    // hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (existingUser) {

      // UPDATE
      const updatePayload = {
        name: name ?? existingUser.name,
        email: email ?? existingUser.email,
        mobile_no: mobile_no ?? existingUser.mobile_no,
        profile_url: profile_url ?? existingUser.profile_url,
        updated_by: updated_by ?? existingUser.updated_by
      };

      if (hashedPassword) {
        updatePayload.password = hashedPassword;
      }

      await db('users')
        .where({ id })
        .update(updatePayload);

      return res.status(200).json({
        message: "User updated successfully",
        id
      });

    } else {

      // CREATE
      await db('users').insert({
        id,
        name,
        email,
        mobile_no,
        profile_url,
        password: hashedPassword,
        created_at: new Date(),
        created_by: created_by || null,
        updated_by: updated_by || null
      });

      return res.status(201).json({
        message: "User created successfully",
        id
      });
    }

  } catch (error) {
    console.error(error);

    if (error.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({
        message: "Email or mobile number already exists"
      });
    }

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


exports.upsertFolder = async (req, res) => {
  try {
    let {
      id,
      name,
      color,
      owner_id,
      created_by,
      updated_by,
      isActive
    } = req.body;

    const existingFolder = id
      ? await db("folders").where({ id }).first()
      : null;

    if (id && !existingFolder) {
      return res.status(404).json({
        message: "Folder not found"
      });
    }

    // CREATE case
    if (!existingFolder) {

      if (!name || !owner_id || !created_by) {
        return res.status(400).json({
          message: "name, owner_id and created_by are required to create folder"
        });
      }

      if (!id) {
        id = uuidv4();
      }

      await db("folders").insert({
        id,
        name,
        color: color || null,
        owner_id,
        created_at: new Date(),
        updated_at: new Date(),
        isActive: isActive ?? true,
        created_by,
        updated_by: updated_by ?? created_by
      });

      return res.status(201).json({
        message: "Folder created successfully",
        id
      });
    }

    // UPDATE case
    await db("folders")
      .where({ id })
      .update({
        name: name ?? existingFolder.name,
        color: color ?? existingFolder.color,
        owner_id: owner_id ?? existingFolder.owner_id,
        isActive: isActive ?? existingFolder.isActive,
        updated_by: updated_by ?? existingFolder.updated_by,
        updated_at: new Date()
      });

    return res.status(200).json({
      message: "Folder updated successfully",
      id
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
};