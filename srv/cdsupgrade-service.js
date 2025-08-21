const cds = require("@sap/cds");
const LOG = cds.log();

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
      let res = await SFSFsrv.send({
        query: SELECT.from(EC_FOPayRange).limit(20),
        headers: {
          apikey: process.env.apikey,
        },
      });
      LOG._info &&
        LOG.info(
          "EC_FOPayRange first entry minimumPay value: ",
          res?.[0]?.minimumPay,
          " isInteger: ",
          Number.isInteger(res?.[0]?.minimumPay)
        );
      return res;
    } catch (err) {
      req.reject(err);
    }
  });
};
