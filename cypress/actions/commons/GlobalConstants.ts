export class GlobalConstants{
    public static  LoginURL: string ="https://www.nxg-dev.aws-acct-nxgs.services/";
    public static userAPI: string="https://cloud-accretech.link/acct/1/server/resource/100/dev/auth/users";

    public static listRoleNotHaveGroupApi: string="https://cloud-accretech.link/acct/1/server/resource/100/dev/auth/roles"
    public static listRoleHaveGroupApi = (group: string): string => {
        return `https://cloud-accretech.link/acct/1/server/resource/100/dev/auth/roles?group=${group}`;
    };
    public static userApi="https://cloud-accretech.link/acct/1/server/resource/100/dev/auth/users";
    public static login_UserApi: string="https://cloud-accretech.link/acct/1/server/resource/100/dev/auth/users"

    public static userAPI_inter: string="https://cloud-accretech.link/acct/1/server/resource/100/dev/f6fdffe48c908deb0f4c3bd36c032e72";
}