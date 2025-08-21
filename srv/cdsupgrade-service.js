const cds = require("@sap/cds");

module.exports = async (srv) => {
  // connect to remote service
  const SFSFsrv = await cds.connect.to("successfactors_ec_sandbox");

  const { EC_User, EC_FOPayRange } = srv.entities;

  srv.on("READ", EC_User, async (req) => {
    try {
      return await SFSFsrv.send({
        query: SELECT.from(EC_User)
          .where({ lastName: { "!=": null }, firstName: { "!=": null } })
          .limit(20),
        headers: {
          apikey: process.env.apikey,
        },
      });
    } catch (err) {
      req.reject(err);
    }
  });

  srv.on("READ", EC_FOPayRange, async (req) => {
    try {
      return await SFSFsrv.send({
        query: SELECT.from(EC_FOPayRange).limit(20),
        headers: {
          apikey: process.env.apikey,
        },
      });
    } catch (err) {
      req.reject(err);
    }
  });
};
