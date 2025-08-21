namespace cdsupgrade;

using {
    cuid,
    managed
} from '@sap/cds/common';

@assert.unique: {code: [code]}
entity MasterRoles : cuid {
    code     : String;
    name     : String;
    isActive : Boolean default true;
}

using {successfactors_ec_sandbox} from '../srv/external/successfactors_ec_sandbox.csn';

entity EC_User       as
    projection on successfactors_ec_sandbox.User {
        key userId,
            empId,
            firstName,
            lastName,
            defaultFullName,
            dateOfBirth,
            jobCode,
            country,
            department,
            division,
            manager,
            hr,
            custom02,
            location,
            email,
            directReports,
            username,
            displayName
    };

entity EC_FOPayRange as
    projection on successfactors_ec_sandbox.FOPayRange {
        key externalCode,
        key startDate,
            minimumPay,
            maximumPay,
    }
