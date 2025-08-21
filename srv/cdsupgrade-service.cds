using {cdsupgrade} from '../db/schema';

@path: '/service/cdsupgrade'
service CDSUpgradeService @(requires: 'authenticated-user') {
    @readonly
    entity MasterRoles   as projection on cdsupgrade.MasterRoles;

    entity EC_User       as projection on cdsupgrade.EC_User;
    entity EC_FOPayRange as projection on cdsupgrade.EC_FOPayRange;

}
